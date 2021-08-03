import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Button } from "react-bootstrap";

class AllDataAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorAPIData: [],
    };
  }

  componentDidMount = async () => {
    // const email = this.props.auth0.user.email;

    //http://localhost:3005/getDataAPI

    let resDataap = await axios.get(
      `${process.env.REACT_APP_SERVER}/getDataAPI`
    );

    await this.setState({
      colorAPIData: resDataap.data,
    });
    console.log(this.state.colorAPIData);
  };

  handeladdtofav = async (ele) => {
    let dataadd = {
      title: ele.title,
      imageUrl: ele.imageUrl,
      email: this.props.auth0.user.email,
    };
    //http://localhost:3005/addtofav
    await axios.post(`${process.env.REACT_APP_SERVER}/addtofav`, dataadd);
  };

  render() {
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>
        {this.state.colorAPIData.map((ele, i) => {
          return (
            <div key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={ele.imageUrl} alt={ele.title} />
                <Card.Body>
                  <Card.Title>{ele.title}</Card.Title>

                  <Button
                    variant="primary"
                    onClick={() => this.handeladdtofav(ele)}
                  >
                    add
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);

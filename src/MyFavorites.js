import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyFavorites.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import UpdateFormModel from "./component/UpdateFormModel";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorData: [],
      indexDel: 0,
      showFMupdate: false,
      indexUpdate: 0,
      titleU: "",
      imgU: "",
    };
  }

  componentDidMount = async () => {
    const email = this.props.auth0.user.email;

    //http://localhost:3005/getData?email=${}

    let resData = await axios.get(
      `${process.env.REACT_APP_SERVER}/getData?email=${email}`
    );
    await this.setState({
      colorData: resData.data,
    });
    // console.log(this.state.colorData);
  };

  handelDelete = async (i) => {
    let paramObj = {
      email: this.props.auth0.user.email,
    };
    //http://localhost:3005/deleteone/${}

    let resDelData = await axios.delete(
      `${process.env.REACT_APP_SERVER}/deleteone/${i}`,
      { params: paramObj }
    );
    await this.setState({
      colorData: resDelData.data,
      indexDel: i,
    });
  };

  handelUpdateShow = (i) => {
    this.setState({
      showFMupdate: true,
      indexUpdate: i,
      titleU: this.state.colorData[i].title,
      imgU: this.state.colorData[i].imageUrl,
    });
  };
  handelUpdateClose = () => {
    this.setState({
      showFMupdate: false,
    });
  };
  handelUpdate = async (e) => {
    e.preventDefault();

    let updateDate = {
      email: this.props.auth0.user.email,
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
    };
    //http://localhost:3005/updateone/${} ,

    let resUpData = await axios.put(
      `${process.env.REACT_APP_SERVER}/updateone/${this.state.indexUpdate}`,
      updateDate
    );
    await this.setState({
      colorData: resUpData.data,
      showFMupdate: false,
    });
  };
  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>This is a collection of my favorites</p>
        <div>
          {this.state.showFMupdate && (
            <UpdateFormModel
              showFMupdate={this.state.showFMupdate}
              indexUpdate={this.state.indexUpdate}
              titleU={this.state.titleU}
              imgU={this.state.imgU}
              handelUpdateClose={this.handelUpdateClose}
              handelUpdate={this.handelUpdate}
            />
          )}

          {this.state.colorData.map((ele, i) => {
            return (
              <div key={i}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={ele.imageUrl} alt={ele.title} />
                  <Card.Body>
                    <Card.Title>{ele.title}</Card.Title>

                    <Button
                      variant="primary"
                      onClick={() => this.handelDelete(i)}
                    >
                      delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => this.handelUpdateShow(i)}
                    >
                      update
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default withAuth0(MyFavorites);

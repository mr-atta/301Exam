import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";

class UpdateFormModel extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.showFMupdate}
          onHide={this.props.handelUpdateClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update color data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.handelUpdate}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  defaultValue={this.props.titleU}
                  name="title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  defaultValue={this.props.imgU}
                  name="imageUrl"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handelUpdateClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateFormModel;

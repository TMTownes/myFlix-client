import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({formData, handleUpdate, handleSubmit }) => {

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <br/>
        <h2 className="card-title"> Update Profile Information</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
          type="text"
          minLength={5}
          value={formData.username}
          onChange={(e) => handleUpdate(e)}
          required
          />
          <br/>
        </Form.Group>
        <br/>
        <Form.Group controlId="formEmail">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            type="email"
            value={formData.Email}
            onChange={(e) => handleUpdate(e)}
            required

            />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
          type="password"
          minLength={8}
          value={formData.Password}
          onChange={(e) => handleUpdate(e)}
          required
          />
        </Form.Group>
        <br/>
      <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
          type="date"
          value={formData.Birthdate}
          onChange={(e) => handleUpdate(e)}
          required
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit">
          {" "}
          Submit Changes{" "}
        </Button>
      </Form>
    </Row>
  );
};

UpdateUser.propTypes = {
  formData: PropTypes.object,
  handleUpdate: PropTypes.func,
  handleSubmit: PropTypes.func
};
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { Row, Col, Figure } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //Prevent full page reload
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };


    fetch(`https://myflix-retro-af49f4e11172.herokuapp.com/login?Username=${username}&Password=${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
  <Row>
    <Col>
   <Figure className="justify-content-center container">

      <Figure.Caption><h2>Welcome to The Flix</h2></Figure.Caption>
      <Figure.Image className="img-fluid" 
      src="./img/retroArcade.jpeg"
      alt="Arcade" />
      
  
    
    
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </Form.Group>
      <br/>
      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control 
          type="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </Figure>
    </Col>
    </Row>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
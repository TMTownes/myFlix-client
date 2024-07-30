import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Title, Image, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { setUser } from "../../redux/reducers/user/user"; for redux



export const LoginView = ({onLoggedIn}) => {
  // removed onLoggedIn prop
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
        //is this needed?
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        // replaced onLoggedIn for redux
        onLoggedIn(data.user, data.token);
        // dispatchEvent(setUser(data.username), setToken(data.token));
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
  <Row >
    <Col md={12}>
    {/* className="justify-content-center container" */}
    <Card className="mb-3">
      {/* className="mb-5 signup" */}
      <Card.Title ><h2>Welcome to The Flix</h2></Card.Title>
        <Card.Body>
          
          <Image className="card-img-top"
          // "img-fluid rounded shadow-3 mb-3" 
          src="https://image.roku.com/developer_channels/prod/0b4220080e21631abbe1c40171297d06639440a20af80e02472cd4ebe23ed512.png"
          alt="Arcade" 
          fluid
          />
        </Card.Body>
      
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
    </Card>
    </Col>
  </Row>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
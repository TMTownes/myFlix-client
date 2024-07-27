import React from "react";
import { useState } from "react";
import { Button, Form, Card, Figure, CardHeader } from "react-bootstrap";


export const SignupView = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch(`https://myflix-retro-af49f4e11172.herokuapp.com/users?Username=${username}&Password=${password}&Email=${email}&Birthday=${birthday}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      } 
    });
  };

  return (
    <Card className="signup mb-5">
      <CardHeader >
        <h2>Join Us!</h2>
      </CardHeader>
      <Card.Img src="https://st4.depositphotos.com/11486624/20887/i/450/depositphotos_208873832-stock-photo-retro-cinema-night-neon-animation.jpg"
      alt="Arcade Signup"
      />
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text"
        minLength="3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <input 
        type="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type="current-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        />
      </Form.Group>      
      <Button variant="primary" type="submit">Sign Up</Button>
    </Form>
    </Card>
  );
};
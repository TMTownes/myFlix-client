import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import "./profile-view.scss";
// import "./favoriteMovies.scss";

export const ProfileView = ({ token, movies, user, handleRemoveFromFavorites}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [username, setUsername] = useState(storedUser.Username);
  const [email, setEmail] = useState(storedUser.Email);
  const [birthdate, setBirthdate] = useState(storedUser.Birthdate);
  const [password, setPassword] = useState("");
 
  useEffect(()=> {
    if (!user && storedUser) {
      setUser(storedUser);
    }
  }, [storedUser]);
  
  useEffect(() => {
    if (!token && storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]);

const favoriteMovies = user === undefined ? [] : movies.filter(m => user.FavoriteMovies.includes(m.id));

const formData = {
  Username: username,
  Email: email,
  Birthdate: birthdate,
  Password: password
};

formData.Birthdate = birthdate ? new Date(birthdate).toISOString().substring(0, 10) : "";

const handleSubmit = (event) => {
  event.preventDefault(event);

  //send updated user info to the server, endpoint /users/:username
  fetch(`https://myflix-retro-af49f4e11172.herokuapp.com/users/${user.Username}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
       }
    }
)
.then((response) => {
  if (response.ok) {
    alert("Profile has been updated!");
    return response.json();
  } else {
   alert("Update failed. Please try again.");  
  }
})
.then((user) => {
  if (user) {
  // localStorage.setItem("user", JSON.stringify(user));
  setUser(user);
  }
})
.catch((error) => {
  console.error(error);
  });
};

const handleUpdate = (e) => {
  switch(e.target.type) {
    case "text":
      setUsername(e.target.value);
      break;
    case "email":
      setEmail(e.target.value);
      break;
    case "password":
      setPassword(e.target.value);
      break;
    case "date":
      setBirthdate(e.target.value);
      break;
      default:
      break;
  }
};

const handleDeleteAccount = () => {
  fetch (`https://myflix-retro-af49f4e11172.herokuapp.com/users/${user.Username}`, {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
}
  }).then ((response) => {
    if (response.ok) {
      alert("The account has been successfully deleted.");
      // localStorage.clear();
      window.location.reload();
    } else {
      alert(" Something has gone wrong.");
    }
  });
};


return (
  <Container>
  
    <Card>
      <Row>
        <Col >
        
        <img src="data:image/png;base64,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" alt="Image"
        width="160"
        height="160"
        className="profile-img"/>
        </Col>
      
      </Row>
        <Col>
      <Card.Body>
      <Card.Title><h2> Welcome {username}! </h2></Card.Title>
      <Card.Text> {email}</Card.Text>
      <hr/>
    <Row className="justify-content-center">
      <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
      <Button variant="primary" onClick={handleRemoveFromFavorites}> Remove</Button>
    </Row>
      </Card.Body>
      
      </Col>
    </Card >
  

    
    <Card>
    <Row>
    <br/>
    <Col>
    <UpdateUser
    formData={formData}
    handleUpdate={handleUpdate}
    handleSubmit={handleSubmit}
    />
  </Col>
  <br/>
  </Row>

  <Row>
    
    <Col>
    <Card.Body>
    <br/>
    <Button onClick={() => handleDeleteAccount(user._id)}
      className="button-delete mt-3"
      type="submit"
      variant="outline-secondary"> 
      Delete Account </Button>
      <br/>
    </Card.Body>
    </Col>
  </Row>
 </Card>
  </Container>
  )
}
ProfileView.propTypes = {
  formData: PropTypes.object,
  movies: PropTypes.array.isRequired,
  user: PropTypes.object,
  token: PropTypes.string.isRequired,
  handleRemoveFromFavorites: PropTypes.func
};



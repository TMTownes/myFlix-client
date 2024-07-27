import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
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
  <Container className="h-100 container-fluid">
  
    <Card>
      <Row className="justify-content-center ">
        <Col >
        
        <img src="https://i0.wp.com/grademymovie.com/wp-content/uploads/2018/11/GMM.jpg?fit=240%2C240&ssl=1" alt="Image"
        className="profile-img"/>
        </Col>
      
      </Row>
      <Col>
      <Card.Body>
      <Card.Title><h2> Welcome {username}! </h2>
      <br/>
      <Card.Text> {email}</Card.Text>
      </Card.Title>
      
      
      </Card.Body>
      <Card.Body>
    <Row className="justify-content-center ">
      <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
      {/* <Button variant="primary" onClick={handleRemoveFromFavorites}> Remove</Button> */}
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



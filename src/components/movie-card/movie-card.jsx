import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({movie, isFavorite}) => {

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));
//other storage 

const [user, setUser] = useState(storedUser ? storedUser: {user: ""});
const [token, setToken] = useState(storedToken ? storedToken: {token: ""});

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

//Add movies to favorites
  const handleAddToFavorites = () => {
    if (!user|| !token) {
      //user is not authenticated
      console.error("User is not authenticated");
      return;
    }
    addToFavorites();
  };

  const handleRemoveFromFavorites = () => {
    if (!user || !token) {
      console.log("User is not authenticated");
      return;
    }
    removeFromFavorites();
  };


  const addToFavorites = ( ) => {
    // const [favorites, setFavorites]([])
   
    fetch(`https://myflix-retro-af49f4e11172.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, 
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Failed to add new movie to Favorites");
        
      }
      alert("Movie added to Favorites!");
      // window.location.reload();
      return response.json();
    })

    //check if this is reachable
    .then((updatedUser) => {
      if (updatedUser) {
      //  localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser)}
    }
  )
  
    .catch((error) => {
      console.error(error);
    });
  };


const removeFromFavorites = () => {
  
  fetch(`https://myflix-retro-af49f4e11172.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(!response.ok) {
    throw new Error("Failed to remove movie from Favorites");
    }
    alert("Movie removes from Favorites List!");
    // window.location.reload();
    return response.json();
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setToken(user);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}; 


  return (
    <Card className="h-100 container-fluid">
      <Link className="link-card" to={`/movies/${encodeURIComponent(movie?.id)}`}>
     
     <Card.Body className="movie-card-img"> 
      <Card.Title>{movie?.title}</Card.Title>
      <Card.Text>{movie?.director}</Card.Text>
      
       </Card.Body > 
       <Card.Body className="hover-zoom">
        <Card.Img className="w-100" variant="top" src={movie?.image} />
        </Card.Body>
       </Link>
        <Card.Body>
        {isFavorite ? (
          <Button variant="primary" type="button" className="btn btn-outline-info" onClick={handleRemoveFromFavorites}> Remove</Button>
        ) : (
          <Button variant="primary" type="button" className="btn btn-outline-info" onClick={handleAddToFavorites}> 
          Add </Button>
        )}
       
        </Card.Body>
         
  </Card>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
      director: PropTypes.string,
      description: PropTypes.string
    
    }).isRequired   
};

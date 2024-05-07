import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({movie, isFavorite}) => {
const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

const [user, setUser] = useState(storedUser ? storedUser: null);
const [token, setToken] = useState(storedToken ? storedToken: null);

const [addTitle, setAddTitle] = useState("");
const [delTitle, setDelTitle] = useState("");

//Add movies to favorites
useEffect(() => {
  const addToFavorites = () => {

    fetch(`https://myflix-retro-af49f4e11172.herokuapp.com//users/${user.username}/movies/${encodeURIComponent(movie.title)}`, 
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if(!response.ok) {
        throw new Error("Failed to add new movie to Favorites");
      }
      alert("Movie added to Favorites!");
      window.location.reload();
      return response.json();
    })
    .then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };


const removeFromFavorites = () => {
  fetch(`https://myflix-retro-af49f4e11172.herokuapp.com//users/${user.username}/movies/${encodeURIComponent(movie.title)}`,
  {
    method: 'DELETE',
    headers: {Authorization: `Bearer: ${token}`,
      'Content-Type': 'application/json'}
  },
  )
  .then((response) => {
    if(!response.ok) {
    throw new Error("Failed to remove movie from Favorites");
    }
    alert("Movie removes from Favorites List!");
    window.location.reload();
    return response.json()
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}; 

if (addTitle) {
  addToFavorites();
};

if (delTitle) {
  removeFromFavorites();
}
}, [addTitle, delTitle, token]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };

  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  };

  return (
    <>
     <Link className="link-card" to={`/movies/${encodeURIComponent(movie.id)}`}>
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.image}/>
      <Card.Body>
        <Card.Title>{movie?.title}</Card.Title>
        <Card.Text>{movie?.director}</Card.Text>
       </Card.Body> 
       </Card>
     </Link>
     <>
     <Card>
        {isFavorite ? ( 
          <Button variant="primary" onClick={handleRemoveFromFavorites}> Remove</Button>
        ) : (
          <Button variant="primary" type="button" className="favorite-btn btn btn-outline-info" onClick={handleAddToFavorites}> 
          Add </Button>
        )}
       </Card>
     </>
    </>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
      director: PropTypes.string,
    }).isRequired
};

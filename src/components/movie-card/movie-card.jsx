import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
  return (
    <Card className="h-100" >
      <Card.Img className="w-100" variant="top" src={movie.ImagePath}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button variant="link">Open </Button>
        </Link>
    </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired
  }).isRequired,
    // onMovieClick: PropTypes.func.isRequired
};

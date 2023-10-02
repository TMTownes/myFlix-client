import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img className="w-100" variant="top" src={movie.ImagePath}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        {/* <Button variant="link">Open </Button> */}
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
    onMovieClick: PropTypes.func.isRequired
};

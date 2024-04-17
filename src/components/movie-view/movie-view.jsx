import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (movies) {
  const foundMovie = movies.find((movie) => movie.id === movieId);
  if (foundMovie) {
    setSelectedMovie(foundMovie);
    }
  }
}, [movieId, movies]);


  return (
    <div>
      {selectedMovie && (
        <div>
        <img className="w-100" src={selectedMovie?.image} alt={selectedMovie?.title} />
      </div>
      )}
      <div>
        <span>Title: </span>
        <span>{selectedMovie?.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{selectedMovie?.director}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button" style={{cursor: "pointer"}}>
        Back
      </button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired
})
).isRequired
};

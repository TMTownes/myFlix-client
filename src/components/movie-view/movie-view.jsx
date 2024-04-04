import { useParams } from "react-router";
import "./movie-view.scss";
// import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
  const foundMovie = movie.find((movie) => movie._id === movieId);
  if (foundMovie) {
    setSelectedMovie(foundMovie);
  }

  }, [movieId, movie]);


  return (
    <div>
      <div>
        <img className="w-100" src={selectedMovie?.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{selectedMovie?.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{selectedMovie?.Director.Name}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button" style={{cursor: "pointer"}}>
        Back
      </button>
      </Link>
    </div>
  );
};


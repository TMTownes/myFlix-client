import { useParams } from "react-router";
import "./movie-view.scss";
// import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams(movie);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
  const foundMovie = movie.find((movie) => movie._id === movieId);
  if (foundMovie) {
    setSelectedMovie(foundMovie);
  }

  }, [movieId, movie]);


  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <Link to={`/`}>
      <button 
      // onClick={onBackClick} 
      className="back-button"
      style={{cursor: "pointer"}}>
        Back
      </button>
      </Link>
    </div>
  );
};


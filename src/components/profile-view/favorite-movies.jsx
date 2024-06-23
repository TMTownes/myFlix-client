import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view";

export const FavoriteMovies = ({favoriteMovies}) => {

  
  return (
    <Col className="mb-5">
      <Row className="row">
        <Figure>
        {favoriteMovies.map((movie) => (
          <Col xs={12} md={10} lg={6} key={movie.id} className="fav-movies">
           
            <MovieCard
            key={movie.id}
            //what are we doing with this? Just need to confirm its a fav
            isFavorite={true}
            movie={movie}
            />
          </Col> 
        ))}
        </Figure>
      </Row>
    </Col>
  );
}
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array,

};
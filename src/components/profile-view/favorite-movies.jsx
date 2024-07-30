import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view";
import { Card } from "react-bootstrap";

export const FavoriteMovies = ({favoriteMovies}) => {

  
  return (
    <Col className="mb-4">
      <Row className="row">
        <Card className="d-flex flex-row flex-nowrap overflow-auto m-3">
        {favoriteMovies.map((movie) => (
          <Col xs={12} md={10} lg={6} key={movie.id} className="fav-movies">
           
            <MovieCard
            key={movie.id}
            isFavorite={true}
            movie={movie}
            />
          </Col> 
        ))}
        </Card>
      </Row>
    </Col>
  );
}
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array,

};
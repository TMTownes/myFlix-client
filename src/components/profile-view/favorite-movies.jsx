import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

// import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view";
import { Button } from "react-bootstrap";

export const FavoriteMovies = ({user, favoriteMovies, handleRemoveFromFavorites}) => {

  
  return (
    <Col className="mb-5">
      <Row>
        <Figure>
        {favoriteMovies.map((movie) => (
          <Col xs={12} md={6} lg={3} key={movie.id} className="fav-movies">
            {/* <Figure>
              <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
              <Figure.Image>
                <Figure.Caption src={movie.image}
                alt={movie.title}
                >
                Favorite Movies List!
                </Figure.Caption>
              </Figure.Image> */}
            <MovieCard
            key={movie.id}
            //what are we doing with this? Just need to confirm its a fav
            isFavorite={user.FavoriteMovies.includes(movie.title)}
            movie={movie}
            />
            {/* </Link> */}
            <Button variant="secondary" onClick={handleRemoveFromFavorites} > Remove From List </Button>
          </Col> 
        ))}
        </Figure>
      </Row>
    </Col>
  );
}
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array,
  user: PropTypes.object,
  handleRemoveFromFavorites: PropTypes.func
};
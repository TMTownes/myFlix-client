import React from "react";
import {useEffect} from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, Container } from "react-bootstrap";

// This is the Movie Poster
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {

  }, [])
 
  return (
    <Container className="container-fluid">
    <Col>
    <Row >
        <Card >
          <Card.Body className="row">
            <Card.Img src={movie?.image} className="img-container d-flex justify-content-start m-3" alt="Movie Poster"/>
            <Card.Title>{movie?.title}</Card.Title>
            <Card.Text>{movie?.description}</Card.Text>
            <Link to={`/`}><Button type="button" variant="primary"> Back </Button></Link>
          </Card.Body>
        </Card>
      </Row>
    </Col>
   </Container> 
  )
}

MovieView.propTypes = {
  movies: PropTypes.array
    
};

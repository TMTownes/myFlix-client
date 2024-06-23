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
  // console.log("found movies" + movies.find());
  useEffect(() => {

  }, []);
 
  return (
    <Container className="container-fluid">
      
    <Col>
    <Row>
        <Card >
          <Card.Body >
            <Card.Img className="m-3" src={movie?.image}  alt="Movie Poster"/>
            
          </Card.Body>
          <Card.Title>{movie?.title}</Card.Title>
          <Card.Text>{movie?.description}</Card.Text>
        </Card>
        <Link to={`/`}><Button type="button back-button " variant="primary"> Back </Button></Link>

      </Row>
    </Col>
   </Container> 
  )
}

MovieView.propTypes = {
  movies: PropTypes.array
    
};

import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {


  return (
    <>
     <Link className="link-card" to={`/movies/${encodeURIComponent(movie.id)}`}>
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.image}/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
       </Card.Body> 
       </Card>
     </Link>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired
    }).isRequired
};

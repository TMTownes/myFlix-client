import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import { Container } from "react-dom";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-retro-af49f4e11172.herokuapp.com/movies",
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((movies) => {
      setMovies(movies);
    });
  }, [token]);
  return (
    <>
      <Row className="justify-content-md-center">
        
      {!user ? (
        
        <Col md={5}>
        Users Login
        <LoginView 
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
          />
          <br/>
          Or
          Create an Account!
          <SignupView />
        </Col>
      
      ) :  selectedMovie ? (
        <Col md={8} >
        <MovieView 
        movie={selectedMovie} 
        onBackClick= {() => setSelectedMovie(null)} 
        />
        </Col>

      ) : movies.length === 0 ? (
        <div>The List is empty!</div>
      ) : (
      <>
        {movies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
            <MovieCard 
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            /> 
          </Col>
        ))}
      <button onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</button> 
      </> 
      )}
    </Row>
    </>
  );
};
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    fetch("https://myflix-retro-af49f4e11172.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      // console.log("Movies from api: ", data);
      const moviesFromApi = data.map((movie) => {
        return {
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          // Description: movie.Description,
          Director: movie.Director
        };
      });
      setMovies(moviesFromApi);
    });
  }, []);

  if(!user) {
    return (<LoginView 
      onLoggedIn={(user, token) => {
        setUser(user);
      setToken(token);
      }}
      />
    ); 
  } 

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick= {() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The List is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard 
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
         />
        );
      })}
    {/* <button onClick={() => {setUser(null); }}>Logout</button>  */}
    </div> 
  );
};
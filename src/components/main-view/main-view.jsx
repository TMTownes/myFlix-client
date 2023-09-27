import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

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
      <br/>
    <button onClick={() => {setUser(null); setToken(null); }}>Logout</button> 
    </div> 
  );
};
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://git.heroku.com/myflix-retro.git/movies")
    .then((response) => response.json())
    .then((data) => {
      console.log("Movies from api: ", data);
      // const moviesFromApi = data.movies.map((movie) => {
      //   return {
      //     id: movie.key,
      //     title: movie.Title,
      //     image: movie.ImagePath,
      //     description: movie.Description
      //   };
    //   });
    //   setMovies(moviesFromApi);
    });
  }, []);

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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
         />
        );
      })}
    </div>
  );
};
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Hook",
      Description: "When his young children are abducted by his old nemesis, Capt. Hook (Dustin Hoffman), middle-aged lawyer Peter Banning (Robin Williams) returns to his magical origins as Peter Pan to get them back from Neverland.",
      Genre: {
        Name: "Adventure",
        Description: "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films."
      },
      Director: {
        Name: "Steven Spielburg",
        Bio: "Steven Allan Spielberg, born Decemeber 18, 1946 in Cincinnati, Ohio, is an American motion-picture director and producer whose diverse films—which ranged from science-fiction fare, including Close Encounters of the Third Kind (1977), E.T.: The Extra-Terrestrial (1982), Schindler's List (1993), Saving Private Ryan (1998), Indiana Jones original trilogy (1981-89), The Color Purple (1985), Jurassic Park (1993), Minority Report (2002), Amistad (1997), War Horse (2011), and the musical West Side Story(2021).",
        Birth: "1946",
        Death: null
      },
      image: "../img/Hook",
      Featured: false,
      Actors: ["Robin Williams", "Dustin Hoffman", "Julia Roberts"]
    },
    {
      id: 2,
      Title: "E.T.",
      Description: "An alien stranded on Earth befiends a young boy, who together with his sister and friends, helps the alien return home to space.",
      Genre: [
        {
          Name: "Adventure",
          Description: "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films."
        },
        {
          Name: "Science Fiction",
          Description: "Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. Science fiction can trace its roots to ancient mythology."
        }
      ],
      Director: {
        Name: "Steven Spielburg",
        Bio: "Steven Allan Spielberg, born Decemeber 18, 1946 in Cincinnati, Ohio, is an American motion-picture director and producer whose diverse films—which ranged from science-fiction fare, including Close Encounters of the Third Kind (1977), E.T.: The Extra-Terrestrial (1982), Schindler's List (1993), Saving Private Ryan (1998), Indiana Jones original trilogy (1981-89), The Color Purple (1985), Jurassic Park (1993), Minority Report (2002), Amistad (1997), War Horse (2011), and the musical West Side Story(2021).",
        Birth: "1946",
        Death: null
      },
      image: "./img/E.T.",
      Featured: false,
      Actors: ["Drew Barrymore", "Henry Thomas"]
    },
    {
      id: 3,
      Title: "The Parent Trap",
      Description: "Identical twins Annie and Hallie, separated at birth and each raised by one of their biological parents, discover each other for the first time at summer camp and make a plan to bring their wayward parents back together.",
      Genre: [
        {
          Name: "Comedy",
          Description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement. Films in this style traditionally have a happy ending. Comedy is one of the oldest genres in the film and it is derived from classical comedy in theatre."
        }
      ],
      Director: {
        Name: "Nancy Meyers",
        Bio: "Nancy Jane Meyers is an American filmmaker. She has written, produced, and directed many critically and commercially successful films. She was nominated for the Academy Award for Best Original Screenplay for Private Benjamin.",
        Birth: "1949",
        Death: null
      },
      image: "./img/ParentTrap",
      Featured: false,
      Actors: ["Lindsay Lohan", "Dennis Quaid", "NaTasha Richardson", "Elaine Hendrix"]
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
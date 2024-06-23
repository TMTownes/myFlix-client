import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";



export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // const [isDirectNavigation, setIsDirectNavigation] = useState(false);
  
  // const { movieId } = useParams();

  useEffect(() => {
    if (!token) {
      return ;
    }

    fetch("https://myflix-retro-af49f4e11172.herokuapp.com/movies",
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("No data received");
      }
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
          image: movie.ImagePath,
          title: movie.Title,
          genre: movie.Genre,
          description: movie.Description,
          director: movie.Director.Name,
          actors: movie.Actors?.[0]
        };
      });
      // localStorage.setItem("movies", JSON.stringify(moviesFromApi));
      setMovies(moviesFromApi);
    })
    .catch((err) => {
      console.error("Error fetching movies", err);
    });
  },[token]);
  // console.log(movies);

    const handleSearch = (e) => {
        const query = e.target.value;
        setQuery(query);

        // const storedMovies = JSON.parse(localStorage.getItem("movies"));

        const filterMovies = movies.filter((movie) => {
          return (
          movie.title.toLowerCase().includes(query.toLowerCase())
          );
          
        })
        setMovies(filterMovies);
    };
    console.clear();
 
//  useEffect(() => {
//   setIsDirectNavigation(Boolean(movieId));
//  }, [movieId]);
  // const filterMovies = user === undefined ? []: movies.filter(m => user.filterMovies.includes(m.id));



  return (
    
  <Router>
  <Row className="justify-content-md-center">
    <NavigationBar
      handleSearch={handleSearch}
      query={query}
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        // localStorage.clear();
      }}
      // isDirectNavigation={isDirectNavigation}
    />
    <Routes>
      
      <Route
      //Home Page
        path="/"
        element={
          <> 
          {user ? (
           <Row className="justify-content-fluid">
            {movies.map((movie) => (
             

              <Col className="mb-4" key={movie.id} sm={6} md={4} lg={3}>
                <MovieCard
                  movie={movie}
                  isFavorite={user && user.FavoriteMovies.includes(movie.id)}
                />
                </Col>
              
              ))}
            </Row> 
            
            ) : (
              <Navigate to="/login" replace />
              
           
        )}
       </>     
        
        }
      />
      <Route
      
        path="/movies/:movieId"
        element={
         <>
         {!user ? (
              <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
              <Col> The List is empty!</Col>
                ) : (
              <Row className="justify-content-center row">
              <Col sm={12} md={8} lg={6}>
                <MovieView movies={movies} />
              </Col>
            </Row>            
            )}
          </>
        }
     /> 
      <Route
        path="/users/:Username"
        element={

          user ? (
            <Row className="justify-content-center">
              <Col sm={12} md={9} lg={7}>
                <ProfileView
                  token={token}
                  user={user}
                  movies={movies}
                  onSubmit={(user) => setUser(user)}
                />
              </Col>
            </Row>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Row>
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            </Col>
            </Row>
          )
        }
      />
      <Route
        path="/users"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Col md={5}>
              <SignupView />
            </Col>
          )
        }
      />
    </Routes>
  </Row>
</Router>
  );
};
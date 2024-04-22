import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  
  const [movies, setMovies] = useState([]);



  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-retro-af49f4e11172.herokuapp.com/movies",
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fectch movies");
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
          director: movie.Director.Name
        };
      });
      localStorage.setItem("movies", JSON.stringify(moviesFromApi));
      setMovies(moviesFromApi);
    })
    .catch((err) => {
      console.error("Error fetching movies", err);
    });
  }, [token])
  // console.log(movies);

  return (
    <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/users"
            element={
            <Col md={5}>
              <SignupView />
            </Col>
            }
          />
          
          <Route
            path="/login"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : ( 
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => { 
                  setUser(user); 
                  setToken(token);
                  }}
                  />
                </Col>
              )}
              </>
            }
           />
           
          <Route
          path="/users/:Username"
          element={
            <Row className="justify-content-center">
              <Col sm={12} md={9} lg={7} >
                {user ? (
                  <><ProfileView
                    token={token}
                    user={user}
                    movies={movies}
                    onSubmit={(user) => setUser(user)} /></>
                  ): ( 
                <Navigate to="/login" />
                )}
              </Col>
            </Row>
          }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  // selectedMovie ?
                  
                  <Col>The list is empty!</Col>
                ) : (
                  <Col sm={12} md={8} lg={6}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <> 
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} sm={6} md={4} lg={3}>
                      <MovieCard
                      isFavorite={user.FavoriteMovies.includes(movie.title)}
                      movie={movie} 
                     />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};
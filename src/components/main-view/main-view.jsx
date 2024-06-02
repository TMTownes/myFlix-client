import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { SearchBox } from "../SearchBox/searchBox";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
// import PropTypes from "prop-types"
// import { HomePage } from "../home-page";


export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
 

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
        throw new Error("Failed to fe tch movies");
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

  const handleSearch = (e)=> {
    const query = e.target.value;
    setQuery(query);
  };
 

  return (
    <BrowserRouter>
    <Row className="justify-content-md-center">
    
    <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        // localStorage.clear();
      }}
      />
      <Routes>  
          <Route
            path="/users"
            element={
              <>
              {user ? (
                <Navigate to="/"/>
              ) : (
            <Col md={5}>
              <SignupView />
            </Col>
            )}
            </>
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
                      <Row><Col>
                        <SearchBox
                        handleSearch={handleSearch}
                        query={query}
                        />
                    </Col>  
                      <Col>The list is empty!</Col></Row> 
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
                element=
                
                  {!user ? ( <Navigate to="/login" replace/> ) : movies.map((movie) => (
                    
                     
                     <Col className="mb-4" key={movie.id} sm={6} md={4} lg={3}>   
                       
                       <MovieCard
                    movie={movie} 
                    isFavorite={user.FavoriteMovies.includes(movie.title)}
                    />

                      </Col>
                     
                    ))}
                 />  
                
              
        </Routes>
    </Row>
  </BrowserRouter>
  );
};

// MainView.propTypes = {
//   movie: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     imgae: PropTypes.strig,
//     director: PropTypes.string,
//     description: PropTypes.string,
//   }).isRequired
// };
import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap"
import { BrowserRouter, Link } from "react-router-dom"
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { SearchBox } from "../SearchBox/searchBox.jsx";
import { Routes, Route } from "react-router-dom";

import PropTypes from "prop-types";



export const NavigationBar = ({onLoggedOut, user, query, handleSearch, movies, movie }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix App
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
              <Nav.Link as={Link} to="/login" >Login</Nav.Link>
              <Nav.Link as={Link} to="/users">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/users/:Username">Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> 
              </>
            )}
          </Nav>
          <Routes>
            <Route
            path="/"
            element={
              <Form inline="true">
                <Row>
                  <Col xs= "auto">
                    <SearchBox
                    handleSearch={handleSearch}
                    query={query}
                    movies={movies}
                    />
                  </Col>
                </Row>
              </Form>
            }
            
            />
            {/* localStorage.clear(); */}
          </Routes>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
};

NavigationBar.propTypes = {
  onLoggedOut: PropTypes.func,
  user: PropTypes.object,
  // isDirectNavigation: PropTypes.func,
  movies: PropTypes.array,
  handleSearch: PropTypes.func,
  query: PropTypes.string,
  movie: PropTypes.object
  // filterMovies: PropTypes.string
};





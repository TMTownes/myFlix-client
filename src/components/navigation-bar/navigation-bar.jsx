import { Nav, Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { SearchBox } from "../SearchBox/searchBox.jsx";

import PropTypes from "prop-types";


export const NavigationBar = ({onLoggedOut, user, handleSearch, query, movie}) => {
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
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/users">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/users/:Username">Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> 
              <span/>
                <Form inline="true">
                  <Row>
                  <Col xs="auto">
                    <SearchBox
                    handleSearch={handleSearch}
                    query={query}
                    movie={movie}/>
                  </Col>
                </Row>
                </Form>
              
              </>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  onLoggedOut: PropTypes.func,
  user: PropTypes.object,
  handleSearch: PropTypes.func,
  query: PropTypes.func,
  movie: PropTypes.object
};
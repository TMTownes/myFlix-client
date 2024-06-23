import React from "react";
import {Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchBox.scss";

export const SearchBox = ({handleSearch, query}) => {

  return (
    <Row className="searchBox">
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
        className="row d-flex align-items-auto mt-6 mb-6"
       />
    </Row>
  );
};

SearchBox.propTypes = {
  // movie: PropTypes.object
  handleSearch: PropTypes.func,
  query: PropTypes.string,
  // setQuery: PropTypes.func, 
  // onSearch: PropTypes.func
};
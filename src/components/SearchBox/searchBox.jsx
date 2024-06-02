import React from "react";
import {Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchBox.scss";

export const SearchBox = ({ query, handleSearch }) => {


  return (
    <Row className="searchBox">
      <Form.Control
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search"
        className="row d-flex align-items-auto mt4 mb4 mb4"
       />

    </Row>
  );
};
SearchBox.propTypes = {
  handleSearch: PropTypes.func,
  query: PropTypes.string
};
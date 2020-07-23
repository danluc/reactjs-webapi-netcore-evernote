import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import "./index.css";
import LogoImage from "../../assets/images/logo.png";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Link to="/">
        <Navbar.Brand>
          <img alt="" src={LogoImage} className="d-inline-block align-top" />{" "}
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/register" className="btn btn-outline-light text-primary">
              Register
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary">
              Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

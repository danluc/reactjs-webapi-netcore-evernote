import React, { Fragment, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, Redirect, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

import UserService from '../../services/users'

import "./index.css";
import LogoImage from "../../assets/images/logo-white.png";

function Header(props) {

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));

  const logOut = async () => {
    await UserService.logout()
    setRedirectToLogin(true)
  }

  if (redirectToLogin) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark">
      <Link to="/notes">
        <Navbar.Brand>
          <img alt="" src={LogoImage} className="d-inline-block align-top" />{" "}
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link>
            <Button 
            variant="outline-light"
            onClick={() => props.setIsOpen(true)}
            >
              <FontAwesomeIcon icon={faList} />
              </Button>{' '}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown title={JSON.parse(user)['name']} id="basic-nav-dropdown">
          <NavDropdown.Item as={NavLink} to="/users/edit">Edit</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logOut}>Sair</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faShirt } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Basket from "../basket/Basket";
import resolveProps from "@mui/utils/resolveProps";

const Header = ({ isLoggedIn, clearToken }) => {

  const handleLogoutClick = () => {
    clearToken();
    window.location.reload();
  };

 
  

  return (
 
        <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand style={{ color: "#F01D7F" }}>
            <FontAwesomeIcon icon={faShirt} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to="../yourAccount/YourAccount"
              >
                Your Account
              </NavLink>
              <NavLink
                className="nav-link"
                to="../yourNeighbourhoodWardrobe/YourNeighbourhoodWardrobe"
              >
                Your Neighbourhood Wardrobe
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          {isLoggedIn ? (
            <NavLink
              className="nav-link"
              to="/logout"
              onClick={handleLogoutClick}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink 
            className="nav-link" 
            to="/login"
            >
              Login
            </NavLink>
          )}
          <Navbar.Brand
            href="/basket/Basket"
            style={{ color: "#F01D7F" }}
            className="basket"
          >
            <FontAwesomeIcon icon={faBasketShopping} />
          </Navbar.Brand>
        </Container>
      </Navbar>

  );
};

export default Header;


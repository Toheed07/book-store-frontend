/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../context/userContext";
import { signOutUser } from "../../utils/firebase/firebase";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth() ?? {};


 

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Book Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/add-book">Add</Nav.Link>
            </Nav>
            <Nav>
              {currentUser ? (
                <Nav.Link onClick={signOutUser}>Sign Out</Nav.Link>
              ) : (
                <Nav.Link href="/sign-in">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useFirebase } from "../Context/Firebase";

function MyNavbar() {
  const firebase = useFirebase();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">RF BookStore</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {firebase.isLoggedIn ? (
              <Nav.Link href="/book/list">Add Listing</Nav.Link>
            ) : (
              <></>
            )}
            <Nav.Link href="/book/orders">Orders</Nav.Link>
          </Nav>
          <Nav>
            {firebase.isLoggedIn ? (
              <>
                <Nav.Link
                  href="/"
                  onClick={() => {
                    firebase.logOut();
                  }}
                >
                  Log out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;

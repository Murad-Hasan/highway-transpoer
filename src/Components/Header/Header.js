import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
  <header>
            <Navbar sticky="top" bg="danger" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Highway Transports</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className = "mr-4 text-white text-decoration-none" as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link className = "mr-4 text-white text-decoration-none" as={Link} to="/destination">Destination</Nav.Link>
                            <Nav.Link className = "mr-4 text-white text-decoration-none" as={Link} to="/blog">Blog</Nav.Link>
                            <Nav.Link className = "mr-4 text-white text-decoration-none" as={Link} to="/contact">Contact</Nav.Link>
                        </Nav>
                        {loggedInUser.email || loggedInUser.name ? <h2>{loggedInUser.email}</h2> : <Button className ="bg-success" variant="primary" as={Link} to="/login" variant="danger">Log In</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
  )
};

export default Header;

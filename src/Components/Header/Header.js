import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
        <Navbar sticky="top" bg="danger" variant="dark" >
   <div className="container">
   <Navbar.Brand><Link className="text-white text-decoration-none" to='/home'>Highway Transports</Link></Navbar.Brand>
    <Nav className="ml-auto">
      <Link className = "mr-5 text-white text-decoration-none" to="/home">Home </Link>
      <Link className = "mr-5 text-white text-decoration-none" to="/destination">Destination </Link>
      <Link className = "mr-5 text-white text-decoration-none" to="/blog">Blog </Link>
      <Link className = "mr-5 text-white text-decoration-none" to="/contact">Contact </Link>
    </Nav>
    {
      loggedInUser && <h4 className="text-white">{loggedInUser.name}</h4>  
    }
    <Button as={Link} to ="/login" className ="bg-success" variant="primary">Log In</Button>
   </div>
  </Navbar>
  )
};

export default Header;

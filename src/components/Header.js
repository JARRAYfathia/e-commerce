import React from 'react'
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom"



const Header = () => {
   
    return (
        <Navbar bg="dark" variant="dark">
           
              <Nav className="mr-auto">
                <Link to="/artista">Comment ca marche?</Link>
                <Link to="/home">Nos produits</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/register">Inscription</Link>
               </Nav>
      
        </Navbar>
    )
}

export default Header
import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../Hooks/auth";
import { useState } from "react";


const NavBar = (props) => {

    const auth = useAuth()

    const { urlEndpoint } = props

    const url = `${urlEndpoint}/user/get-cart/${auth.userEmail}`;

    const getUserCart = async ()=> {
    
        const response = await fetch(url)
        
        console.log(response)
        const userCart = await response.json()



        setCartLength(userCart.user.cart.length)
    }

    const [cartLength, setCartLength] = useState(0)

    useEffect(()=>{
        if (auth.userToken !== null) {
            getUserCart()

            }



    }, [])



    return (
        <div className="nav-bar">

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        { auth.userToken === null &&
                        <>                        
                        <Nav.Link href="/registration">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        </>
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link className="">Welcome, {auth.userEmail}!</Nav.Link>
                        <Nav.Link className="" href="/cart">Cart: {cartLength}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
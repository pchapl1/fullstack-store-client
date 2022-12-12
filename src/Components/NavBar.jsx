import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Hooks/auth";
import { useState } from "react";



const NavBar = (props) => {

    const auth = useAuth()

    const navigate = useNavigate()

    const { urlEndpoint, user, cartLength, shouldRefetch } = props

    const [ cart, setCart] = useState(cartLength)

    const url = `${urlEndpoint}/user/get-cart/${auth.userEmail}`;


    const logout = async ()=> {

        const logoutResult = await auth.logout()

        console.log('logout result: ', logoutResult)

        if (logoutResult === true) {
            console.log('logging out')
            setCart(0)
            navigate('/login')

        }
    }

    const handleAddToCart = ()=> {
        setCart(cart + 1)
    }

    useEffect(()=> {
        setCart(cartLength)
    }, [cart, cartLength])



    return (
        <div className="nav-bar">

            <Navbar bg="light" expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Stuffopolis</Nav.Link>
                        { auth.userToken === null &&
                        <>                        
                        <Nav.Link href="/registration">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        </>
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        {
                            auth.userToken !== null &&
                            <Nav.Link className="">Welcome, {auth.userEmail}!</Nav.Link>
                        }
                        <Nav.Link onClick={handleAddToCart} className="" href="/cart">Cart: {cart} </Nav.Link>
                        {
                        auth.userToken !== null &&
                        <NavDropdown align="end" title="" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/orders">Order History</NavDropdown.Item>
                            <NavDropdown.Item href="/wishlist">My Wishlist</NavDropdown.Item>
                            <Nav.Link className="mx-2" href="/login" onClick={logout}>Logout </Nav.Link>
                        </NavDropdown>

                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
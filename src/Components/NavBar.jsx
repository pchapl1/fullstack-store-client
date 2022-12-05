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

    const { urlEndpoint, user, cartLength } = props

    // console.log(`cart Length: ${cartLength}`)

    const url = `${urlEndpoint}/user/get-cart/${auth.userEmail}`;


    const logout = async ()=> {

        const logoutResult = await auth.logout()

        if (logoutResult.success === true) {
            console.log(logoutResult.success)
            navigate('/')
        }
    }

    // const [cartLength, setCartLength] = useState('')

    // const [shouldRefetch, setShouldRefetch] = useState(false)


    // useEffect(()=>{

    //     const getCartLength = ()=> {
    //         setCartLength(user.cart.length)
    //     }

    //     if (user.cart) {
    //         getCartLength()
    //     }

    // }, [user.cart])

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
                        {
                            auth.userToken !== null &&
                            <Nav.Link className="">Welcome, {auth.userEmail}!</Nav.Link>
                        }
                        <Nav.Link className="" href="/cart">Cart: {cartLength} </Nav.Link>
                        <NavDropdown align="end" title="" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Order History</NavDropdown.Item>
                            <NavDropdown.Item href="#">Wishlist</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item href="#"> */}
                            <Nav.Link className="mx-2" onClick={logout}>Logout </Nav.Link>
                            {/* </NavDropdown.Item> */}
                            </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
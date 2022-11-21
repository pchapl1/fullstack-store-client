import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";


const RegistrationPage = (props) => {

    const auth = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [ password, setPassword] = useState("")

    const [firstName, setFirstName] = useState("")

    const [ lastName, setLastName] = useState("")

    const [ phoneNumber, setPhoneNumber] = useState("")

    const [ registerMessage, setRegisterMessage] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const register = async ()=> {

        // const registerResult = await auth.register(email, password, firstName, lastName, phoneNumber);
        const registerResult = await auth.register(email, password);

        if (registerResult.success){
            navigate('/login')
        } 
        if (!registerResult.success){
            setRegisterMessage(registerResult.message)
        }
    }

    return (
        <div className="auth-page">
            <div className="form-container">
                <Container>
                <Form>
                <h1>Registration Page</h1>
                <h3>{registerMessage}</h3>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleEmail} type="text" name="email" placeholder="Enter Email" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePassword} name="password" placeholder="Enter Password" />
                    {/* <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleFirstName} type="text" name="firstName" placeholder="Enter First Name" />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={handleLastName} name="lastName" placeholder="Enter Last Name" />
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" onChange={handlePhoneNumber} name="phoneNumber" placeholder="Enter Phone Number" /> */}
                </Form.Group>
                <Button onClick={register} variant="primary">
                    Sign Up
                </Button>
            </Form>
                </Container>
            </div>

        </div>
    )
}

export default RegistrationPage;
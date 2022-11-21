import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../Hooks/auth"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container";

const LoginPage = (props) => {

    const auth = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [ password, setPassword] = useState("")

    const [ loginMessage, setLoginMessage] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = async ()=> {

        const loginResult = await auth.login(email, password);

        if (loginResult.success === true){
            navigate('/')
        } 
        if (!loginResult.success){
            setLoginMessage(loginResult.message)
        }
    }

    return (
        <div className="auth-page">
            <div className="form-container">
            <Container>
            <Form>
                <h1 className="mb-5">Store Login</h1>
                <h3>{loginMessage}</h3>
                <Form.Group className="container mb-3" controlId="">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleEmail} type="text" name="email" placeholder="Enter Email" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePassword} name="password" placeholder="Enter Password" />
                </Form.Group>
                <Button onClick={login} variant="primary">
                    Login
                </Button>
            </Form>
            </Container>
            </div>
        </div>
    )
}

export default LoginPage;
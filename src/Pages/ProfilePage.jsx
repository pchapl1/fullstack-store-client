import React, { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const ProfilePage = (props) => {

    const { auth, user, urlEndpoint, shouldRefetch, setShouldRefetch } = props

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [firstName, setFirstName] = useState("")

    const [ lastName, setLastName] = useState("")

    const [ phoneNumber, setPhoneNumber] = useState("")

    const handleEmail = (e) => {

        setEmail(e.target.value)
        
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

    const [ form, setForm ] = useState({
        email : "",
        firstName : "",
        lastName : "",
        phoneNumber : ""
    })



    useEffect(()=>{
        setForm(user)
        setEmail(user.email)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setPhoneNumber(user.phoneNumber)

    }, [user])



    const updateUser = async (e) => {
        e.preventDefault()

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber : phoneNumber
        }

        const response = await fetch(`${urlEndpoint}/user/update-user/${user.id}`, {

            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const result = await response.json()

        navigate('/')
    }

    return (

        <div className="profile-page">
            <div className="form-container">
                <Container>
                <Form>
                <h1>User Profile</h1>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onLoadedData={handleEmail} onChange={handleEmail} type="text" name="email" placeholder="Enter Email"  defaultValue={email} />
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onLoadedData={handleFirstName} onChange={handleFirstName}  type="text" name="firstName" placeholder="Enter First Name" defaultValue={firstName}/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={handleLastName} type="text"  name="lastName" placeholder="Enter Last Name" defaultValue={lastName}/>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onLoadedData={handlePhoneNumber} onChange={handlePhoneNumber} type="number" name="phoneNumber" placeholder="Enter Phone Number" defaultValue={phoneNumber}/>
                </Form.Group>
                <Button onClick={updateUser} variant="primary">
                    Sign Up
                </Button>
            </Form>
                </Container>
            </div>
        </div>
    )
}

export default ProfilePage;
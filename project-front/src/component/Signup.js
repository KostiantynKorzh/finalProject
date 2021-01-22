import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {register} from "../redux/actions/auth"
import {useDispatch, useSelector} from "react-redux";
import validator from "validator";
import {setMessage} from "../redux/actions/message";
import Header from "./Header";

const Signup = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(true);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastFirstNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [isValidated, setValidated] = useState(false);

    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            if (successful) {
                window.alert(message);
            } else {
                setEmailError(message);
            }
        }
        initialRender.current = false;
    }, [errorMessage, message, successful])

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    const validate = (firstName, lastName, email, password) => {
        let containsProblem = true;
        if (!validator.isAlpha(firstName)) {
            setFirstNameError("Invalid first name");
            containsProblem = false;
        } else {
            setFirstNameError(null);
        }
        if (!validator.isAlpha(lastName)) {
            setLastFirstNameError("Invalid last name");
            containsProblem = false;
        } else {
            setLastFirstNameError(null);
        }
        if (!validator.isEmail(email)) {
            setEmailError("Invalid email");
            containsProblem = false;
        } else {
            setEmailError(null);
        }
        if (password.length < 8) {
            setPasswordError("Password should contains at least 8 characters");
            containsProblem = false;
        } else {
            setPasswordError(null);
        }
        return containsProblem;
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        if (validate(firstName, lastName, email, password)) {
            dispatch(register(firstName, lastName, email, password)).then(() => {
                    setSuccessful(true);
                }
            )
                .catch((error) => {
                    // console.log("message: ", message)
                    setErrorMessage(error)
                    // window.alert(error);
                    // console.log("error: ", error)
                    setSuccessful(false);
                });
        }

    };


    return (
        <div>
            <Header/>
            <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="First Name"
                                  onChange={onChangeFirstName}
                                  isInvalid={!!firstNameError}
                    />
                    {firstNameError && (
                        <Form.Control.Feedback type="invalid">
                            {firstNameError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name"
                                  onChange={onChangeLastName}
                                  isInvalid={!!lastNameError}
                    />
                    {lastNameError && (
                        <Form.Control.Feedback type="invalid">
                            {lastNameError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email"
                                  onChange={onChangeEmail}
                                  isInvalid={!!emailError}
                    />
                    {emailError && (
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password"
                                  isInvalid={!!passwordError}
                                  onChange={onChangePassword}/>
                    <Form.Control.Feedback type="invalid"/>
                    {passwordError && (
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit"
                        onClick={handleRegister}
                >
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Signup;
import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/auth";
import Header from "./Header";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        // form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
        dispatch(login(email, password))
            .then(() => {
                props.history.push("/home");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        // } else {
        //     setLoading(false);
        // }
    };

    // if (isLoggedIn) {
    //     return <Redirect to="/home"/>
    // }

    return (
        <div>
            <Header/>
            <Container>
                <Form className="m-4">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      onChange={onChangeEmail}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={onChangePassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            onClick={handleLogin}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Login;
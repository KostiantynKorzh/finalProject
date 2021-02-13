import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/auth";
import Header from "./Header";
import LangService from "../services/lang.service";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {message} = useSelector(state => state.message);

    const lang = localStorage.getItem('lang');

    const dispatch = useDispatch();

    const [content, setContent] = useState({
        email: '',
        enterEmail: '',
        password: '',
        enterPassword: '',
        submit: ''
    });

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    useEffect(() => {
        getContentLang(lang);
    }, [])

    const getContentLang = (lang) => {
        LangService.getContent(lang).then(
            resp => {
                setContent({
                    email: resp.data.email,
                    enterEmail: resp.data.enterEmail,
                    password: resp.data.password,
                    enterPassword: resp.data.enterPassword,
                    submit: resp.data.submit
                });
            }
        );
    };

    useEffect(() => {
        if (message != null) {
            alert(message);
        }
    }, [message])

    const handleLogin = (e) => {
        e.preventDefault();

        // form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
        dispatch(login(email, password))
            .then(() => {
                props.history.push("/home");
                window.location.reload();
            })
            .catch(() => {
                if (message != null) {
                    alert(message);
                }
            });
    };

    return (
        <div>
            <Header/>
            <Container>
                <Form className="m-4">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>{content.email}</Form.Label>
                        <Form.Control type="email" placeholder={content.enterEmail}
                                      onChange={onChangeEmail}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{content.password}</Form.Label>
                        <Form.Control type="password" placeholder={content.enterPassword}
                                      onChange={onChangePassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            onClick={handleLogin}>
                        {content.submit}
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Login;
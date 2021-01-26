import React, {useEffect, useState} from "react";
import {
    Nav,
    NavDropdown,
    Button, Form,
    FormControl,
    Navbar
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/auth";
import LangService from "../services/lang.service";


const Header = (props) => {

    const {user: currentUser} = useSelector((state) => state.auth);

    // const [langTemp, setLangTemp] = useState("");

    const lang = localStorage.getItem('lang');

    const [content, setContent] = useState({
        home: "",
        profile: "",
        users: "",
        tests: "",
        allTests: "",
        createTest: "",
        user: "",
        logout: "",
        lang: "",
        login: "",
        signup: "",
        passedTests: "",
        requiredTests: ""
    });

    // useEffect(() => {
    //     getContentLang(lang);
    //     console.log("Here")
    // }, [langTemp]);

    useEffect(() => {
        getContentLang(lang);
    }, []);

    const getContentLang = (lang) => {
        LangService.getContentHeader(lang).then(
            resp => {
                setContent({
                    home: resp.data.home,
                    profile: resp.data.profile,
                    users: resp.data.users,
                    tests: resp.data.tests,
                    allTests: resp.data.allTests,
                    createTest: resp.data.createTest,
                    user: resp.data.user,
                    logout: resp.data.logout,
                    lang: resp.data.lang,
                    login: resp.data.login,
                    signup: resp.data.signup,
                    passedTests: resp.data.passedTests,
                    requiredTests: resp.data.requiredTests
                });
            }
        );
    };

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">{content.home}</Nav.Link>
                    {currentUser && currentUser.roles.includes("ROLE_ADMIN") &&
                    <Nav.Link href="/admin/users">{content.users}</Nav.Link>}
                    {currentUser && currentUser.roles.includes("ROLE_ADMIN") &&
                    <NavDropdown title={content.tests} id="tests-dropdown">
                        <NavDropdown.Item href="/admin/tests">{content.allTests}</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/createTest">{content.createTest}</NavDropdown.Item>
                    </NavDropdown>
                    }
                    {currentUser && !currentUser.roles.includes("ROLE_ADMIN") &&
                    <NavDropdown title={content.tests} id="tests-dropdown">
                        <NavDropdown.Item
                            href={"/user/" + currentUser.id + "/passedTests"}>{content.passedTests}</NavDropdown.Item>
                        <NavDropdown.Item
                            href={"/user/" + currentUser.id + "/requiredTests"}>{content.requiredTests}</NavDropdown.Item>
                    </NavDropdown>}
                    {currentUser && <Nav.Link href="/profile">{content.profile}</Nav.Link>}
                    {currentUser && <Nav.Link href="/home" onClick={logOut}>{content.logout}</Nav.Link>}
                    {!currentUser && <Nav.Link href="/login">{content.login}</Nav.Link>}
                    {!currentUser && <Nav.Link href="/signup">{content.signup}</Nav.Link>}
                </Nav>
                <NavDropdown title={content.lang} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => {
                        getContentLang("en");
                        localStorage.setItem("lang", "en");
                        // props.setLang("en");
                        window.location.reload();
                    }}>EN</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {
                        getContentLang("ua");
                        localStorage.setItem("lang", "ua");
                        // props.setLang("ua");
                        window.location.reload();
                    }}>UA</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;
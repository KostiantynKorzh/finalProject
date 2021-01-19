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


const Header = () => {

    const [isAuth, setAuth] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
    // console.log("User is" + JSON.stringify(currentUser));
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setAuth(true);
            setAdmin(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const login = (e) => {
        setAuth(true);
        console.log("Here")
        // window.location.reload();
    }

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Navbar bg="light" expand="lg">
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav>
                {currentUser &&
                <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>}
                {currentUser && currentUser.roles.includes("ROLE_ADMIN") &&
                <Nav.Link href="/admin">Admin</Nav.Link>}
                {currentUser &&
                <Nav.Link href={`/user/${currentUser.id}`}>User</Nav.Link>}
                {currentUser && <Nav.Link href="/profile">Profile</Nav.Link>}
                {currentUser && <Nav.Link href="/home" onClick={logOut}>Logout</Nav.Link>}
                {!currentUser && <Nav.Link onClick={login} href="/login">Login</Nav.Link>}
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;
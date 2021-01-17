import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../redux/actions/admin";
import AdminService from "../services/admin.service";
import {Modal, Button, Table, Form} from "react-bootstrap";
import Header from "./Header";
import validator from "validator";
import {register} from "../redux/actions/auth";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    const [modal, setModal] = useState(false);

    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState({user: null});

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successful, setSuccessful] = useState(true);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastFirstNameError] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        UserService.getAdminContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );

        fetchUsers();

    }, []);

    const fetchUsers = () => {
        AdminService.getAll().then((response) => {
            setUsers(response.data);
        });
    }

    const handleDelete = (id) => {
        console.log("delete", id);
        // AdminService.deleteUser(id).then(r => fetchUsers());
    }

    const handleEdit = ({user}) => {
        console.log("edit", user.id);
        // console.log("user", user.id);
        // setUserToEdit({user: user});
        console.log(setUserToEdit);
        setModal(true);
    }

    const TableColumns = () => {
        return (users.map(user =>
            <tbody key={user.id}>
            <tr>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><Button onClick={() => handleEdit({user})}>Edit</Button></td>
                <td><Button onClick={() => handleDelete(user.id)}>Delete</Button></td>
            </tr>
            </tbody>));

        //     <div key={user.email}><Button
        //     // onClick={() => handleDelete(user.id)}
        // >{user.email}</Button></div>)
    }


    const onChangeFirstName = (e) => {
        // e.preventDefault()
        const firstName = e.target.value;
        // setFirstName(firstName);
        console.log("first = ", firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        // setLastName(lastName);
        console.log("last = ", lastName);
    };


    const validate = (firstName, lastName) => {
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
        return containsProblem;
    }


    const handleEditModal = (e) => {
        // e.preventDefault();

        // if (validate(firstName, lastName)) {

        console.log(e);
        console.log("Successful editing", firstName, lastName);
        // }
        // window.alert(message);
    };

    const ShowModal = ({user}) => {
        return (
            <Modal show={modal}
                   onHide={() => setModal(false)}
            >
                <Modal.Header>Editing User</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName"
                                          onChange={(e) => onChangeFirstName(e)}
                                // defailtValue="first name"
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
                            <Form.Control type="text" name="lastName"
                                          onChange={(e) => onChangeLastName(e)}
                                          value={lastName}
                                          isInvalid={!!lastNameError}
                            />
                            {lastNameError && (
                                <Form.Control.Feedback type="invalid">
                                    {lastNameError}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Button variant="primary"
                                onClick={(e) => handleEditModal(e)}>
                            Edit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <h3>{content}</h3>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <TableColumns/>
                </Table>
                {/*<Button onClick={() => handleDelete(6)}>delete 6</Button>*/}
                {/*{users.map(user => <div key={user.email}><Button*/}
                {/*    onClick={() => handleDelete(user.id)}*/}
                {/*>{user.email}</Button></div>)}*/}
            </div>
            <ShowModal user={userToEdit}/>
        </div>
    );
};

export default BoardAdmin;
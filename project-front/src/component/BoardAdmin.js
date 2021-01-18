import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../redux/actions/admin";
import AdminService from "../services/admin.service";
import {ToggleButtonGroup, Dropdown, Modal, Button, Table, Form, InputGroup} from "react-bootstrap";
import Header from "./Header";
import validator from "validator";
import {register} from "../redux/actions/auth";
import axios from "axios";
import {ToggleButton} from "react-bootstrap";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    const [modal, setModal] = useState(false);
    const [testsModalShow, setTestsModalShow] = useState(false);

    const [testsToAdd, setTestsToAdd] = useState([]);
    const [userToAddTests, setUserToAddTests] = useState(0);

    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successful, setSuccessful] = useState(true);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastFirstNameError] = useState("");

    const [tests, setTests] = useState([]);

    const dispatch = useDispatch();

    let firstNameTemp;
    let lastNameTemp;

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

    const handleEdit = (user) => {
        // console.log(user.firstName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        console.log(firstName);
        console.log(lastName);
        firstNameTemp = firstName;
        lastNameTemp = lastName;
        setUserToEdit(user);
        console.log("refresh");
        setModal(true);
    }

    const handleAddTests = (e, id) => {
        AdminService.getNonRequiredTests(id).then(
            (response) => {
                console.log(response.data);
                setTests(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                // setContent(_content);
            }
        );
        // tests.map(test => console.log(test));
        setUserToAddTests(id);
        setTestsModalShow(true);
    }

    const TableColumns = () => {
        return (users.map(user =>
            <tbody key={user.id}>
            <tr>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                {/*<td><Button onClick={() => handleEdit({user})}>Edit</Button></td>*/}
                {/*<td><Button onClick={() => handleDelete(user.id)}>Delete</Button></td>*/}
                <td>
                    <Dropdown>
                        <Dropdown.Toggle>
                            More
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => handleAddTests(e, user.id)}>Add tests</Dropdown.Item>
                            {/*<Dropdown.Item onClick={() => handleEdit({*/}
                            {/*    firstName: user.firstName,*/}
                            {/*    lastName: user.lastName*/}
                            {/*})}>Edit</Dropdown.Item>*/}
                            <Dropdown.Item onClick={() => handleEdit(user)}>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            </tbody>));

        //     <div key={user.email}><Button
        //     // onClick={() => handleDelete(user.id)}
        // >{user.email}</Button></div>)
    }


    const onChangeFirstName = (e) => {
        e.preventDefault();
        // const firstNameTemp = e.target.value;

        firstNameTemp = e.target.value;
        // console.log("change: " + firstNameTemp);


        // setFirstName(firstNameTemp)
        // console.log("first = ", firstName);
    };

    const onChangeLastName = (e) => {
        // e.preventDefault();
        // const lastNameTemp = e.target.value;
        lastNameTemp = e.target.value;
        // setLastName(lastNameTemp);
        // console.log("lastTemp = ", lastNameTemp);
        // console.log("last = ", lastName);
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
        e.preventDefault();

        // if (validate(firstName, lastName)) {

        console.log("temp = ", firstNameTemp, lastNameTemp);
        setFirstName(firstNameTemp);
        setLastName(lastNameTemp);
        console.log("after = ", firstName, lastName);

        // console.log(e);
        // console.log("Successful editing", firstName, lastName);
        console.log("Successful editing", firstNameTemp, firstNameTemp);

        userToEdit.firstName = firstNameTemp;
        userToEdit.lastName = lastNameTemp;

        AdminService.updateUser(userToEdit.id, userToEdit);

        // }
        // window.alert(message);
    };

    const handleAddTestsSubmit = () => {
        AdminService.addTestsToUser(userToAddTests, tests);
    }

    const handleAddOneTest = (id) => {
        // setTests((old) => [...old, id]);
        AdminService.addOneTestToUser(userToAddTests, id);
        setSuccessful(true);
    }

    const TestsModal = () => {
        return (
            <Modal show={testsModalShow}
                   onHide={() => setTestsModalShow(false)}
            >
                <Modal.Header>Add tests</Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                        {tests.map(test => (
                                <tr>
                                    <td>{test.title}</td>
                                    <td>{test.subject}</td>
                                    <td>{test.difficulty}</td>
                                    <td>{test.created}</td>
                                    <td>
                                        {/*<InputGroup className="mb-3">*/}
                                        {/*    <InputGroup.Prepend >*/}
                                        {/*        <InputGroup.Checkbox  aria-label="ADD" />*/}
                                        {/*    </InputGroup.Prepend>*/}
                                        {/*</InputGroup>*/}
                                        {/*<ToggleButtonGroup type="checkbox"*/}
                                        {/*    // value={value}*/}
                                        {/*    //                onChange={handleChange}*/}
                                        {/*>*/}
                                        {/*    <ToggleButton value={test.id}>Add</ToggleButton>*/}
                                        {/*</ToggleButtonGroup>*/}
                                        <Button type="submit" onClick={() => handleAddOneTest(test.id)}>ADD</Button>
                                    </td>
                                </tr>
                            )
                        )}
                        {/*<tr><td>test</td></tr>*/}
                        {/*{tests[0]}*/}
                        </tbody>
                        <Button onClick={() => handleAddTestsSubmit}>Submit</Button>
                    </Table>
                </Modal.Body>
            </Modal>
        )
    }

    const ShowModal = () => {

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
                                          value={firstNameTemp}
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
                                          value={lastNameTemp}
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
            <ShowModal/>
            <TestsModal/>
        </div>
    );
};

export default BoardAdmin;
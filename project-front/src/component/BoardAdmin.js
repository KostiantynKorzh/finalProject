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
import AddTestsToUsersModal from "./modal/AddTestsToUsersModal";
import CreateTestModal from "./modal/CreateTestModal";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    const [modal, setModal] = useState(false);
    const [addTestsToUsersModalShow, setAddTestsToUsersModalShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [createTestShow, setCreateTestShow] = useState(false);

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
        setAddTestsToUsersModalShow(true);
    }

    const TableColumns = () => {
        return (
            users.map(user =>
                <tbody key={user.id}>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle>
                                More
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => handleAddTests(e, user.id)}>Add tests</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleEdit(user)}>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                </tbody>));
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

    // const Mod = () => {
    //     return (
    //         // <CreateTestModal/>
    //         <Modal
    //             // onShow={props.showModal}
    //             onShow={showModal}
    //             onHide={() => setShowModal(false)}
    //             animation={false}
    //         >
    //             <Modal.Header>Creating test</Modal.Header>
    //             <Modal.Body>
    //                 {/*<Form>*/}
    //                 {/*    <Form.Group controlId="formTestTitle">*/}
    //                 {/*        <Form.Label>Test Title</Form.Label>*/}
    //                 {/*        <Form.Control type="text" name="testTitle"*/}
    //                 {/*        />*/}
    //                 {/*    </Form.Group>*/}
    //
    //                 {/*    <Form.Group controlId="formSubject">*/}
    //                 {/*        <Form.Label>Last Name</Form.Label>*/}
    //                 {/*        <Form.Control as="select" name="subject"*/}
    //                 {/*        >*/}
    //                 {/*            <option>First</option>*/}
    //                 {/*            <option>Second</option>*/}
    //                 {/*            <option>Third</option>*/}
    //                 {/*        </Form.Control>*/}
    //                 {/*    </Form.Group>*/}
    //                 {/*</Form>*/}
    //                 <h2>Hi</h2>
    //             </Modal.Body>
    //         </Modal>
    //     );
    // }

    const ShowModal = () => {
        return (
            <Modal show={modal}
                   onHide={() => setModal(false)}
                   animation={false}
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

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <Button href="/admin/createTest">Create test</Button>
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
            </div>
            <Button onClick={() => handleShowModal()}>Here</Button>
            <ShowModal/>
            {/*<TestsModal/>*/}
            <AddTestsToUsersModal props={{
                tests: tests,
                testsModalShow: addTestsToUsersModalShow,
                setTestsModalShow: setAddTestsToUsersModalShow,
                userToAddTests: userToAddTests
            }}/>
            <CreateTestModal props={{
                createTestShow: showModal,
                setCreateTestShow: setShowModal
            }}/>
        </div>
    );
};

export default BoardAdmin;
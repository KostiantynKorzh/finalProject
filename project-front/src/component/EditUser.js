import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Button, Jumbotron, Form} from "react-bootstrap";
import AdminService from "../services/admin.service";

const EditUser = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const [user, setUser] = useState({
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const getUser = () => {
        AdminService.getUser(props.match.params.id).then(
            resp => {
                setUser({
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName
                });
            }
        );
    }

    const validate = (firstName, lastName) => {
        let firstNameValid =
            (firstName.length > 3 &&
                firstName.match('^[a-zA-Zа-яА-ЯёъїґЇҐєЄіІ]+$'));

        let lastNameValid =
            (lastName.length > 3 &&
                lastName.match('^[a-zA-Zа-яА-ЯёъїґЇҐєЄіІ]+$'));

        console.log(firstNameValid);
        console.log(lastNameValid);

        setFirstNameError(firstNameValid ? '' : 'Error first name');
        setLastNameError(lastNameValid ? '' : 'Error last name');

        return firstNameValid && lastNameValid;

    }

    return (
        <div>
            <Header/>
            <Jumbotron>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName"
                                      onChange={(e) => {
                                          setFirstName(e.target.value);
                                      }}
                                      value={firstName}
                                      isInvalid={!!firstNameError}
                        />
                        {firstNameError.length > 0 && (
                            <Form.Control.Feedback type="invalid">
                                {firstNameError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName"
                                      onChange={(e) => {
                                          setLastName(e.target.value);
                                      }}
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
                            onClick={() => {
                                if (validate(firstName, lastName)) {
                                    user.firstName = firstName;
                                    user.lastName = lastName;
                                    // AdminService.updateUser(props.match.params.id, user);
                                    // props.history.push('/admin/users');
                                    // window.location.reload();
                                } else {
                                    console.log("NON VALID");
                                    console.log(firstNameError);
                                    console.log(lastNameError);
                                }
                            }}>
                        Edit
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );

};

export default EditUser;
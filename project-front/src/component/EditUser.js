import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Button, Jumbotron, Form} from "react-bootstrap";
import AdminService from "../services/admin.service";

const EditUser = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
                            // isInvalid={!!firstNameError}
                        />
                        {/*{firstNameError && (*/}
                        {/*    <Form.Control.Feedback type="invalid">*/}
                        {/*        {firstNameError}*/}
                        {/*    </Form.Control.Feedback>*/}
                        {/*)}*/}
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName"
                                      onChange={(e) => {
                                          setLastName(e.target.value);
                                      }}
                                      value={lastName}
                            // isInvalid={!!lastNameError}
                        />
                        {/*{lastNameError && (*/}
                        {/*    <Form.Control.Feedback type="invalid">*/}
                        {/*        {lastNameError}*/}
                        {/*    </Form.Control.Feedback>*/}
                        {/*)}*/}
                    </Form.Group>

                    <Button variant="primary"
                            onClick={() => {
                                user.firstName = firstName;
                                user.lastName = lastName;
                                AdminService.updateUser(props.match.params.id, user);
                                props.history.push('/admin/users');
                                window.location.reload();
                            }}>
                        Edit
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );

};

export default EditUser;
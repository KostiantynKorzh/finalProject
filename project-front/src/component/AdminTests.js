import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Dropdown, Jumbotron, Table} from "react-bootstrap";
import TestService from "../services/test.service";
import Test from "./Test";

const AdminTests = () => {

    const [tests, setTests] = useState([]);

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        getTests();
    }, []);

    useEffect(() => {
        getTests();
        setDeleted(false);
    }, [deleted])

    const getTests = () => {
        TestService.getTests().then(
            resp => {
                console.log(resp.data);
                setTests(resp.data);
            }
        )
    };

    const TableColumnsTests = () => {
        return (
            tests.map(test =>
                <tbody key={test.id}>
                <tr>
                    <td>{test.id}</td>
                    <td>{test.title}</td>
                    <td>{test.subject}</td>
                    <td>{test.difficulty}</td>
                    <td>{test.duration}</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle>
                                More
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    // onClick={() => {
                                    //     props.history.push('/admin/editUser/' + user.id);
                                    //     window.location.reload();
                                    // }}
                                >Edit</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        TestService.deleteTest(test.id).then(
                                            () => setDeleted[true]);
                                    }}
                                >Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                </tbody>));
    };

    return (
        <div>
            <Header/>
            <Jumbotron>
                <div className="container">
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Difficulty</th>
                            <th>Duration</th>
                        </tr>
                        </thead>
                        <TableColumnsTests/>
                    </Table>
                </div>
            </Jumbotron>
        </div>
    );

};

export default AdminTests;
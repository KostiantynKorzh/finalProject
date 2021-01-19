import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import message from "../redux/reducers/message";
import {useSelector} from "react-redux";
import axios from "axios";
import authHeader from "../services/auth-header";
import {Button, Modal, Table} from "react-bootstrap";

const BoardUser = (props) => {
    const [content, setContent] = useState([]);

    const [passedTests, setPassedTests] = useState([]);
    const [requiredTests, setRequiredTests] = useState([]);


    useEffect(() => {
        UserService.getRequiredTests(props.match.params.id).then(
            (response) => {
                console.log(response.data);
                setRequiredTests(response.data);
            });

        UserService.getPassedTests(props.match.params.id).then(
            (response) => {
                console.log(response.data);
                setPassedTests(response.data);
            });

    }, []);

    const handlePass = (test) => {
        UserService.passTest(props.match.params.id, test.id);
        UserService.getRequiredTests(props.match.params.id).then(
            (response) => {
                console.log(response.data);
                setRequiredTests(response.data);
            });

        UserService.getPassedTests(props.match.params.id).then(
            (response) => {
                console.log(response.data);
                setPassedTests(response.data);
            });
        console.log(test.id);
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>REQUIRED TESTS</h1>
                <Table>
                    <tbody>
                    {requiredTests.map(test =>
                        <tr>
                            <td>
                                <div>{test.title}</div>
                            </td>
                            <td><Button onClick={() => handlePass(test)}>PASS</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <h1>PASSED TESTS</h1>
                <h3>{passedTests.map(test =>
                    <div>{test.title}</div>
                )}</h3>
            </header>
        </div>
    );
};
export default BoardUser;
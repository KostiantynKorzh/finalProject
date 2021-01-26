import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Button, Jumbotron, Table} from "react-bootstrap";
import UserService from "../services/user.service";
import LangService from "../services/lang.service";

const UserRequiredTests = (props) => {

    const lang = localStorage.getItem('lang');

    const [needRefresh, setNeedRefresh] = useState(false);
    const [requiredTests, setRequiredTests] = useState([]);
    const [content, setContent] = useState({
        passedTests: "",
    });

    useEffect(() => {
        UserService.getRequiredTests(props.match.params.id).then(
            (response) => {
                setRequiredTests(response.data);
            });
    }, []);


    useEffect(() => {
        UserService.getRequiredTests(props.match.params.id).then(
            (response) => {
                setRequiredTests(response.data);
            });
    }, [needRefresh]);

    const handleTake = (test) => {
        let path = `/user/takeTest/${test.id}`;
        props.history.push(path);
        window.location.reload();
    }

    return (
        <div>
            <Header/>
            <Jumbotron>
                {/*<h1>{content.passedTests}</h1>*/}
                <h1>Required Tests</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Difficulty</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requiredTests.map(test =>
                        <tr>
                            <td>
                                {test.title}
                            </td>
                            <td>
                                {test.subject}
                            </td>
                            <td>
                                {test.difficulty}
                            </td>
                            <td>
                                {test.duration}
                            </td>
                            <td>
                                <Button
                                    onClick={() => handleTake(test)}
                                >Take</Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        UserService.passTest(props.match.params.id, test.id).then(
                                            () => setNeedRefresh(true));
                                    }}
                                >Pass</Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Jumbotron>
        </div>
    );

};

export default UserRequiredTests;
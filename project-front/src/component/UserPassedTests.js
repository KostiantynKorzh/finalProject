import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Button, Jumbotron, Table} from "react-bootstrap";
import LangService from "../services/lang.service";
import {useSelector} from "react-redux";
import UserService from "../services/user.service";

const UserPassedTests = (props) => {

    const lang = localStorage.getItem('lang');

    const [needRefresh, setNeedRefresh] = useState(false);
    const [passedTests, setPassedTests] = useState([]);
    const [content, setContent] = useState({
        passedTests: "",
    });

    useEffect(() => {
        UserService.getPassedTests(props.match.params.id).then(
            (response) => {
                setPassedTests(response.data);
            });
        getContent();
    }, []);

    useEffect(() => {
        getContent(lang);
    }, [lang])

    useEffect(() => {
        UserService.getPassedTests(props.match.params.id).then(
            (response) => {
                setPassedTests(response.data);
            });
        // setNeedRefresh(false);
    }, [needRefresh]);

    const getContent = (lang) => {
        LangService.getContentUserPassedTests(lang).then(
            resp => {
                setContent({
                    passedTests: resp.data.passedTests,
                });
            });
    };


    return (
        <div>
            <Header/>
            <Jumbotron>
                <h1>{content.passedTests}</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {passedTests.map(test =>
                        <tr>
                            <td>
                                <div>{test.title}</div>
                                <div>{test.result}</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Jumbotron>
        </div>
    );

};

export default UserPassedTests;
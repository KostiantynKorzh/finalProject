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
                console.log(response.data)
            });
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
                        <th>Subject</th>
                        <th>Difficulty</th>
                        <th>Score</th>
                        <th>Pass Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {passedTests.map(result =>
                        <tr>
                            <th>{result.title}</th>
                            <th>{result.subject}</th>
                            <th>{result.difficulty}</th>
                            <th>{result.score}</th>
                            <th>{result.passTimestamp}</th>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Jumbotron>
        </div>
    );

};

export default UserPassedTests;
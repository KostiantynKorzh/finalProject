import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import {useSelector} from "react-redux";
import {Button, Modal, Table} from "react-bootstrap";
import Header from "./Header";
import LangService from "../services/lang.service";

const BoardUser = (props) => {

    const {user: currentUser} = useSelector((state) => state.auth);

    const [content, setContent] = useState({
        requiredTests: "",
        passedTests: "",
        pass: "",
        take: ""
    });

    const [needRefresh, setNeedRefresh] = useState(false);

    const [passedTests, setPassedTests] = useState([]);
    const [requiredTests, setRequiredTests] = useState([]);

    const lang = localStorage.getItem('lang');

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

        // getContent(lang);

    }, []);

    // React.useEffect(() => {
    //     console.log("Effect");
    //     window.addEventListener('storage', () => {
    //         console.log("Listener");
    //     });
    //
    //
    // },[])

    // useEffect(() => {
    //     getContent(lang);
    // }, [lang])

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
        // setNeedRefresh(false);
    }, [needRefresh]);



    const handlePass = (test) => {
        UserService.passTest(props.match.params.id, test.id);
        setNeedRefresh(true);
        // setNeedRefresh(false);
        // UserService.getRequiredTests(props.match.params.id).then(
        //     (response) => {
        //         console.log(response.data);
        //         setRequiredTests(response.data);
        //     });
        //
        // UserService.getPassedTests(props.match.params.id).then(
        //     (response) => {
        //         console.log(response.data);
        //         setPassedTests(response.data);
        //     });
        console.log(test.id);
    }

    const handleTake = (test) => {
        let path = `/user/${currentUser.id}/takeTest/${test.id}`;
        props.history.push(path);
        window.location.reload();
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <header className="jumbotron">
                    <h1>{content.requiredTests}</h1>
                    <Table>
                        <tbody>
                        {requiredTests.map(test =>
                            <tr>
                                <td>
                                    <div>{test.title}</div>
                                </td>
                                <td><Button onClick={() => handleTake(test)}>{content.take}</Button></td>
                                <td><Button onClick={() => handlePass(test)}>{content.pass}</Button></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <h1>{content.passedTests}</h1>
                    <h3>{passedTests.map(test =>
                        <div>{test.title}</div>
                    )}</h3>
                </header>
            </div>
        </div>
    );
};
export default BoardUser;
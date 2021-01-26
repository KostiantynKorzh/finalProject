import React, {useEffect, useState} from "react";
import Header from "./Header";
import UserService from "../services/user.service";
import {Jumbotron} from "react-bootstrap";

const CompleteTest = ({props}) => {

    const [res, setRes] = useState(0);

    useEffect(() => {

        console.log(props);
        setRes(props.score);
        UserService.addResult(props.userId, props.testId, props.score).then(
            (resp) => {
                console.log(resp);
            }
        );

    }, [])

    return (
        <div>
            <Jumbotron>
                <h1>{res}%</h1>
            </Jumbotron>
        </div>
    );

};

export default CompleteTest;
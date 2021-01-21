import React, {useEffect, useState} from "react";
import AdminService from "../services/admin.service";
import {Card, Form} from "react-bootstrap";
import CreateTestQuestionCard from "./CreateTestQuestionCard";

const CreateTest = (props) => {

    const [testId, setTestId] = useState(0);

    const [testToFill, setTestToFill] = useState({
        title: "",
        subject: "",
        difficulty: ""
    });

    useEffect(() => {
        AdminService.getTest(props.match.params.id).then(
            resp => {
                setTestToFill({
                    title: resp.data.title,
                    subject: resp.data.subject,
                    difficulty: resp.data.difficulty
                })
                setTestId(props.match.params.id);
            }
    );
    }, [props.match.params.id]);

    return (
        <div>
            <div>{testToFill.title}</div>
            <div>{testToFill.subject}</div>
            <div>{testToFill.difficulty}</div>
            <div>{testId}</div>
            <CreateTestQuestionCard testId={testId}/>
        </div>
    );

};

export default CreateTest;
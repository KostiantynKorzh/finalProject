import React, {useEffect, useState} from "react";
import AdminService from "../services/admin.service";
import {Jumbotron, Card, Form} from "react-bootstrap";
import CreateTestQuestionCard from "./CreateTestQuestionCard";
import Header from "./Header";
import {useSelector} from "react-redux";
import {CheckIfAdmin} from "../utils/roleCheck";

const CreateTest = (props) => {

    const [testId, setTestId] = useState(0);

    const [createdQuestion, setCreatedQuestion] = useState([]);

    const {user: currentUser} = useSelector((state) => state.auth);

    const [testToFill, setTestToFill] = useState({
        title: "",
        subject: "",
        difficulty: ""
    });

    useEffect(() => {
        CheckIfAdmin({
            user: currentUser,
            history: props.history
        });

        AdminService.getTest(props.match.params.id).then(
            resp => {
                setTestToFill({
                    title: resp.data.title,
                    subject: resp.data.subject,
                    difficulty: resp.data.difficulty,
                    duration: resp.data.duration
                })
                setTestId(props.match.params.id);
            }
        );
    }, []);

    return (
        <div>
            <Header/>
            <Jumbotron>
                <h1>{testToFill.title}</h1>
                <h3>Subject: {testToFill.subject}</h3>
                <h3>Difficulty: {testToFill.difficulty}</h3>
                <h3>Duration: {testToFill.duration}</h3>
                <CreateTestQuestionCard testId={testId}
                                        history={props.history}
                                        createdQuestions={createdQuestion}
                />
            </Jumbotron>
        </div>
    );

};

export default CreateTest;
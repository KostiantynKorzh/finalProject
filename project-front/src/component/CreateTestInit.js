import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import Header from "./Header";
import AdminService from "../services/admin.service";

const CreateTestInit = (props) => {

    const [newTest, setNewTest] = useState({
        title: "",
        subject: "",
        difficulty: ""
    });

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!ready) {
            handleSubmit();
        }

    }, [ready]);
    // setReady(true);

    const handleSubmit = () => {
        console.log(title);
        console.log(subject);
        console.log(difficulty);


        setNewTest({
            title: title,
            subject: subject,
            difficulty: difficulty
        });

        // if (ready) {
        console.log(newTest);
        // }

        AdminService.createTest(newTest).then(
            resp => {
                console.log(resp.data);
                props.history.push("/admin/createTest/"+resp.data.id);
                // window.reload
            }
        );



    }

    return (
        <div>
            <Header/>
            <Form>
                <Form.Group controlId="formTestTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="testTitle"
                                  onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formTestSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control as="select" type="text" name="testSubject"
                                  onChange={(e) => setSubject(e.target.value)}
                                  defaultValue="MATH"
                    >
                        <option value="MATH">MATH</option>
                        <option value="ENGLISH">ENGLISH</option>
                    </Form.Control>
                    <Form.Group controlId="formTestDifficulty">
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Control as="select" type="text" name="testDifficulty"
                                      onChange={(e) => {
                                          console.log(e.target.value);
                                          setDifficulty(e.target.value);
                                      }}
                                      defaultValue="EASY"
                        >
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Button variant="primary"
                        onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default CreateTestInit;
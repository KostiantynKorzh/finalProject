import React, {useEffect, useState} from "react";
import {Jumbotron, Button, Form} from "react-bootstrap";
import Header from "./Header";
import AdminService from "../services/admin.service";
import {useSelector} from "react-redux";

const CreateTestInit = (props) => {

    const [newTest, setNewTest] = useState({
        title: "",
        subject: "MATH",
        difficulty: "EASY",
        duration: 0
    });

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("MATH");
    const [difficulty, setDifficulty] = useState("EASY");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        setNewTest({
            title: title,
            subject: subject,
            difficulty: difficulty,
            duration: duration,
        });
    }, [title, subject, difficulty, duration]);

    const handleSubmit = () => {
        console.log(newTest);

        AdminService.createTest(newTest).then(
            resp => {
                props.history.push("/admin/createTest/" + resp.data.id);
                window.location.reload();
            }
        );


    }

    return (
        <div>
            <Header/>
            <Jumbotron>
                <Form>
                    <Form.Group controlId="formTestTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="testTitle"
                                      onChange={(e) =>
                                          setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formTestSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control as="select" type="text" name="testSubject"
                                      onChange={(e) => {
                                          console.log(e.target.value);

                                          setSubject(e.target.value)
                                      }}
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
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" name="testTime"
                                  onChange={(e) =>
                                      setDuration(e.target.value)}/>
                </Form>
                <Button variant="primary"
                        onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Jumbotron>
        </div>
    );
};

export default CreateTestInit;
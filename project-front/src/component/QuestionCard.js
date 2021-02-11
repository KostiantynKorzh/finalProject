import React, {useState} from "react";
import {Button, Form, Card, FormControl, InputGroup, ListGroup} from "react-bootstrap";

const QuestionCard = ({props}) => {

    const [chosenAnswerId, setChosenAnswerId] = useState(0);

    const handleSubmitQuestion = () => {
        console.log(props.answers.find(answer => answer.correct).id == chosenAnswerId);
    }

    const handleSubmitTest = () => {
        console.log(props.answers.find(answer => answer.correct).id == chosenAnswerId);
    }

    const handleChange = (e) => {
        setChosenAnswerId(e.target.id);
        console.log(e.target.id);
    }

    return (
        <div className="m-4">
            <Card>
                <Card.Header>
                    {props.numberOfQuestion}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.questionText}</Card.Title>
                    {/*<Card.Title>title</Card.Title>*/}
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                {props.answers.map(answer => {
                                    return (
                                        <div key={answer.id}>
                                            <Form.Check
                                                type="radio"
                                                label={answer.answerText}
                                                name="1"
                                                id={answer.id}
                                                onChange={(e) =>
                                                    props.handleChangeInCard(props.questionId, e,
                                                        props.answers.find(answer => answer.correct).id)}
                                            />
                                        </div>
                                    );
                                })}
                            </Form.Group>
                            {/*<Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>*/}
                        </Form>
                    </Card.Body>
                </Card.Body>
            </Card>
            {/*<Button onClick={() => props.handleSubmit}>Submit question</Button>*/}
        </div>
    );

};

export default QuestionCard;
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import AdminService from "../services/admin.service";
import {
    ToggleButton,
    Col,
    Row,
    Button,
    ButtonGroup,
    ListGroup,
    Card,
    Form,
    InputGroup,
    FormControl
} from "react-bootstrap";

const CreateTestQuestionCard = (props) => {

    const [numberOfAnswers, setNumberOfAnswers] = useState([]);
    const [counter, setCounter] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [submit, setSubmit] = useState(false);
    const [nextOrFinish, setNextOrFinish] = useState(false);
    const [initial, setInitial] = useState(true);

    let counterTemp = 0;


    const childRef = useRef();

    useEffect(() => {
        if (initial) {
            setNumberOfAnswers([<NewAnswer/>]);
            setInitial(false);
        }
    }, [initial])

    useEffect(() => {
        console.log("submit = ", submit);
    }, [submit])

    useEffect(() => {
        if (submit) {
            algo();
            setSubmit(false);
            console.log(answers);

        }
    }, [answers, submit])

    const handleAddNew = () => {
        setNumberOfAnswers(prevState => [...prevState, <NewAnswer ref={childRef}/>]);
    };


    const algo = () => {
        childRef.current.submitOnChild();
    }

    const handleSubmit = () => {
        setSubmit(true);
        setNextOrFinish(true);
    };

    const NewAnswer = forwardRef((props, ref) => {

        const [answer, setAnswer] = useState("");
        const [disabled, setDisabled] = useState(false);

        useImperativeHandle(ref, () => ({
            submitOnChild() {
                counterTemp++;
                setDisabled(true);
                setAnswers(prev => [...prev, answer]);
            }
        }));


        const handleAddNewChild = () => {
            setCounter(counter => counter + 1);
            counterTemp++;
            console.log("counterTemp", counterTemp);
            setDisabled(true);
            setAnswers(prev => [...prev, answer]);
            handleAddNew();
        };

        const handleSubmitChild = () => {
            setDisabled(true);
            setAnswers(prev => [...prev, answer]);
        };

        const handleChange = (e) => {
            setAnswer(e.target.value);
        }

        return (
            <div>
                <Row style={{margin: "20px"}}>
                    <Col xs={1}>
                        <Form.Check
                            type="radio"
                            // label={answer.answerText}
                            name="answerRadioButtons"
                            id={counterTemp}
                            onChange={(e) => {
                                console.log(e.target.id);
                                setCorrectAnswer(e.target.id);
                            }}
                        />
                    </Col>
                    <Col xs={9}>
                        <Form.Control placeholder="Enter answer"
                                      onChange={(e) => {
                                          handleChange(e);
                                      }}
                                      disabled={disabled}
                        />
                    </Col>
                    <Col>
                        <Button
                            onClick={() => handleAddNewChild()}
                        >Add new</Button>
                    </Col>
                </Row>
            </div>
        );
    })

    const postQuestion = () => {

        handleNext();
        console.log(props.testId, questionText, answersToSend);

        const question = {
            testId: props.testId,
            questionText: questionText,
            answers: answersToSend,
        };

        AdminService.postQuestion(question).then(
            resp => {
                console.log(resp.data);
            }
        );
    }

    let answersToSend = [{
        answerText: "",
        correct: false
    }];

    const handleNext = () => {
        for (let i = 0; i < answers.length; i++) {
            answersToSend[i] = {
                answerText: answers[i],
                correct: false
            }
            if (i == correctAnswer - 1) {
                answersToSend[i].correct = true;
            }
        }
        console.log("NEXT = " + answers + ", " + questionText + ", correct = " + correctAnswer, "answers=", answersToSend);
        // console.log("NEXT = " + answers);
    }

    const handleChangeQuestionText = (e) => {
        setQuestionText(e.target.value);
    }

    return (
        <Card>
            <Card.Header>
                <Form.Control placeholder="Enter question"
                              onChange={(e) => handleChangeQuestionText(e)}/>
            </Card.Header>
            {/*<ListGroup variant="flush">*/}
            <Card.Body>
                <Form>
                    {numberOfAnswers.map(answer =>
                        <div>{answer}</div>
                    )}
                </Form>
            </Card.Body>
            {!nextOrFinish &&
            <Button
                onClick={(e) => handleSubmit(e)}
            >Submit</Button>}
            {nextOrFinish &&
            <div>
                <Button onClick={() => handleNext()}>Next</Button>
                <Button onClick={() => {
                    postQuestion();
                    // props.history.push('/admin');
                    // window.location.reload();
                }}>Finish</Button>
            </div>}
        </Card>
    );

};

export default CreateTestQuestionCard;
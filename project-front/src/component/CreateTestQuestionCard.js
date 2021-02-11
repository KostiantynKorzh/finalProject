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
import {login} from "../redux/actions/auth";

const CreateTestQuestionCard = (props) => {

    const [numberOfAnswers, setNumberOfAnswers] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [submit, setSubmit] = useState(false);
    const [nextOrFinish, setNextOrFinish] = useState(false);
    const [initial, setInitial] = useState(true);

    const [createdQuestion, setCreatedQuestion] = useState(props.createdQuestions);

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

        const [answer, setAnswer] = useState(null);
        const [answerText, setAnswerText] = useState("");
        const [correct, setCorrect] = useState(false);

        const [disabled, setDisabled] = useState(false);


        useImperativeHandle(ref, () => ({
            submitOnChild() {
                counterTemp++;
                setDisabled(true);
                setAnswer({
                    answerText: answerText,
                    correct: correct
                })
                if (answer != null) {
                    setAnswers(prev => [...prev, answer]);
                }
            }
        }));

        useEffect(() => {
            if (answer != null) {
                setAnswers(prev => [...prev, answer]);
            }
        }, [answer])

        const handleAddNewChild = () => {
            // setCounter(counter => counter + 1);
            counterTemp++;
            setDisabled(true);
            setAnswer({
                answerText: answerText,
                correct: correct
            })

            handleAddNew();
        };

        return (
            <div>
                <Row style={{margin: "20px"}}>
                    <Col xs={1}>
                        <Form.Check
                            type="checkbox"
                            name="answerRadioButtons"
                            id={counterTemp}
                            onChange={(e) => {
                                console.log(e.target);
                                console.log(e.target.id);
                                setCorrect(!correct);
                                console.log(correct);
                            }}
                        />
                    </Col>
                    <Col xs={9}>
                        <Form.Control placeholder="Enter answer"
                                      onChange={(e) => {
                                          setAnswerText(e.target.value);
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
        AdminService.postTest(props.testId, createdQuestion);
    }

    const handleNext = () => {
        const question = {
            questionText: questionText,
            answers: answers
        };
        setCreatedQuestion(prev => [...prev, question]);
        clearAll();
    }

    const clearAll = () => {
        setNumberOfAnswers([]);
        // setCounter(0);
        setAnswers([]);
        setQuestionText("");
        // setCorrectAnswer(new Set());
        setSubmit(false);
        setNextOrFinish(false);
        setInitial(true);
    }

    const [finished, setFinished] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (finished) {
            setFinished(false);
            const question = {
                questionText: questionText,
                answers: answers
            };
            setCreatedQuestion(prev => [...prev, question]);
            setReady(true);
        }
    }, [finished])

    useEffect(() => {
        if (ready) {
            postQuestion();
            props.history.push("/admin/tests");
            window.location.reload();
        }
    }, [createdQuestion])

    return (
        <Card>
            <Card.Header>
                <Form.Control placeholder="Enter question"
                              value={questionText}
                              onChange={(e) => {
                                  setQuestionText(e.target.value)
                              }}/>
            </Card.Header>
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
            >Submit</Button>
            }
            {nextOrFinish &&
            <div>
                <Button onClick={() => handleNext()}>Next</Button>
                <Button onClick={() => setFinished(true)}>Finish</Button>
            </div>}
        </Card>
    );

};

export default CreateTestQuestionCard;
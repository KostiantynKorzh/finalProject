import React, {useEffect, useState} from 'react';
import UserService from "../services/user.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import QuestionCard from "./QuestionCard";
import {Button} from "react-bootstrap";
import equals from "validator/es/lib/equals";
import CompleteTest from "./CompleteTest";
import Header from "./Header";
import Timer from "./Timer";

const Test = (props) => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [checkedAnswers, setCheckedAnswers] = useState(new Set());

    const [results, setResults] = useState([]);

    const [completed, setCompleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [score, setScore] = useState(-30);

    const [test, setTest] = useState({
        title: "",
        subject: "",
        difficulty: "",
        questions: [],
        duration: -1
    });

    // const receiveResult = (value) => {
    //     console.log(value);
    // }

    const handleChangeInCard = (questionId, e, correctAnswer) => {
        const ansObj = {
            questionId: questionId,
            chosenAnswerId: e.target.id,
            correctAnswerId: correctAnswer
        }

        const duplicateIndex = results.findIndex(obj => obj.questionId == ansObj.questionId);
        if (duplicateIndex >= 0) {
            setResults(prev => {
                const newArray = prev.slice(0, duplicateIndex)
                    .concat(prev.slice(duplicateIndex + 1));
                return [...newArray, ansObj];
            })
        } else {
            setResults(prev => [...prev, ansObj]);
        }
    }

    useEffect(() => {
        if (submitted) {
            console.log(percentage);
            if (percentage <= -20) {
                percentage = 0;
            }
            setScore(percentage);
        }
    }, [submitted])

    let scoreTemp = 0;
    let percentage = -20;

    const handleSubmitTest = () => {

        setSubmitted(true);

        console.log("results: ",results)

        results.map(ansObj => {
            if (ansObj.chosenAnswerId == ansObj.correctAnswerId) {
                scoreTemp++;
            }
        });

        setCompleted(true);

        percentage = scoreTemp / results.length * 100;
        setScore(percentage);
    }

    useEffect(() => {
        UserService.getTest(user.id, props.match.params.testId).then(
            resp => {
                console.log(resp);
                setTest({
                    title: resp.data.test.title,
                    subject: resp.data.test.subject,
                    difficulty: resp.data.test.difficulty,
                    questions: resp.data.questions,
                    duration: resp.data.test.duration
                });
            }
        );

    }, [])

    let count = 0;

    return (
        <div>
            {completed &&
            <Header/>
            }
            <div>TEST</div>
            <div>{test.title}</div>
            {!completed &&
            test.questions.map(question => {
                count++;
                return (
                    <QuestionCard props={{
                        questionId: question.id,
                        numberOfQuestion: count,
                        questionText: question.questionText,
                        answers: question.answers,
                        handleChangeInCard: handleChangeInCard
                    }}/>);
            })}
            {!completed &&
            <Button style={{width: '100%', marginBottom: '70px'}} onClick={handleSubmitTest}>Submit</Button>
            }
            {score >= 0 &&
            <CompleteTest props={{
                score: score,
                userId: user.id,
                testId: props.match.params.testId
            }}
            />
            }
            <div style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                right: "0"
            }}>
                {!submitted && test.duration > 0 &&
                <Timer
                    time={test.duration}
                    props={props}
                />}
            </div>
        </div>
    );

};

export default Test;


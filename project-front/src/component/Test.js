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

    const [checkedAnswers, setCheckedAnswers] = useState(new Set());

    const [results, setResults] = useState([]);

    const [completed, setCompleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [score, setScore] = useState(-20);

    const [test, setTest] = useState({
        title: "",
        subject: "",
        difficulty: "",
        questions: []
    });

    // const receiveResult = (value) => {
    //     console.log(value);
    // }

    const handleChangeInCard = (questionId, e, correctAnswer) => {
        console.log("Parent", questionId + " : " + e.target.id + ", correct =", correctAnswer);
        const ansObj = {
            questionId: questionId,
            chosenAnswerId: e.target.id,
            correctAnswerId: correctAnswer
        }

        const duplicateIndex = results.findIndex(obj => obj.questionId == ansObj.questionId);
        console.log("duplicateIndex", duplicateIndex);
        if (duplicateIndex >= 0) {
            setResults(prev => {
                const newArray = prev.slice(0, duplicateIndex)
                    .concat(prev.slice(duplicateIndex + 1));
                console.log("Cutted array", newArray);
                return [...newArray, ansObj];
            })
        } else {
            setResults(prev => [...prev, ansObj]);
        }


    }

    useEffect(() => {
        if (submitted) {
            while (score < 0) {
                console.log("Here")
                setScore(percentage);
                console.log("score submitted", score)
            }
        }
    }, [submitted])

    let scoreTemp = 0;
    let percentage = -20;

    const handleSubmitTest = () => {

        setSubmitted(true);

        results.map(ansObj => {
            if (ansObj.chosenAnswerId == ansObj.correctAnswerId) {
                scoreTemp++;
            }
        });

        setCompleted(true);

        // console.log("ScoreTemp = ", scoreTemp);
        // console.log("ScoreTemp %%% = ", scoreTemp / results.length * 100);


        percentage = scoreTemp / results.length * 100;
        setScore(scoreTemp / results.length * 100);

        // console.log("percentage = ", percentage);
        // console.log("score", score);
    }

    // useEffect(() => {
    //     if (percentage > 0) {
    //         setScore(percentage);
    //         console.log("perc = ", percentage);
    //     } else {
    //         console.log("else", score);
    //     }
    // }, [submitted, completed, score]);

    useEffect(() => {
        UserService.getTest(props.match.params.id, props.match.params.testId).then(
            resp => {
                console.log(resp.data);
                setTest({
                    title: resp.data.title,
                    subject: resp.data.subject,
                    difficulty: resp.data.difficulty,
                    questions: resp.data.questions
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
            {/*{!completed &&*/}
            <Button onClick={handleSubmitTest}>Submit</Button>
            {/*}*/}
            {score > 0 &&
            <CompleteTest props={score}/>
            }
            <div style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                right: "0"
            }}>
                {!submitted &&
                <Timer
                    time={15}
                    props={props}
                />}
            </div>
        </div>
    );

};

export default Test;


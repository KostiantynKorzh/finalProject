import React, {useEffect, useState} from 'react';
import UserService from "../services/user.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import QuestionCard from "./QuestionCard";
import {Button} from "react-bootstrap";
import equals from "validator/es/lib/equals";

const Test = (props) => {

    const [checkedAnswers, setCheckedAnswers] = useState(new Set());

    const [results, setResults] = useState([]);

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

    const handleSubmitTest = () => {
        console.log("Results", results);
        let score = 0;
        results.map(ansObj => {
            if (ansObj.chosenAnswerId == ansObj.correctAnswerId) {
                score++;
            }
        })

        console.log(score / results.length * 100 + '%');
    }

    useEffect(() => {
        console.log("params =", props.match.params.id, props.match.params.testId);
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
            <div>TEST</div>
            <div>{test.title}</div>
            {test.questions.map(question => {
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
            <Button onClick={handleSubmitTest}>Submit</Button>
        </div>
    );

};

export default Test;


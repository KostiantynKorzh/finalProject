import React, {useEffect, useState} from "react";
import {ListGroup, Navbar, Form, Col, ProgressBar} from "react-bootstrap";

const Timer = (props) => {

        const [seconds, setSeconds] = useState(0);
        const [minutes, setMinutes] = useState(0);

        const [secondsToShow, setSecondsToShow] = useState(0);

        const [progress, setProgress] = useState(0);

        const [over, setOver] = useState(false);

        const time = props.time;

        useEffect(() => {
            setSeconds(time);
        }, []);

        useEffect(() => {
            setProgress((time - seconds) / time * 100);
            if (seconds >= 0) {
                const t = setTimeout(() => {
                    setSeconds(seconds => seconds - 1);
                    showTime(seconds);
                }, 1000);
                return () => {
                    clearTimeout(t);
                };
            } else {
                setOver(true);
            };


        }, [seconds])

        useEffect(() => {
            if (over) {
                window.alert("Time is up");
                console.log(props);
                props.props.history.push('/home');
                window.location.reload();
            }
        }, [over])

        const showTime = (seconds) => {
            let minutesTemp = 0;
            setMinutes(0);
            if (seconds >= 60) {
                minutesTemp = Math.floor(seconds / 60);
                setMinutes(minutesTemp);
            }
            setSecondsToShow(seconds - minutesTemp * 60);
        }

        return (
            <div className="fixed-bottom">
                {/*<div>{seconds}</div>*/}
                <ListGroup horizontal>
                    <ListGroup.Item>{minutes}</ListGroup.Item>
                    <ListGroup.Item>{secondsToShow}</ListGroup.Item>
                </ListGroup>
                <ProgressBar now={progress}/>
            </div>
        );

    }
;

export default Timer;
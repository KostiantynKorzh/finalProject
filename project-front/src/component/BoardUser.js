import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import message from "../redux/reducers/message";
import {useSelector} from "react-redux";
import axios from "axios";
import authHeader from "../services/auth-header";

const BoardUser = () => {
    const [content, setContent] = useState([]);


    useEffect(() => {
        UserService.getUserContent(3).then(
            (response) => {
                console.log(response.data);
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                // setContent(_content);
            }
        );

    }, []);


    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content.map(test =>
                    <div>{test.title}</div>
                )}</h3>
            </header>
        </div>
    );
};

export default BoardUser;
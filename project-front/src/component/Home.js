import React, {useEffect, useState} from 'react';
import Header from "./Header";
import UserService from "../services/user.service";

const Home = () => {

    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            response => {
                setContent(response.data);
            },
            error => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        )
    }, [])

    return (
        <div>
            <Header/>
            <h2>Home Page</h2>
            <h2>{content}</h2>
            <h2>{content}</h2>
        </div>
    );

}

export default Home;
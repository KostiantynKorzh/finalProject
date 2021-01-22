import React, {useEffect, useState} from 'react';
import Header from "./Header";
import UserService from "../services/user.service";
import Timer from "./Timer";

const Home = () => {

    const [content, setContent] = useState("");

    const lang = (localStorage.getItem("lang"));
    const user = (localStorage.getItem("user"));

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

                setContent(_content[0]);
            }
        )
        console.log(user);
    }, [])

    return (
        <div>
            <Header/>
            <h2>Home Page</h2>
            <h2>{content}</h2>
            <h2>{content}</h2>
            {/*<Timer time={67}/>*/}
        </div>
    );

}

export default Home;
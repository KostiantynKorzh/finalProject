import React, {useEffect, useState} from 'react';
import Header from "./Header";
import UserService from "../services/user.service";
import Welcome from "./Welcome";

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
        <div className="fill-window" style={{
            backgroundImage: 'url(/background-home.jpg)',
            border: 'solid green',
        }}>
            <Header/>
            <div className="centered">
                <Welcome/>
            </div>
        </div>
    );

}

export default Home;
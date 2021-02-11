import React from "react";
import {Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import Header from "./Header";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login"/>;
    }

    return (
        <div>
        <Header/>
        <div className="container">
            <header className="jumbotron text-center">
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
        </div>
    );
};

export default Profile;
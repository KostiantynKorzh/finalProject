import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Header from "./Header";
import AdminService from "../services/admin.service";
import {Redirect} from "react-router-dom";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        firstName: '',
        lastName: ''
    });

    useEffect(() => {
        AdminService.getUser(currentUser.id)
            .then((resp) => {
                setUser(resp.data);
            });
    }, [])

    if (!currentUser) {
        return <Redirect to="/login"/>;
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <header className="jumbotron text-center">
                    <h3>
                        <strong>Profile</strong>
                    </h3>
                </header>
                <p>
                    <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {user.lastName}
                </p>
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
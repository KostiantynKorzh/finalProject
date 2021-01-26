import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import AdminService from '../services/admin.service';

const Welcome = () => {

    const {user: currentUser} = useSelector((state) => state.auth);

    const [name, setName] = useState("");

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (currentUser) {
            AdminService.getUser(currentUser.id).then(
                resp => {
                    setName(resp.data.firstName + ' ' + resp.data.lastName);
                }
            )
        }
    }, []);

    useEffect(() => {
        setLoaded(true);
    }, [name]);

    const WelcomeWindow = ({props}) => {
        return (
            <div className="rectangle">
                <h1 style={{marginBottom: '10%'}}>{props.welcome}</h1>
                <Button className="auth-buttons"
                        href={props.firstButtonLink}
                        style={{marginBottom: '3%'}}
                >{props.firstButton}</Button>
                <div style={{fontSize: '200%'}}>or</div>
                <Button className="auth-buttons"
                        href={props.secondButtonLink}
                >{props.secondButton}</Button>
            </div>
        );
    };

    const GuestWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: 'Welcome to Choosy',
                firstButton: 'Login',
                firstButtonLink: '/login',
                secondButton: 'Signup',
                secondButtonLink: '/signup'
            }}/>
        );
    };

    const UserWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: `Welcome, ${name}`,
                firstButton: 'My Tests',
                firstButtonLink: `/user/${currentUser.id}/requiredTests`,
                secondButton: 'My Profile',
                secondButtonLink: '/profile'
            }}/>
        );
    };

    const AdminWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: `Hi, ${name}`,
                firstButton: 'Users',
                firstButtonLink: `/admin/users`,
                secondButton: 'All Tests',
                secondButtonLink: '/admin/tests'
            }}/>
        );
    };

    if (loaded) {
        return (
            <div>
                {!currentUser &&
                <GuestWelcome/>}
                {currentUser && currentUser.roles.includes("ROLE_ADMIN") &&
                <AdminWelcome/>}
                {currentUser && currentUser.roles.includes("ROLE_USER") &&
                <UserWelcome/>}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default Welcome;
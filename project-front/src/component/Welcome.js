import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import AdminService from '../services/admin.service';
import LangService from "../services/lang.service";

const Welcome = () => {

    const {user: currentUser} = useSelector((state) => state.auth);

    const [name, setName] = useState("");

    const [loaded, setLoaded] = useState(false);

    const [content, setContent] = useState({
        welcome: '',
        hi: '',
        welcomeChoosy: '',
        login: '',
        signup: '',
        myTests: '',
        myProfile: '',
        users: '',
        tests: '',
        or: ''
    });

    const lang = localStorage.getItem('lang');

    useEffect(() => {
        getContentLang(lang);
        if (currentUser) {
            AdminService.getUser(currentUser.id).then(
                resp => {
                    setName(resp.data.firstName + ' ' + resp.data.lastName);
                }
            )
        }
    }, []);


    const getContentLang = (lang) => {
        LangService.getContent(lang).then(
            resp => {
                setContent({
                    welcome: resp.data.welcome,
                    hi: resp.data.hi,
                    welcomeChoosy: resp.data.welcomeChoosy,
                    login: resp.data.login,
                    signup: resp.data.signup,
                    myTests: resp.data.tests,
                    myProfile: resp.data.profile,
                    users: resp.data.users,
                    tests: resp.data.tests,
                    or: resp.data.or
                });
            }
        );
    };

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
                <div style={{fontSize: '200%'}}>{content.or}</div>
                <Button className="auth-buttons"
                        href={props.secondButtonLink}
                >{props.secondButton}</Button>
            </div>
        );
    };

    const GuestWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: `${content.welcomeChoosy}`,
                firstButton: `${content.login}`,
                firstButtonLink: '/login',
                secondButton: `${content.signup}`,
                secondButtonLink: '/signup'
            }}/>
        );
    };

    const UserWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: `${content.welcome}, ${name}`,
                firstButton: `${content.myTests}`,
                firstButtonLink: `/user/${currentUser.id}/requiredTests`,
                secondButton: `${content.myProfile}`,
                secondButtonLink: '/profile'
            }}/>
        );
    };

    const AdminWelcome = () => {
        return (
            <WelcomeWindow props={{
                welcome: `${content.hi}, ${name}`,
                firstButton: `${content.users}`,
                firstButtonLink: `/admin/users`,
                secondButton: `${content.tests}`,
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
import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./component/Header";
import Home from "./component/Home";
import {Router, Switch, Route, BrowserRouter} from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "./redux/actions/message";
import BoardUser from "./component/BoardUser";
import {history} from "./utils/history";
import {logout} from "./redux/actions/auth";
import BoardAdmin from "./component/BoardAdmin";
import Test from "./component/Test";
import CreateTestInit from "./component/CreateTestInit";
import Profile from "./component/Profile";
import CreateTest from "./component/CreateTest";

function App() {

    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    return (
        <Router history={history}>
            <Switch>
                {/*<Route exact path={["/", "/home"]} component={Home} />*/}
                {/*<Route exact path="/login" component={Login} />*/}
                {/*<Route exact path="/signup" component={Signup} />*/}

                <Route exact path={["/", "/home"]} component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/user/:id/takeTest/:testId" component={Test}/>
                <Route exct path="/user/:id" component={BoardUser}/>
                <Route exact path="/admin" component={BoardAdmin}/>
                <Route exact path="/admin/createTest" component={CreateTestInit}/>
                <Route exact path="/admin/createTest/:id" component={CreateTest}/>
                {/*<Route exact path="/admin/createTest" component={CreateTestModal}/>*/}

                {/*<Route path="/user" component={BoardUser} />*/}
                {/*<Route path="/admin" component={BoardAdmin} />*/}
            </Switch>
        </Router>
    );
}

export default App;

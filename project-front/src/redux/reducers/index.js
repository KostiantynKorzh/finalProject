import {combineReducers} from "redux";
import auth from "./auth";
import admin from "./admin";
import message from "./message";
import test from "./test";

export default combineReducers({
    auth,
    admin,
    message,
    test
})
import {combineReducers} from "redux";
import auth from "./auth";
import admin from "./admin";
import message from "./message";

export default combineReducers({
    auth,
    admin,
    message
})
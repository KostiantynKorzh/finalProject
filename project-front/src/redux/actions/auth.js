import AuthService from "../../services/auth.service"
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_MESSAGE
} from "./types";


export const register = (firstName, lastName, email, password) => (dispatch) => {
    return AuthService.register(firstName, lastName, email, password).then(
        response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message
            });

            return Promise.resolve();
        },
        error => {
            const message = (
                error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();

            dispatch({
                type: REGISTER_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject(message);
        });
};

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        data => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data}
            });

            return Promise.resolve();
        },
        error => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
}

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT
    })
}
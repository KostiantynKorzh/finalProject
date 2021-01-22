import {
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    GET_ALL_USERS_SUCCESS, GET_AVAILABLE_TESTS_FAIL,
    GET_AVAILABLE_TESTS_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE
} from "./types";
import AdminService from "../../services/admin.service";

const message = (error) => {
    return (error.response && error.response.data &&
        error.response.data.message) ||
        error.message || error.toString();
}

export const getAllUsers = () => (dispatch) => {
    return AdminService.getAll().then(
        response => {
            console.log("from action ", response.data);
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.statusText
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: REGISTER_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message(error)
            });

            return Promise.reject();
        });
};

export const deleteUser = (id) => (dispatch) => {
    return AdminService.deleteUser(id).then(
        response => {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.statusText
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: DELETE_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message(error)
            })
        }
    )
};
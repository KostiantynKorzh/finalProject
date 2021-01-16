import {GETTING_ALL_USERS_SUCCESS, REGISTER_FAIL, SET_MESSAGE} from "./types";
import getAll from '../../services/admin.service'

export const getAllUsers = () => (dispatch) => {
    return getAll().then(
        response => {
            dispatch({
                type: GETTING_ALL_USERS_SUCCESS,
                payload: response.data
            });

            // dispatch({
            //     type: SET_MESSAGE,
            //     payload: response.data.statusText
            // });

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

            return Promise.reject();
        });
}
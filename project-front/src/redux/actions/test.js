import TestService from '../../services/test.service';
import {GET_AVAILABLE_TESTS_FAIL, GET_AVAILABLE_TESTS_SUCCESS, SET_MESSAGE} from "./types";

const message = (error) => {
    return (error.response && error.response.data &&
        error.response.data.message) ||
        error.message || error.toString();
};

export const getAvailableTests = (id) => (dispatch) => {
    return TestService.getAvailableTests(id).then(
        response => {
            dispatch({
                type: GET_AVAILABLE_TESTS_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.statusText
            });

            return Promise.resolve();
        }, error => {
            dispatch({
                type: GET_AVAILABLE_TESTS_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message(error)
            });

            return Promise.reject();
        }
    )
};
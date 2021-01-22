import {GET_ALL_USERS_FAIL, GET_AVAILABLE_TESTS_SUCCESS} from "../actions/types";


const initialState = {
    tests: []
}


export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_AVAILABLE_TESTS_SUCCESS:
            return {
                ...state,
                tests: payload
            }
        case GET_ALL_USERS_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}
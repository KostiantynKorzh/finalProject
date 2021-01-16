import {GETTING_ALL_USERS_FAIL, GETTING_ALL_USERS_SUCCESS} from "../actions/types";

const initialState = {
    users: []
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GETTING_ALL_USERS_SUCCESS:
            console.log("from reducer success", payload, action);
            return {
                ...state,
                users: payload
            };
        case GETTING_ALL_USERS_FAIL:
            console.log("from reducer fail", payload, action);
            return {
                ...state
            };
        default:
            console.log("from reducer default", payload, action);
            return state;
    }

}
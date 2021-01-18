import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/admin/";

const getAll = () => {
    return axios.get(API_URL + 'users', {headers: authHeader()});
}

const deleteUser = (id) => {
    return axios.delete(API_URL + 'users/' + id, {headers: authHeader()});
}

const updateUser = (id, user) => {
    return axios.post(API_URL + 'users/edit/' + id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        created: user.created,
        roles: user.roles
    }, {headers: authHeader()});
}

const getNonRequiredTests = (id) => {
    return axios.get(API_URL + 'users/addTests/' + id, {headers: authHeader()});
}

const addOneTestToUser = (id, testId) => {
    return axios.post(API_URL + 'users/addTests/add/' + id, {testId}, {headers: authHeader()});
}

const addTestsToUser = (id, ids) => {
    return axios.post(API_URL + 'users/addTests/add/' + id, ids, {headers: authHeader()});
}

export default {
    getAll,
    deleteUser,
    updateUser,
    getNonRequiredTests,
    addOneTestToUser,
    addTestsToUser
};
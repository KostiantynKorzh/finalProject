import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/user/";
const API_URL_RESULT = "http://localhost:8090/api/results/";

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
}

const getRequiredTests = (id) => {
    return axios.get(API_URL + id + '/tests/required', {headers: authHeader()});
}

const getPassedTests = (id) => {
    return axios.get(API_URL + id + '/tests/passed', {headers: authHeader()});
}

const getAdminContent = () => {
    return axios.get(API_URL + 'admin', {headers: authHeader()});
}

const passTest = (id, testId) => {
    return axios.post(API_URL + id + "/test", {testId}, {headers: authHeader()});
}

const getTest = (userId, testId) => {
    return axios.get(API_URL + userId + '/takeTest/' + testId, {headers: authHeader()})
}

const addResult = (userId, testId, score) => {
    return axios.post(API_URL_RESULT + 'addResult/', {
        userId: userId,
        testId: testId,
        score: score
    }, {headers: authHeader()})
}

export default {
    getPublicContent,
    getRequiredTests,
    getPassedTests,
    getAdminContent,
    passTest,
    getTest,
    addResult
}
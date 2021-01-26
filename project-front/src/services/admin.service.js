import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/admin/";
const API_URL_USER = "http://localhost:8090/api/user/";

const getAll = () => {
    return axios.get(API_URL + 'users', {headers: authHeader()});
};

const deleteUser = (id) => {
    return axios.delete(API_URL + 'users/' + id, {headers: authHeader()});
};

const updateUser = (id, user) => {
    return axios.post(API_URL + 'users/edit/' + id, {
        firstName: user.firstName,
        lastName: user.lastName,
    }, {headers: authHeader()});
};


const addOneTestToUser = (id, testId) => {
    return axios.post(API_URL + 'users/addTests/add/' + id, {testId}, {headers: authHeader()});
};

const addTestsToUser = (id, ids) => {
    return axios.post(API_URL + 'users/addTests/add/' + id, ids, {headers: authHeader()});
};

const createTest = (test) => {
    return axios.post(API_URL + 'createTest', {
        title: test.title,
        subject: test.subject,
        difficulty: test.difficulty,
        duration: test.duration
    }, {headers: authHeader()});
};

const getTest = (testId) => {
    return axios.get(API_URL + 'testToFill/' + testId, {headers: authHeader()})
}

const postQuestion = (question) => {
    return axios.post(API_URL + 'createTest/' + question.testId + '/question', {
        testId: question.testId,
        questionText: question.questionText,
        answers: question.answers
    }, {headers: authHeader()});
};

const getAvailableTests = (id) => {
    return axios.get(API_URL_USER + id + "/tests/available", {headers: authHeader()});
};

const getUser = (id) => {
    return axios.get(API_URL_USER + id, {headers: authHeader()});
};

const getAllUsersSorted = (param, page) => {
    return axios.get(API_URL + 'users/sorted?param=' + param + '&page=' + page, {headers: authHeader()});
};

export default {
    getAll,
    deleteUser,
    updateUser,
    addOneTestToUser,
    addTestsToUser,
    createTest,
    getTest,
    postQuestion,
    getAvailableTests,
    getUser,
    getAllUsersSorted
};
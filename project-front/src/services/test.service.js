import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/tests/";

// const getAvailableTests = (id) => {
//     return axios.get(API_URL + id + "/tests/available", {headers: authHeader()});
// };

const getTests = () => {
    return axios.get(API_URL + "all", {headers: authHeader()});
};

const deleteTest = (testId) => {
    return axios.delete(API_URL + "delete/" + testId, {headers: authHeader()});
}

const getAllTessSorted=(param, page)=>{
    return axios.get(API_URL+'sorted?param='+param+'&page='+page,{headers: authHeader()});
}

export default {
    getTests,
    deleteTest,
    getAllTessSorted
}
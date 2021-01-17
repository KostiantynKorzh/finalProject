import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/user/";

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
}

const getUserContent = (id) => {
    return axios.get(API_URL + id + '/tests', {headers: authHeader()});
}

const getAdminContent = () => {
    return axios.get(API_URL + 'admin', {headers: authHeader()});
}

export default {
    getPublicContent,
    getUserContent,
    getAdminContent
}
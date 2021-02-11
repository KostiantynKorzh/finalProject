import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/error";

const getError = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

export default getError();
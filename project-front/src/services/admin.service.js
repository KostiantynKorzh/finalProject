import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/admin/";

const getAll = () => {
    return axios.get(API_URL + 'users', {headers: authHeader()});
}

const deleteUser = (id) => {
    return axios.delete(API_URL + 'users/' + id, {headers: authHeader()});
}

export default {
    getAll,
    deleteUser
};
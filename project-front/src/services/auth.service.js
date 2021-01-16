import axios from 'axios';

const API_URL = "http://localhost:8090/api/auth/";

const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log("respdata = " + JSON.stringify(response.data));
        return response.data;
    });

}

const logout = () => {
    localStorage.removeItem("user");
}

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + 'signup', {
        firstName,
        lastName,
        email,
        password
    });
}

export default {
    register,
    login,
    logout
}
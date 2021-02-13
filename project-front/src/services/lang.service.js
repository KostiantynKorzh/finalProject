import axios from 'axios';
import authHeader from "./auth-header";

const API_URL_LANG = "http://localhost:8090/api/lang/";

const user = JSON.parse(localStorage.getItem("user"));

const langAndAuthHeader = (lang) => {
    return {
        'Accept-Language': lang,
        // Authorization: 'Bearer ' + user.token
    }
};

const getContent = (lang) => {
    return axios.get(API_URL_LANG, {
        headers: langAndAuthHeader(lang),
    });
};

const getContentUserPassedTests = (lang) => {
    return axios.get(API_URL_LANG + "boardUser", {
        headers: langAndAuthHeader(lang),
    });
};

export default {
    getContent,
    getContentUserPassedTests
}
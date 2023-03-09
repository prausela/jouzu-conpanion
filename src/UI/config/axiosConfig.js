import axios from "axios";

let instance = null;

const getAxiosInstance = () => {
    if(!instance)
        instance = axios.create({
            baseURL: 'https://jouzu-musubi.000webhostapp.com/',
            timeout: 5000,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        });
    return instance;
}

const setAuthorizationToken = (authToken) => {
    instance.defaults.headers.common['Authorization'] = "Bearer " + authToken;
}

export default {
    getAxiosInstance,
    setAuthorizationToken
};
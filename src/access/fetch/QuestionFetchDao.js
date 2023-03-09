import axiosConfig from "../../UI/config/axiosConfig";
import { BASE_URL, CREATED, NO_CONTENT, OK, TIMEOUT, UNAUTHORIZED } from "../../UI/config/apiConstants";
import fetchConfig from "../../UI/config/fetchConfig";

const getAllQuestions = async (categoryId, setId) => {
    try {
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${setId}/questions/get`, {
            method : "get"
        });
        if (response.status !== OK) {
            return { status: response.status };
        }
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
    
}

const findQuestion = async (categoryId, setId, id) => {
    try {
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${setId}/questions/${id}/get`, {
            method : "get"
        });
        if (response.status !== OK) {
            return { status: response.status };
        }
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

const createQuestion = async (categoryId, setId, name, answers, correctAnswer) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const newQuestion = {
            name            : name,
            answers         : answers,
            correct_answer  : correctAnswer
        };
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${setId}/questions/post`, {
            method : "post",
            body : JSON.stringify(newQuestion),
            headers : {
                "Authorization" : authToken
            }
        });
        if (response.status !== CREATED) {
            return { status: response.status };
        }
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

const removeQuestion = async (categoryId, setId, id) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${setId}/questions/${id}/delete`, {
            method : "post",
            headers : {
                "Authorization" : authToken
            }
        });
        if (response.status !== NO_CONTENT) {
            return { status: response.status };
        }
        return { status: response.status };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

export default {
    getAllQuestions,
    findQuestion,
    createQuestion,
    removeQuestion
};
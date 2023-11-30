import axiosConfig from "../../UI/config/axiosConfig";
import { BASE_URL, CREATED, NO_CONTENT, OK, TIMEOUT, UNAUTHORIZED } from "../../UI/config/apiConstants";
import fetchConfig from "../../UI/config/fetchConfig";

const getAllCategories = async () => {
    try {
        const response = await fetch(BASE_URL + `/categories/get?sort=position`, {
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

const findCategory = async (id) => {
    try {
        const response = await fetch(BASE_URL + `/categories/${id}/get`, {
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

const createCategory = async (name) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const newCategory = {
            name    : name
        };
        const response = await fetch(BASE_URL + `/categories/post`, {
            method : "post",
            body : JSON.stringify(newCategory),
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

const changeCategory = async (id, newName, position, visibility) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const updatedCategory = {
            id         : id,
            name       : newName,
            position   : position,
            visibility : visibility
        };
        const response = await fetch(BASE_URL + `/categories/${id}/put`, {
            method : "post",
            body : JSON.stringify(updatedCategory),
            headers : {
                "Authorization" : authToken
            }
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

const removeCategory = async (id) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const response = await fetch(BASE_URL + `/categories/${id}/delete`, {
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
    getAllCategories,
    findCategory,
    createCategory,
    changeCategory,
    removeCategory
};
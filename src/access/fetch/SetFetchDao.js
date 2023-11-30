import { BASE_URL, CREATED, NO_CONTENT, OK, TIMEOUT, UNAUTHORIZED } from "../../UI/config/apiConstants";
import fetchConfig from "../../UI/config/fetchConfig";

const getAllSets = async (categoryId) => {
    try {
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/get?sort=position`, {
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

const findSet = async (categoryId, id) => {
    try {
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${id}/get`, {
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

const createSet = async (categoryId, name) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const newSet = {
            name    : name
        };
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/post`, {
            method : "post",
            body : JSON.stringify(newSet),
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

const changeSet = async (categoryId, id, newName, position, visibility) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const updatedSet = {
            id         : id,
            name       : newName,
            position   : position,
            visibility : visibility
        };
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${id}/put`, {
            method : "post",
            body : JSON.stringify(updatedSet),
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

const removeSet = async (categoryId, id) => {
    try {
        let authToken = fetchConfig.getAuthorizationHeader();
        if(!authToken) {
            return { status: UNAUTHORIZED }
        }
        const response = await fetch(BASE_URL + `/categories/${categoryId}/sets/${id}/delete`, {
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
    getAllSets,
    findSet,
    createSet,
    changeSet,
    removeSet
};
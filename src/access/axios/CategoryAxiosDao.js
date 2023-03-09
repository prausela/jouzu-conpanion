import axiosConfig from "../../UI/config/axiosConfig";
import { TIMEOUT } from "../../UI/config/apiConstants";

const getAllCategories = async () => {
    try {
        const response = await axiosConfig.getAxiosInstance().get(`/categories/get`);
        return { status: response.status, data: response.data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
    
}

const findCategory = async (id) => {
    try {
        const response = await axiosConfig.getAxiosInstance().get(`/categories/${id}/get`);
        return { status: response.status, data: response.data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

const createCategory = async (name) => {
    try {
        const newCategory = {
            name    : name
        };
        const response = await axiosConfig.getAxiosInstance().post(`/categories/post`, newCategory);
        return { status: response.status, data: response.data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

const changeCategoryName = async (id, newName) => {
    try {
        const updatedCategory = {
            id      : id,
            name    : newName
        };
        const response = await axiosConfig.getAxiosInstance().post(`/categories/${id}/put`, updatedCategory);
        return { status: response.status, data: response.data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

const removeCategory = async (id) => {
    try {
        const response = await axiosConfig.getAxiosInstance().post(`/categories/${id}/delete`);
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
    changeCategoryName,
    removeCategory
};
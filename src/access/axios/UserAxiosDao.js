import { TIMEOUT } from "../../UI/config/apiConstants";
import axiosConfig from "../../UI/config/axiosConfig";

const logIn = async (username, password) => {
    try {
        const user = {
            username    : username,
            password    : password
        };
        const response = await axiosConfig.getAxiosInstance().post(`/users/login`, user);
        return { status: response.status, data: response.data };
    } catch (err) {
        if(err.response){
            return { status : err.response.status }
        }
        return { status : TIMEOUT }
    }
}

export default { 
    logIn
}
import { BASE_URL, OK, TIMEOUT } from "../../UI/config/apiConstants";

const logIn = async (username, password) => {
    try {
        const user = {
            username    : username,
            password    : password
        };
        const response = await fetch(BASE_URL + "/users/login", {
            method  : 'post',
            body    : JSON.stringify(user)
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

export default { 
    logIn
}
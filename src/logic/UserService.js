import UserDao from "../access/fetch/UserFetchDao";
import { OK } from "../UI/config/apiConstants";
import fetchConfig from "../UI/config/fetchConfig";


const logIn = async (username, password) => {
    const response = await UserDao.logIn(username, password);
    if (response.status === OK) {
        fetchConfig.setAuthorizationToken(response.data.token);
    }
    return { status : response.status };
}

export default {
    logIn
};
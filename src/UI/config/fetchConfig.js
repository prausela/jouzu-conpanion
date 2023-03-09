let authToken = null;

const getAuthorizationHeader = () => {
    if (!authToken) return null;
    return "Bearer " + authToken;
}

const setAuthorizationToken = (token) => {
    authToken = token;
}

export default {
    getAuthorizationHeader,
    setAuthorizationToken
}
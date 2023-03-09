import SetDao from "../access/fetch/SetFetchDao";

const getAllSets = async (categoryId) => {
    return await SetDao.getAllSets(categoryId);
}

const findSet = async (categoryId, id) => {
    return await SetDao.findSet(categoryId, id);
}

const createSet = async (categoryId, name) => {
    return await SetDao.createSet(categoryId, name);
}

const changeSetName = async (categoryId, id, newName) => {
    return await SetDao.changeSetName(categoryId, id, newName);
}

const removeSet = async (categoryId, id) => {
    return await SetDao.removeSet(categoryId, id);
}

export default {
    getAllSets,
    findSet,
    createSet,
    changeSetName,
    removeSet
}
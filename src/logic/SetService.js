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

const changeSet = async (categoryId, id, newName, position, visibility) => {
    return await SetDao.changeSet(categoryId, id, newName, position, visibility);
}

const removeSet = async (categoryId, id) => {
    return await SetDao.removeSet(categoryId, id);
}

export default {
    getAllSets,
    findSet,
    createSet,
    changeSet,
    removeSet
}
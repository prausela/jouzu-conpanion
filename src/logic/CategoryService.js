import CategoryDao from "../access/fetch/CategoryFetchDao";

const getAllCategories = async () => {
    return await CategoryDao.getAllCategories();
}

const findCategory = async (id) => {
    return await CategoryDao.findCategory(id);
}

const createCategory = async (name) => {
    return await CategoryDao.createCategory(name);
}

const changeCategory = async (id, newName, position, visibility) => {
    return await CategoryDao.changeCategory(id, newName, position, visibility);
}

const removeCategory = async (id) => {
    return await CategoryDao.removeCategory(id);
}

export default {
    getAllCategories,
    findCategory,
    createCategory,
    changeCategory,
    removeCategory
}
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

const changeCategoryName = async (id, newName) => {
    return await CategoryDao.changeCategoryName(id, newName);
}

const removeCategory = async (id) => {
    return await CategoryDao.removeCategory(id);
}

export default {
    getAllCategories,
    findCategory,
    createCategory,
    changeCategoryName,
    removeCategory
}
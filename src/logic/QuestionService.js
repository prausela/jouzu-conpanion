import QuestionDao from "../access/fetch/QuestionFetchDao";
import { CREATED, NO_CONTENT, OK } from "../UI/config/apiConstants";

const getAllQuestions = async (categoryId, setId) => {
    return await QuestionDao.getAllQuestions(categoryId, setId);
}

const findQuestion = async (categoryId, setId, id) => {
    return await QuestionDao.findQuestion(categoryId, setId, id);
}

const createQuestion = async (categoryId, setId, name, answers, correctAnswer) => {
    return await QuestionDao.createQuestion(categoryId, setId, name, answers, correctAnswer);
}

const changeQuestion = async (categoryId, setId, id, name, answers, correctAnswer) => {
    const deleteResult = await QuestionDao.removeQuestion(categoryId, setId, id);
    if (deleteResult.status !== NO_CONTENT) return deleteResult;
    const createResult = await QuestionDao.createQuestion(categoryId, setId, name, answers, correctAnswer);
    if (createResult.status !== CREATED) {
        return createResult;
    }
    return ({ status: OK, data : createResult.data });
}

const removeQuestion = async (categoryId, setId, id) => {
    return await QuestionDao.removeQuestion(categoryId, setId, id);
}

export default {
    getAllQuestions,
    findQuestion,
    createQuestion,
    changeQuestion,
    removeQuestion
}
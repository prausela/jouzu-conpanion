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

const createQuestions = async (categoryId, setId, questions) => {
    let resQuestions = [];
    for(let i = 0; i < questions.length; i++){
        const { name, answers, correctAnswer } = questions[i];
        const result = await createQuestion(categoryId, setId, name, answers, correctAnswer);
        resQuestions[i] = {
            "idx" : i,
            "state" : result.status == CREATED ? "success" : "failure"
        }
    }
    return resQuestions;
}

const importQuestions = async (categoryId, setId, question2import) => {
    let answers = [];
    for(let i = 0; i < question2import.length; i++) {
        const currQuestion = question2import[i];
        const result = await createQuestion(categoryId, setId, currQuestion.name, currQuestion.answers, currQuestion.correctAnswer);
        answers[i] = {
            "id" : currQuestion.id,
            "state" : result.status == CREATED ? "success" : "failure"
        }
    }
    return answers;
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
    removeQuestion,
    importQuestions,
    createQuestions
}
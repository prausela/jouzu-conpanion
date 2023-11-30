import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionService from "../../logic/QuestionService";
import SetService from "../../logic/SetService";
import { CREATED, NO_CONTENT, OK, UNAUTHORIZED } from "../config/apiConstants";
import ItemInterface from "../view/ItemInterface";

const QuestionController = ({showLogin, setShowLogin, authActionsPending, setAuthActionsPending, logInAlert, setLogInAlert}) => {
    const [items, setItems] = useState([]);
    const [questionSet, setQuestionSet] = useState({});
    const [menuAlert, setMenuAlert] = useState({});

    const { categoryId, setId } = useParams();

    const setUrl = (id) => `/levels/${categoryId}/sets/${setId}/questions/${id}`;

    useEffect(() => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        SetService.findSet(categoryId, setId).then((response) => {
            if (response.status !== OK) {
                setMenuAlert({variant: "danger", value:"Ocurrió un error. Refrezque la página"});
                return;
            }
            if (response.data) setQuestionSet(response.data);
        })

        QuestionService.getAllQuestions(categoryId, setId).then((response) => {
            if (response.status !== OK) {
                setMenuAlert({variant: "danger", value:"Ocurrió un error. Refrezque la página"});
                return;
            }
            if (response.data) setItems(response.data);
            setMenuAlert({variant: "success", value:"Preguntas cargadas exitosamente"});
            setTimeout(() => {
                setMenuAlert({});
            }, 3000);
        })
    }, []);

    const addItem  = async (question, setAlert) => {
        if (!question.name || !question.answers || !question.correctAnswer){
            setAlert("Necesitás especificar nombre, respuesta correcta y, al menos, 2 opciones.");
            return false;
        }
        if(question.answers.length < 1) {
            setAlert("Necesitás especificar al menos una opción incorrecta.");
            return false;
        }
        setMenuAlert({variant: "primary", value:"Espere..."});
        return QuestionService.createQuestion(categoryId, setId, question.name, question.answers, {name: question.correctAnswer}).then(response => {
            if (response.status === CREATED) {
                setItems([...items, response.data]);
                setAlert("");
                setMenuAlert({variant: "success", value:"Preguntas cargadas exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => addItem(question, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setMenuAlert({});
            setAlert("Ocurrió un error al intentar crear la pregunta. Intente nuevamente");
            return false;
        });
    }

    const editItem = async (id, question, position, visibility, setAlert) => {
        if (!setAlert) {
            setMenuAlert({variant: "primary", value:"Funcionalidad no disponible"});
            setTimeout(() => {
                setMenuAlert({});
            }, 3000);
            return false;
        }
        if (!question.name || !question.answers || !question.correctAnswer){
            setAlert("Necesitás especificar nombre, respuesta correcta y, al menos, 2 opciones.");
            return false;
        }
        if(question.answers.length < 1) {
            setAlert("Necesitás especificar al menos una opción incorrecta.");
            return false;
        }
        setMenuAlert({variant: "primary", value:"Espere..."});
        return QuestionService.changeQuestion(categoryId, setId, id, question.name, question.answers, {name: question.correctAnswer}).then((response) => {
            if (response.status === OK) {
                let newItems = [...items];
                let modifiedItem = newItems.find(item => item.id === id);
                modifiedItem.id = response.data.id;
                modifiedItem.name = response.data.name;
                modifiedItem.answers = response.data.answers;
                modifiedItem.correct_answer = response.data.correct_answer;
                setItems(newItems);
                setAlert("");
                setMenuAlert({variant: "success", value:"Preguntas cargadas exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => editItem(id, name, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setAlert("Ocurrió un error al intentar editar la pregunta. Intente nuevamente");
            setMenuAlert({});
            return false;
        });
    }

    const deleteItem = async (id, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return QuestionService.removeQuestion(categoryId, setId, id).then((response) => {
            if (response.status === NO_CONTENT) {
                setItems(items.filter(item => item.id !== id));
                setAlert("");
                setMenuAlert({variant: "success", value:"Preguntas cargadas exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => deleteItem(id, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setAlert("Ocurrió un error al intentar eliminar la pregunta. Intente nuevamente");
            setMenuAlert({});
            return false;
        })
    }

    return (
        <ItemInterface 
            items={items}
            title={questionSet.name ? questionSet.name : ""}
            addItem={addItem}
            editItem={editItem}
            deleteItem={deleteItem}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
            logInAlert={logInAlert}
            setLogInAlert={setLogInAlert}
            authActionsPending={authActionsPending}
            setAuthActionsPending={setAuthActionsPending}
            itemUrl={setUrl}
            menuAlert={menuAlert}
            addQuestion
        />
    )
}

export default QuestionController;
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ActionWithWaitButton from "../ActionWithWaitButton";


const ImportingCSVModal = ({title, icon, show, setShow, selectedQuestions, categoryId, setId, createQuestions, refreshItems}) => {
    const questionsWithState = selectedQuestions ? selectedQuestions.map(q => ({state: "waiting", ...q})) : [];
    const [questions, setQuestions] = useState(questionsWithState);
    const [areQuestionsWaiting, setAreQuestionsWaiting] = useState(true);
    const [beginImport, setBeginImport] = useState(false);
    const [finishedImport, setFinishedImport] = useState(false);

    const handleClose = () => {
        if (finishedImport){
            setShow(false);
            setBeginImport(false);
            setFinishedImport(false);
        }
    };

    const importAllQuestionsSync = (setId, categoryId, allQuestions, idx) => {
        return createQuestions(setId, categoryId, allQuestions).then(res => {
            const updatedQuestions = [...questions];
            const successIdxs = res.filter(q => q.state === "success").map(q => q.idx);
            const failedIdxs = res.filter(q => q.state !== "success").map(q => q.idx);
            for(let i = 0; i < successIdxs.length; i++) {
                updatedQuestions[successIdxs[i]].state = "success";
            }
            for(let i = 0; i < failedIdxs.length; i++) {
                updatedQuestions[failedIdxs[i]].state = "failure";
            }
            setQuestions([...updatedQuestions]);
            refreshItems();
            setFinishedImport(true);
        })
    };

    const importAllQuestions = async (setId, categoryId, allQuestions, idx) => {
        return importAllQuestionsSync(setId, categoryId, allQuestions, idx);
    }

    const importSingleQuestion = async (setId, categoryId, question, idx) => {
        const questionWrapper = [question];
        return importAllQuestionsSync(setId, categoryId, questionWrapper, idx);
    }

    useEffect(() => {
        const questionsWithState = selectedQuestions ? selectedQuestions.map(q => ({state: "waiting", ...q})) : [];
        setQuestions(questionsWithState);
    }, [selectedQuestions]);

    useEffect(() => {
        if (show && !beginImport && questions.length > 0){
            setBeginImport(true);
        }
    }, [questions, show]);

    useEffect(() => {
        if (beginImport){
            importAllQuestions(setId, categoryId, questions, 0);
        }
    }, [beginImport]);

    useEffect(() => {
        const waitingQuestions = questions.filter(q => q.state === "waiting");
        if (waitingQuestions.length > 0) {
            setAreQuestionsWaiting(true);
        } else {
            setAreQuestionsWaiting(false);
        }
    }, [questions]);

    return (
        <>
            <Modal show={show} onHide={handleClose} className="modal-content-center">
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center">{icon ? <FontAwesomeIcon icon={icon} className="text-2"/> : ""}<span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column mt-3">
                    { questions ? questions.map((q, idx) => (
                        <ActionWithWaitButton
                            icon={faCheck}
                            text={q.name}
                            className="flex-grow-1 mb-3"
                            variant="primary"
                            onHoverVariant="white"
                            noHoverVariant="white"
                            onClick={() => importSingleQuestion(setId, categoryId, q, 0)}
                            waiting={q.state === "waiting"}
                            success={q.state === "success"}
                            key={idx}
                        />)) : ""
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="dark" onClick={handleClose} className={"flex-fill no-flex-basis p-3" + (areQuestionsWaiting ? " invisible" : "")}>
                        Finalizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImportingCSVModal;
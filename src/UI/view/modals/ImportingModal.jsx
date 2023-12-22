import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ActionWithWaitButton from "../ActionWithWaitButton";


const ImportingModal = ({title, icon, show, setShow, selectedQuestions}) => {
    const questionsWithState = selectedQuestions ? selectedQuestions.map(q => ({state: "waiting", ...q})) : [];
    const [questions, setQuestions] = useState(questionsWithState);
    const [areQuestionsWaiting, setAreQuestionsWaiting] = useState(true);

    const handleClose = () => {
        if (!areQuestionsWaiting){
            setShow(false);
        }
    };

    useEffect(() => {
        const questionsWithState = selectedQuestions ? selectedQuestions.map(q => ({state: "waiting", ...q})) : [];
        setQuestions(questionsWithState);
    }, [show]);

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
                            onClick={() => {q.id}}
                            waiting={q.state === "waiting"}
                            success={q.state === "success"}
                            key={q.id}
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

export default ImportingModal;
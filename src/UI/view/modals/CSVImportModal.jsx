import { faCheck, faCircleInfo, faHandPointer, faInfo, faPlus, faRightLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCSVReader, formatFileSize } from "react-papaparse";
import IconButton from "../IconButton";
import QuestionInfoModal from "./QuestionInfoModal";

const CSVImportModal = ({show, setShow, icon, title, confirmButton}) => {
    const [isHover, setIsHover] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [chosenQuestionsIdxs, setChosenQuestionsIdxs] = useState([]);
    const [infoQuestion, setInfoQuestion] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    const { CSVReader } = useCSVReader();

    const handleAccept = () => {
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
        setQuestions([]);
        setChosenQuestionsIdxs([]);
    }

    const mouseEnter = () => {
        setIsHover(true);
    }

    const mouseLeave = () => {
        setIsHover(false);
    }

    const parseQuestionsInFile = (result) => {
        if (result && result.data) {
            const newQuestions = result.data.filter(row => row.length > 3).map(row => ({
                name : row[0],
                correct_answer : {name : row[1]},
                answers : [
                    ...row.slice(2, row.length).map(ansRow => ({name : ansRow}))
                ]
            }));
            setQuestions([...newQuestions]);
        }
    }

    const idIsSelected = (idx) => {
        return chosenQuestionsIdxs.includes(idx);
    }

    const onClickQuestion = (idx) => {
        if (!idIsSelected(idx)) {
            setChosenQuestionsIdxs([...chosenQuestionsIdxs, idx]);
        } else {
            let filteredIdxs = chosenQuestionsIdxs.filter(i => i !== idx);
            setChosenQuestionsIdxs([...filteredIdxs]);
        }
    }

    const loadQuestionInfo = (idx) => {
        setInfoQuestion(questions[idx]);
        setShowInfo(true);
    }

    const selectAll = () => {
        setChosenQuestionsIdxs([...Array(questions.length).keys()])
    }

    const removeAll = () => {
        setChosenQuestionsIdxs([]);
    }

    return show ? (
            <>
                <CSVReader
                    onUploadAccepted={parseQuestionsInFile}
                >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                    }) => (
                            <Modal show={(show && !showInfo)} onHide={handleClose} className="modal-content-center">
                                <Modal.Header closeButton className="text-white bg-dark">
                                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                                <button 
                                                    className={"btn d-flex w-100" + (acceptedFile ? " btn-dark" : " btn-outline-dark")}
                                                    onMouseEnter={mouseEnter}
                                                    onMouseLeave={mouseLeave}
                                                    {...getRootProps()}
                                                >
                                                    <div
                                                        className="flex-grow-1"
                                                    >
                                                        {acceptedFile ? acceptedFile.name : "Cargar Archivo CSV"}
                                                    </div>
                                                    <div className={"ps-3 pe-1 border-start" + ((acceptedFile || isHover) ? " border-white" : " border-dark")}>
                                                        <FontAwesomeIcon icon={acceptedFile ? faRightLeft : faHandPointer} />
                                                    </div>
                                                </button>
                                            
                                    {
                                        (questions.length > 0) ? (
                                            <>
                                                <div
                                                    className="d-flex pt-4 mt-4" style={{
                                                        borderTop: "var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)"
                                                    }}
                                                >
                                                    <IconButton
                                                        icon={faCheck}
                                                        text="Seleccionar Todas"
                                                        className="flex-grow-1"
                                                        variant="outline-primary"
                                                        onHoverVariant="white"
                                                        noHoverVariant="primary"
                                                        onClick={selectAll}
                                                    />
                                                    <span className="d-block ps-3" />
                                                    <IconButton
                                                        icon={faXmark}
                                                        text="Seleccionar Ninguna"
                                                        className="flex-grow-1"
                                                        variant="outline-secondary"
                                                        onHoverVariant="light"
                                                        noHoverVariant="secondary"
                                                        onClick={removeAll}
                                                    />
                                                </div>
                                                <div className="mt-4 pt-3 pb-3" style={{
                                                    borderTop: "var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color)"
                                                }}>

                                                    {
                                                        questions.map((q, idx) => (!idIsSelected(idx) ? (
                                                            <div
                                                                className="d-flex pt-3"
                                                                key={idx}
                                                            >
                                                                <IconButton
                                                                    icon={faPlus}
                                                                    text={q.name}
                                                                    className="flex-grow-1"
                                                                    variant="outline-dark"
                                                                    onHoverVariant="light"
                                                                    noHoverVariant="dark"
                                                                    onClick={() => onClickQuestion(idx)}
                                                                />
                                                                <Button
                                                                    className="ms-3"
                                                                    variant="dark"
                                                                    onClick={() => loadQuestionInfo(idx)}
                                                                    size="lg"
                                                                >
                                                                    <FontAwesomeIcon icon={faInfo} className="px-1" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="d-flex pt-3"
                                                                key={idx}
                                                            >
                                                                <IconButton
                                                                    icon={faCheck}
                                                                    text={q.name}
                                                                    className="flex-grow-1"
                                                                    variant="primary"
                                                                    onHoverVariant="white"
                                                                    noHoverVariant="white"
                                                                    onClick={() => onClickQuestion(idx)}
                                                                />
                                                                <Button
                                                                    className="ms-3"
                                                                    variant="dark"
                                                                    size="lg"
                                                                    onClick={() => loadQuestionInfo(idx)}
                                                                >
                                                                    <FontAwesomeIcon icon={faInfo} className="px-1" />
                                                                </Button>
                                                            </div>
                                                        )))
                                                    }
                                                </div>
                                            </>
                                            ) : ""
                                        }
                                </Modal.Body>
                                <Modal.Footer>
                                    
                                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                                        Cancelar
                                    </Button>
                                    <Button variant="dark" onClick={handleAccept} className={"flex-fill no-flex-basis p-3" + (chosenQuestionsIdxs.length <= 0 ? " invisible" : "")}
                                        disabled={chosenQuestionsIdxs.length <= 0}
                                    >
                                        {confirmButton}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )
                    }
                </CSVReader>
                <QuestionInfoModal 
                    title="Información del Set"
                    question={infoQuestion}
                    icon={faCircleInfo}
                    show={showInfo}
                    setShow={setShowInfo}
                />
            </>
        ) : "";
}

export default CSVImportModal;
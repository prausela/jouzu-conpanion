import { faCheck, faHandPointer, faInfo, faPlus, faRightLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import IconButton from "../IconButton";
import CategorySelectModal from "./CategorySelectModal";
import SetSelectModal from "./SetSelectModal";
import { OK } from "../../config/apiConstants";


const ImportModal = ({title, addItem, confirmButton, icon, show, setShow, categories, sets, setCategories, setSets, categoryId, setId, selectQuestions}) => {
    const [alert, setAlert] = useState("");
    const [isHoverCat, setHoverCat] = useState(false);
    const [isHoverSet, setHoverSet] = useState(false);
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [showSetSelect, setShowSetSelect] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions ] = useState([]);

    const handleClose = () => {
        setShow(false);
        setSelectedCat(null);
        setSelectedSet(null);
    };

    const handleAccept = () => {
    }

    const onClickCat = () => {
        setShowCategorySelect(true);
    }

    const onClickSet = () => {
        setShowSetSelect(true);
    }

    const mouseLeaveCat = () => {
        setHoverCat(false)
    }

    const mouseEnterCat = () => {
        setHoverCat(true)
    }

    const mouseLeaveSet = () => {
        setHoverSet(false)
    }

    const mouseEnterSet = () => {
        setHoverSet(true)
    }

    const selectAll = () => {
        setSelectedQuestions([...questions]);
    }

    const removeAll = () => {
        setSelectedQuestions([]);
    }

    const setCategoryWrapper = (value) => {
        if (value !== selectedCat) {
            setSelectedSet(null);
        }
        setSelectedCat(value);
    }

    const idIsSelected = (id) => {
        console.log("is");
        console.log(id);
        console.log(selectedQuestions);
        return selectedQuestions.filter(q => (q.id).toString() === id.toString()).length >= 1;
    }

    const onClickQuestion = (id) => {
        console.log(id);
        const currQuestion = selectedQuestions.filter(q => (q.id).toString() === id.toString());
        console.log(currQuestion)
        if (currQuestion.length >= 1) {
            const newSelectedQuestions = selectedQuestions.filter(q => (q.id).toString() !== id.toString());
            console.log("chaju");
            console.log(newSelectedQuestions);
            setSelectedQuestions(newSelectedQuestions);
        } else {
            const questionToAdd = questions.filter(q => (q.id).toString() === id.toString())[0];
            console.log("hola")
            console.log(questionToAdd);
            setSelectedQuestions([questionToAdd, ...selectedQuestions])
        }
        console.log(selectedQuestions);
    }

    useEffect(() => {
        setSelectedQuestions([]);
        setQuestions([]);
        selectQuestions(selectedCat, selectedSet).then((response) => {
            if (response.status == OK){
                setQuestions(response.data);
                console.log(response);
                console.log(setId);
                console.log(categoryId);
            }
        });
    }, [selectedCat, selectedSet]);

    return (
        <>
            <Modal show={(show && !showCategorySelect && !showSetSelect)} onHide={handleClose} className="modal-content-center">
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        { alert ? <Alert
                                        variant="danger"
                                    >
                                        {alert}
                                    </Alert> : ""}
                        {!selectedCat ? 
                        (<Button
                            className="w-100 d-flex"
                            variant="outline-dark"
                            onMouseEnter={mouseEnterCat}
                            onMouseLeave={mouseLeaveCat}
                            onClick={onClickCat}
                        >
                            <div
                                className="flex-grow-1"
                            >
                                Seleccionar Nivel
                            </div>
                            <div className={"ps-3 pe-1 border-start" + (isHoverCat ? " border-white" : " border-dark")}>
                                <FontAwesomeIcon icon={faHandPointer} />
                            </div>
                        </Button>) :
                        (<Button
                            className="w-100 d-flex"
                            variant="dark"
                            onMouseEnter={mouseEnterCat}
                            onMouseLeave={mouseLeaveCat}
                            onClick={onClickCat}
                        >
                            <div
                                className="flex-grow-1"
                            >
                                { categories ? categories.filter(c => (c.id).toString() === selectedCat)[0].name : "..." }
                            </div>
                            <div className={"ps-3 pe-1 border-start" + (isHoverCat ? " border-white" : " border-white")}>
                                <FontAwesomeIcon icon={faRightLeft} />
                            </div>
                        </Button>)
                        }
                        <span className="py-2 d-block"/>
                        { !(selectedCat && selectedSet) ? (<Button
                            className="w-100 d-flex"
                            variant="outline-dark"
                            onMouseEnter={mouseEnterSet}
                            onMouseLeave={mouseLeaveSet}
                            onClick={onClickSet}
                            disabled={!selectedCat}
                        >
                            <div
                                className="flex-grow-1"
                            >
                                Seleccionar Set
                            </div>
                            <div className={"ps-3 pe-1 border-start" + (isHoverSet ? " border-white" : " border-dark")}>
                                <FontAwesomeIcon icon={faHandPointer} />
                            </div>
                        </Button>) :
                        (<Button
                            className="w-100 d-flex"
                            variant="dark"
                            onMouseEnter={mouseEnterSet}
                            onMouseLeave={mouseLeaveSet}
                            onClick={onClickSet}
                        >
                            <div
                                className="flex-grow-1"
                            >
                                { sets ? sets.filter(s => (s.id).toString() === selectedSet)[0].name : "..." }
                            </div>
                            <div className={"ps-3 pe-1 border-start" + (isHoverSet ? " border-white" : " border-white")}>
                                <FontAwesomeIcon icon={faRightLeft} />
                            </div>
                        </Button>)
                        }
                    </div>
                    {
                        (selectedCat && selectedSet) ? (
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
                                        questions.map(q => (!idIsSelected(q.id) ? (
                                            <div
                                                className="d-flex pt-3"
                                                key={q.id}
                                            >
                                                <IconButton
                                                    icon={faPlus}
                                                    text={q.name}
                                                    className="flex-grow-1"
                                                    variant="outline-dark"
                                                    onHoverVariant="light"
                                                    noHoverVariant="dark"
                                                    onClick={() => onClickQuestion(q.id)}
                                                />
                                                <Button
                                                    className="ms-3"
                                                    variant="dark"
                                                    size="lg"
                                                >
                                                    <FontAwesomeIcon icon={faInfo} className="px-1" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div
                                                className="d-flex pt-3"
                                                key={q.id}
                                            >
                                                <IconButton
                                                    icon={faCheck}
                                                    text={q.name}
                                                    className="flex-grow-1"
                                                    variant="primary"
                                                    onHoverVariant="white"
                                                    noHoverVariant="white"
                                                    onClick={() => onClickQuestion(q.id)}
                                                />
                                                <Button
                                                    className="ms-3"
                                                    variant="dark"
                                                    size="lg"
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
                <Modal.Footer className="align-items-stretch">
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleAccept} className={"flex-fill no-flex-basis p-3" + (!(selectedSet && selectedCat) ? " invisible" : "")}
                        disabled={!(selectedSet && selectedCat)}
                    >
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
            <CategorySelectModal 
                title="Seleccionar Nivel"
                show={showCategorySelect}
                setShow={setShowCategorySelect}
                confirmButton="Seleccionar"
                selectedCat={selectedCat}
                setSelectedCat={setCategoryWrapper}
                categories={categories}
                setCategories={setCategories}
            />
            <SetSelectModal
                title="Seleccionar Set"
                show={showSetSelect}
                setShow={setShowSetSelect}
                confirmButton="Seleccionar"
                selectedCat={selectedCat}
                selectedSet={selectedSet}
                setSelectedSet={setSelectedSet}
                sets={sets}
                setSets={setSets}
            />
        </>
    )
}

export default ImportModal;
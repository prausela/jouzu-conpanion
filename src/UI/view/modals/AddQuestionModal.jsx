import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";


const AddQuestionModal = ({title, addItem, confirmButton, icon, show, setShow}) => {
    const [name, setName] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [otherAnswers, setOtherAnswers] = useState([{name:""},{name:""}]);
    const [alert, setAlert] = useState("");

    const handleClose = () => {
        setShow(false);
        setName("");
        setCorrectAnswer("");
        setOtherAnswers([{name:""},{name:""}]);
    };

    const handleAccept = () => {
        addItem({name, correctAnswer, answers: otherAnswers.filter(answer => answer.name !== "")}, setAlert).then((response) => {
            if(response) {
                handleClose();
            }
        });
    }

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleAccept();
        }
    }

    const handleOtherAnswers = (index, e) => {
        const newOtherAnswers = [...otherAnswers];
        newOtherAnswers[index].name = e.target.value;
        setOtherAnswers(newOtherAnswers);
        checkIfAllCompleted();
    }

    const checkIfAllCompleted = () => {
        const emptyAnswers = otherAnswers.filter(answer => (answer.name ? (answer.name === "") : true));
        if (emptyAnswers.length === 0) {
            setOtherAnswers([...otherAnswers, {name:""}])
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: "25vh", overflowY: "scroll"}}>
                        { alert ? <Alert
                                    variant="danger"
                                >
                                    {alert}
                                </Alert> : ""}
                    <Form.Control
                        placeholder="Título"
                        onKeyDown={handleEnter}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <InputGroup className="mt-3">
                        <InputGroup.Text id="respuesta-correcta" className="text-white bg-success" style={{width: "7rem"}}>Correcta</InputGroup.Text>
                        <Form.Control
                            placeholder="Respuesta Correcta"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            aria-describedby="respuesta-correcta"
                        />
                    </InputGroup>
                    {
                        otherAnswers.map((answer, index) => (
                            <InputGroup className="mt-3" key={index}>
                                <InputGroup.Text id={"respuesta-incorrecta-" + index} className="text-white bg-danger" style={{width: "7rem"}}>Incorrecta {index + 1}</InputGroup.Text>
                                <Form.Control
                                    placeholder="Respuesta Incorrecta"
                                    aria-describedby={"respuesta-incorrecta-" + index}
                                    value={answer.name}
                                    onChange={(e) => handleOtherAnswers(index, e)}
                                />
                            </InputGroup>
                        ))
                    }
                    
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleAccept} className="flex-fill no-flex-basis p-3">
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddQuestionModal;
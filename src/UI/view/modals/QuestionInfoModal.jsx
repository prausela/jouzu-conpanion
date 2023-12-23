import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";


const QuestionInfoModal = ({title, question, icon, show, setShow}) => {
    const [otherAnswers, setOtherAnswers] = useState(question ? [...question.answers] : []);

    const handleClose = () => {
        setShow(false);
    };

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleClose();
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: "25vh", overflowY: "scroll"}}>
                    <Form.Control
                        placeholder="Título"
                        onKeyDown={handleEnter}
                        value={question ? question.name : ""}
                        autoFocus
                        disabled readOnly
                    />
                    <InputGroup className="mt-3">
                        <InputGroup.Text id="respuesta-correcta" className="text-white bg-success" style={{width: "7rem"}}>Correcta</InputGroup.Text>
                        <Form.Control
                            placeholder="Respuesta Correcta"
                            value={question ? question["correct_answer"].name : ""}
                            aria-describedby="respuesta-correcta"
                            readOnly disabled
                        />
                    </InputGroup>
                    {
                        question ? question["answers"].map((answer, index) => (
                            <InputGroup className="mt-3" key={index}>
                                <InputGroup.Text id={"respuesta-incorrecta-" + index} className="text-white bg-danger" style={{width: "7rem"}}>Incorrecta {index + 1}</InputGroup.Text>
                                <Form.Control
                                    placeholder="Respuesta Incorrecta"
                                    aria-describedby={"respuesta-incorrecta-" + index}
                                    value={answer.name}
                                    disabled readOnly
                                />
                            </InputGroup>
                        )) : ""
                    }
                    
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="dark" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuestionInfoModal;
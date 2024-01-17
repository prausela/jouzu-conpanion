import { faFolderOpen, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Button, ButtonGroup, Form, Modal, ToggleButton } from "react-bootstrap";


const AddModal = ({title, addItem, confirmButton, icon, show, setShow}) => {
    const setTypes = [
        { name : "Preguntas", value : "questions", icon : faList },
        { name : "Carpeta", value : "folder", icon : faFolderOpen }
    ];

    const [name, setName] = useState("");
    const [alert, setAlert] = useState("");
    const [selectedType, setSelectedType] = useState(setTypes[0].value);

    const handleClose = () => {
        setShow(false);
        setName("");
    };

    const handleAccept = () => {
        addItem(name, setAlert).then((response) => {
            if (response) {
                handleClose();
            }
        });
    }

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleAccept();
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    {
                        false ? (
                            <Form.Group
                                className="mt-3 d-flex align-items-center"
                            >
                                <ButtonGroup
                                    className="flex-grow-1 p-3 border d-flex"
                                >
                                    {setTypes.map((setType, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`settype-${idx}`}
                                            type="radio"
                                            variant={selectedType === setType.value ? "outline-primary" : "outline-dark"}
                                            name="radio"
                                            value={setType.value}
                                            checked={selectedType === setType.value}
                                            onChange={(e) => setSelectedType(e.currentTarget.value)}
                                            className="no-flex-basis d-flex flex-column p-3"
                                        >
                                            <FontAwesomeIcon icon={setType.icon} className="text-2 mb-2"/>
                                            <small>{setType.name}</small>
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                        ) : ""
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

export default AddModal;
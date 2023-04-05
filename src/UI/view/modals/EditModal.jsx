import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";


const EditModal = ({title, confirmButton, icon, show, setShow, name, item, editItem}) => {
    const [newName, setNewName] = useState(name);
    const [alert, setAlert] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    const handleAccept = () => {
        editItem(newName, setAlert).then((response) => {
            handleClose();
        });
    }

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleAccept();
        }
    }

    useEffect(() => {
        if (show) {
            setNewName(name);
        } else {
            setNewName("");
        }
        setAlert("");
    }, [show])

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
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                    />
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

export default EditModal;
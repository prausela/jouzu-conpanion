import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";


const DeleteModal = ({title, confirmButton, icon, show, setShow, name, item, deleteItem}) => {
    const [alert, setAlert] = useState("");

    const handleClose = () => {
        setShow(false);
        setAlert("");
    }

    const handleAccept = () => {
        deleteItem(setAlert).then((response) => {
            handleClose();
        });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-danger">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { alert ? <Alert
                            variant="danger"
                        >
                            {alert}
                        </Alert> : ""}
                    ¿Realmente quiere eliminar <strong>{name}</strong> y todo lo que contiene?
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="secondary" onClick={handleClose} autoFocus className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleAccept} className="flex-fill no-flex-basis p-3">
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal;
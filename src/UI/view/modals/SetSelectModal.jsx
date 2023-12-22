import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";


const SetSelectModal = ({title, confirmButton, icon, show, setShow, selectedSet, selectedCat, setSelectedSet, sets, setSets}) => {
    const [alert, setAlert] = useState("");
    const [tempSelectedSet, setTempSelectedSet] = useState(selectedSet);

    const handleClose = () => {
        setShow(false);
    };

    const handleAccept = () => {
        setSelectedSet(tempSelectedSet);
        setShow(false);
    };

    useEffect(() => {
        setTempSelectedSet(selectedSet);
        setSets(selectedCat, setAlert);
    }, [show]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center">{icon ? <FontAwesomeIcon icon={icon} className="text-2"/> : ""}<span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { alert ? <Alert
                                    variant="danger"
                                >
                                    {alert}
                                </Alert> : ""}
                    { sets ? sets.map((s, idx) => <Button
                            className={"w-100" + (idx === 0 ? "" : " mt-3")}
                            variant={((s.id).toString() === tempSelectedSet) ? "dark" : "outline-dark"}
                            size="lg"
                            onClick={() => setTempSelectedSet((s.id).toString())}
                            key={s.id}
                        >
                            {s.name}
                        </Button>) : ""
                    }
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleAccept} className={"flex-fill no-flex-basis p-3" + (tempSelectedSet ? "" : " invisible")}
                    >
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SetSelectModal;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";


const CategorySelectModal = ({title, confirmButton, icon, show, setShow, selectedCat, setSelectedCat, categories, setCategories}) => {
    const [alert, setAlert] = useState("");
    const [tempSelectedCat, setTempSelectedCat] = useState(selectedCat);

    const handleClose = () => {
        setShow(false);
    };

    const handleAccept = () => {
        setSelectedCat(tempSelectedCat);
        setShow(false);
    };

    useEffect(() => {
        setTempSelectedCat(selectedCat);
        setCategories(setAlert);
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
                    { categories ? categories.map((c, idx) => <Button
                            className={"w-100" + (idx === 0 ? "" : " mt-3")}
                            variant={((c.id).toString() === tempSelectedCat) ? "dark" : "outline-dark"}
                            size="lg"
                            onClick={() => setTempSelectedCat((c.id).toString())}
                            key={c.id}
                        >
                            {c.name}
                        </Button>) : ""
                    }
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleAccept} className={"flex-fill no-flex-basis p-3" + (tempSelectedCat ? "" : " invisible")}
                    >
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CategorySelectModal;
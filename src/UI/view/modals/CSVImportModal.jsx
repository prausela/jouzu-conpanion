import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CSVImportModal = ({show, setShow, icon, title, confirmButton}) => {
    const [isHover, setIsHover] = useState(false);

    const handleAccept = () => {
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    const mouseEnter = () => {
        setIsHover(true);
    }

    const mouseLeave = () => {
        setIsHover(false);
    }

    return (
        <>
            <Modal show={(show)} onHide={handleClose} className="modal-content-center">
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label 
                        className="btn btn-outline-dark d-flex w-100"
                        htmlFor="csv_file"
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    >
                        <div
                            className="flex-grow-1"
                        >
                            Cargar Archivo CSV
                        </div>
                        <div className={"ps-3 pe-1 border-start" + (isHover ? " border-white" : " border-dark")}>
                            <FontAwesomeIcon icon={faHandPointer} />
                        </div>
                        
                    </label>
                    <input 
                        id="csv_file"
                        className="d-none"
                        type="file"
                        accept=".csv"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleAccept} className={"flex-fill no-flex-basis p-3" + (true ? " invisible" : "")}
                        disabled={true}
                    >
                        {confirmButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CSVImportModal;
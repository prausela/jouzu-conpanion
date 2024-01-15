import { faFileCsv, faList, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ImportModal from "./ImportModal";
import CSVImportModal from "./CSVImportModal";

const SelectImportModal = ({selectImportTitle, selectImportIcon, showSelect, setShowSelect, title, addItem, confirmButton, icon, show, setShow, categories, sets, setCategories, setSets, categoryId, setId, selectQuestions, importQuestion, refreshItems}) => {
    const [showFromCSV, setShowFromCSV] = useState(false);
    const [showFromSet, setShowFromSet] = useState(false);

    const handleClose = () => {
        setShowSelect(false);
        setShowFromCSV(false);
        setShowFromSet(false);
    };

    const switchShowFromCSVState = (newVal) => {
        if (newVal) {
            setShowSelect(false);
            setShowFromSet(false);
            setShowFromCSV(true);
        } else {
            setShowSelect(false);
            setShowFromSet(false);
            setShowFromCSV(false);
        }
    }

    const switchShowFromSetState = (newVal) => {
        if (newVal) {
            setShowSelect(false);
            setShowFromSet(true);
            setShowFromCSV(false);
        } else {
            setShowSelect(false);
            setShowFromSet(false);
            setShowFromCSV(false);
        }
    }

    return (
        <>
            <Modal show={(showSelect && !showFromCSV && !showFromSet)} onHide={handleClose}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center"><FontAwesomeIcon icon={selectImportIcon} className="text-2"/><span className="ps-2"><small>{selectImportTitle}</small></span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="d-flex"
                    >
                        <Button
                            variant="dark"
                            className="flex-grow-1 no-flex-basis d-flex flex-column align-items-center p-3"
                            onClick={() => switchShowFromCSVState(true)}
                        >
                            <FontAwesomeIcon icon={faFileCsv} className="text-2"/>
                            <span className="pt-2"><small>Archivo CSV</small></span>
                        </Button>
                        <span className="ms-2"/>
                        <Button
                            variant="dark"
                            className="flex-grow-1 no-flex-basis d-flex flex-column align-items-center p-3"
                            onClick={() => switchShowFromSetState(true)}
                        >
                            <FontAwesomeIcon icon={faList} className="text-2"/>
                            <span className="pt-2"><small>Set existente</small></span>
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="flex-fill no-flex-basis p-3">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            <ImportModal
                show={(!showSelect && showFromSet && !showFromCSV)}
                setShow={switchShowFromSetState}
                title={title}
                icon={faList}
                confirmButton={title}
                addItem={addItem}
                sets={sets}
                categories={categories}
                setCategories={setCategories}
                setSets={setSets}
                categoryId={categoryId}
                setId={setId}
                selectQuestions={selectQuestions}
                importQuestion={importQuestion}
                refreshItems={refreshItems}
            />
            <CSVImportModal 
                show={(!showSelect && !showFromSet && showFromCSV)}
                setShow={switchShowFromCSVState}
                title={title}
                icon={faFileCsv}
                confirmButton={title}
            />
        </>
    );
}

export default SelectImportModal;
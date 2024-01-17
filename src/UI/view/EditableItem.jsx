import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPencil, faTrashCan, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditQuestionModal from './modals/EditQuestionModal';
import FolderButton from './FolderButton';

const EditableItem = ({id, item, itemCount, className, editItem, deleteItem, refreshItems, itemUrl, addQuestion, visibility}) => {
    const [visible, setVisible] = useState(visibility === "visible" ? true : false);

    const [isShowingEditModal, setShowingEditModal] = useState(false);
    const [isShowingDeleteModal, setShowingDeleteModal] = useState(false);

    const showEditModal = () => setShowingEditModal(true);
    const showDeleteModal = () => setShowingDeleteModal(true);

    const switchVisibility = () => {
        editItem(id, item.name, item.position, visible === true ? "invisible" : "visible", undefined).then((res) => {
            setVisible(res ? !visible : visible);
        })
    }

    const moveUp = () => {
        editItem(id, item.name, (parseInt(item.position) - 1).toString(), visible === true ? "visible" :  "invisible", undefined).then((res) => {
            refreshItems();
        })
    }

    const moveDown = () => {
        editItem(id, item.name, (parseInt(item.position) + 1).toString(), visible === true ? "visible" :  "invisible", undefined).then((res) => {
            refreshItems();
        })
    }

    const navigate = useNavigate();

    return (
        <>
            <div className={"d-flex flex-column p-2 px-4" + (className ? " " + className : "")}>
                <div className="d-flex">
                    {
                        item.position ? (
                            <>
                                <div className="d-flex flex-column" style={{width:"5rem"}}>
                                    <Button 
                                        variant={visible ? "dark" : "secondary"}
                                        className="hard-tr-edge hard-bl-edge hard-br-edge p-2 flex-grow-1 d-flex flex-column align-items-center justify-content-center"
                                        onClick={moveUp}
                                        disabled={parseInt(item.position) === 0}
                                    >
                                        <FontAwesomeIcon icon={faChevronUp} style={{fontSize:"1.5rem"}}/><span className="pt-2"><small>Subir</small></span>
                                    </Button>
                                    <span className="pt-2"/>
                                    <Button 
                                        variant={visible ? "dark" : "secondary"}
                                        className="hard-tl-edge hard-tr-edge hard-br-edge p-2 flex-grow-1 d-flex flex-column align-items-center justify-content-center"
                                        onClick={moveDown}
                                        disabled={parseInt(item.position) === itemCount-1}
                                    >
                                        <span className="pb-2"><small>Bajar</small></span><FontAwesomeIcon icon={faChevronDown} style={{fontSize:"1.5rem"}}/>
                                    </Button>
                                </div>
                                <span className="ps-2"/>
                            </>
                        ) : ""
                    }
                    <div
                        className="flex-grow-1 d-flex flex-column"
                    >
                        <FolderButton 
                            text={item.name}
                            visible={visible}
                            onClick={() => addQuestion ? {} : navigate(itemUrl(id))}
                            isFolder={item.type && item.type === "folder"}
                        />
                    </div>
                    <span className="ps-2"/>
                    <div className="d-flex flex-column" style={{width:"5rem"}}>
                        <Button 
                            variant={visible ? "outline-dark" : "outline-secondary"}
                            className="hard-tl-edge hard-bl-edge hard-br-edge p-2 flex-grow-1 d-flex flex-column align-items-center"
                            onClick={switchVisibility}
                        >
                            {
                                visible ? (
                                    <><FontAwesomeIcon icon={faEyeSlash} /><span className="pt-1"><small>Ocultar</small></span></>
                                ) : (
                                    <><FontAwesomeIcon icon={faEye} /><span className="pt-1"><small>Habilitar</small></span></>
                                )
                            }
                            
                        </Button>
                        <span className="pt-2"/>
                        <Button 
                            variant={visible ? "outline-dark" : "outline-secondary"}
                            className="hard-tl-edge hard-bl-edge hard-br-edge p-2 flex-grow-1 d-flex flex-column align-items-center"
                            onClick={showEditModal}
                        >
                            <FontAwesomeIcon icon={faPencil} /><span className="pt-1"><small>Editar</small></span>
                        </Button>
                        <span className="pt-2"/>
                        <Button 
                            variant="danger" 
                            className="hard-tl-edge hard-tr-edge hard-bl-edge p-2 flex-grow-1 d-flex flex-column align-items-center"
                            onClick={showDeleteModal}
                        >
                            <FontAwesomeIcon icon={faTrashCan} /><span className="pt-1"><small>Eliminar</small></span>
                        </Button>
                    </div>
                </div>                
            </div>
            {addQuestion? (
                <EditQuestionModal
                show={isShowingEditModal}
                setShow={setShowingEditModal}
                title="Editar"
                confirmButton="Guardar Cambios"
                icon={faPencil}
                name={item.name}
                item={item}
                editItem={(name, setAlert) => editItem(id, name, item.position, visibility, setAlert)}
            />
            ) : (
                <EditModal
                    show={isShowingEditModal}
                    setShow={setShowingEditModal}
                    title="Editar"
                    confirmButton="Guardar Cambios"
                    icon={faPencil}
                    name={item.name}
                    item={item}
                    editItem={(name, setAlert) => editItem(id, name, item.position, visibility, setAlert)}
                />
            )}
            
            <DeleteModal
                show={isShowingDeleteModal}
                setShow={setShowingDeleteModal}
                title="Eliminar"
                confirmButton="Eliminar"
                icon={faTrashCan}
                name={item.name}
                item={item}
                deleteItem={(setAlert) => deleteItem(id, setAlert)}
            />
        </>
    )
}

export default EditableItem;
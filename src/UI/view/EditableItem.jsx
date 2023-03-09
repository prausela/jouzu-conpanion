import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditQuestionModal from './modals/EditQuestionModal';

const EditableItem = ({id, item, className, editItem, deleteItem, itemUrl, addQuestion}) => {
    const [visible, setVisible] = useState(true);

    const [isShowingEditModal, setShowingEditModal] = useState(false);
    const [isShowingDeleteModal, setShowingDeleteModal] = useState(false);

    const showEditModal = () => setShowingEditModal(true);
    const showDeleteModal = () => setShowingDeleteModal(true);

    const switchVisibility = () => setVisible(!visible);

    const navigate = useNavigate();

    return (
        <>
            <div className={"d-flex flex-column p-2 px-4" + (className ? " " + className : "")}>
                <div className="d-flex">
                    <Button 
                        variant={visible ? "dark" : "secondary"} 
                        className="p-2 flex-grow-1 text-2"
                        onClick={() => addQuestion ? {} : navigate(itemUrl(id))}
                    >
                        <strong>{item.name}</strong>
                    </Button>
                    <span className="ps-2"/>
                    <div className="d-flex flex-column" style={{width:"5rem"}}>
                        <Button 
                            variant={visible ? "outline-dark" : "outline-secondary"}
                            className="hard-tl-edge hard-bl-edge hard-br-edge p-2 flex-grow-1 d-flex flex-column align-items-center"
                            onClick={switchVisibility}
                            disabled
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
                editItem={(name, setAlert) => editItem(id, name, setAlert)}
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
                    editItem={(name, setAlert) => editItem(id, name, setAlert)}
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
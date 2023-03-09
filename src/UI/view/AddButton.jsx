import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AddQuestionModal from './modals/AddQuestionModal';
import AddModal from './modals/AddModal';

const AddButton = ({title, addItem, className, variant, icon, refer, addQuestion}) => {
    const [isShowingModal, setShowingModal] = useState(false);

    const showModal = () => setShowingModal(true);

    return (
        <>
            <div className={"d-flex flex-column" + (className ? " " + className : "")} ref={refer}>
                <div className="d-flex">
                    <Button 
                        variant={variant ? variant : "dark"} 
                        className="hard-edges p-5 flex-grow-1 fs-3 d-flex flex-column align-items-center"
                        onClick={showModal}
                    >
                        { icon ? (<>
                            <FontAwesomeIcon icon={icon} className="text-4"/>
                            <span className="pt-2"/>
                        </>) : "" }
                        {title}
                    </Button>
                </div>
            </div>
            {
                addQuestion ? (
                    <AddQuestionModal
                        show={isShowingModal}
                        setShow={setShowingModal}
                        title={title}
                        icon={icon}
                        confirmButton={title}
                        addItem={addItem}
                    />
                ) : (
                    <AddModal
                        show={isShowingModal}
                        setShow={setShowingModal}
                        title={title}
                        icon={icon}
                        confirmButton={title}
                        addItem={addItem}
                    />
                )
                
            }
        </>
    )
}

export default AddButton;
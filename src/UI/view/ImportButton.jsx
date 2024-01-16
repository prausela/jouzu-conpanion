import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ImportModal from './modals/ImportModal';
import SelectImportModal from './modals/SelectImportModal';

const ImportButton = ({title, addItem, className, variant, icon, refer, addQuestion, categories, sets, setCategories, setSets, categoryId, setId, selectQuestions, importQuestion, refreshItems, createQuestions}) => {
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
                <SelectImportModal
                    selectImportTitle="Seleccionar cómo importar"
                    selectImportIcon={icon}
                    showSelect={isShowingModal}
                    setShowSelect={setShowingModal}
                    title={title}
                    icon={icon}
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
                    createQuestions={createQuestions}
                />
                
            }
        </>
    )
}

export default ImportButton;
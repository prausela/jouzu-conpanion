import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import ContextMenu from './ContextMenu';
import useHeight from './hooks/useHeight';
import Items from './Items';
import AddButton from './AddButton';
import LogInModal from './modals/LogInModal';

const ItemInterface = ({items, title, addItem, editItem, deleteItem, refreshItems, showLogin, setShowLogin, logInAlert, setLogInAlert, authActionsPending, setAuthActionsPending, itemUrl, addQuestion, menuAlert}) => {

    const contextMenuRef            = useRef(null);
    const nonEditableItemRef        = useRef(null);

    const contextMenuHeight         = useHeight(contextMenuRef);
    const nonEditableItemHeight     = useHeight(nonEditableItemRef);

    return (
        <>
            <ContextMenu 
                className="fix-top w-100 interface absolute-center-x"
                title={title}
                refer={contextMenuRef}
                menuAlert={menuAlert}
            />
            <main className="interface pb-2">
                <Items 
                    items={items}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    refreshItems={refreshItems}
                    style={{
                        paddingTop:     contextMenuHeight + "px",
                        paddingBottom:  nonEditableItemHeight + "px"
                    }}
                    itemUrl={itemUrl}
                    menuAlert={menuAlert}
                    addQuestion={addQuestion}
                />
                <LogInModal 
                    show={showLogin}
                    setShow={setShowLogin}
                    title="Ingresar"
                    icon={faLockOpen}
                    loginButton="Ingresar"
                    logInAlert={logInAlert}
                    setLogInAlert={setLogInAlert}
                    authActionsPending={authActionsPending}
                    setAuthActionsPending={setAuthActionsPending}
                />
            </main>
            <div className="fix-bottom w-100 interface absolute-center-x pt-5 bg-white p-2">
                <AddButton
                    title="Agregar"
                    icon={faPlus}
                    refer={nonEditableItemRef}
                    addItem={addItem}
                    addQuestion={addQuestion}
                />
            </div>
        </>
    )
}

export default ItemInterface;
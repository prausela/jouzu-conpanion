import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import useHeight from "./hooks/useHeight";
import LogInButton from "./LogInButton";
import LogInForm from "./LogInForm";

const LogInInterface = ({}) => {
    const contextMenuRef        = useRef(null);
    const nonEditableItemRef    = useRef(null);

    const contextMenuHeight     = useHeight(contextMenuRef);
    const nonEditableItemHeight = useHeight(nonEditableItemRef);

    return (
        <>
            <ContextMenu
                className="fix-top w-100 interface absolute-center-x"
                refer={contextMenuRef}
            />
            <main className="interface pb-2 min-vh-100 d-flex">
                <LogInForm 
                    className={"w-100 d-flex flex-column align-items-center justify-content-center"}
                    style={{
                        paddingTop:     contextMenuHeight + "px",
                        paddingBottom:  nonEditableItemHeight + "px"
                    }}/>
            </main>
            <div className="fix-bottom w-100 interface absolute-center-x pt-5 bg-white p-2">
                <LogInButton
                    title="Ingresar"
                    icon={faLockOpen}
                    refer={nonEditableItemRef}
                />
            </div>
            
        </>
    )
}

export default LogInInterface;
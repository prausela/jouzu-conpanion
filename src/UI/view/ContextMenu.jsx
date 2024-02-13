import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ContextMenu = ({className, icon, title, refer, menuAlert, userPage}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className={"d-flex flex-column" + (className ? " " + className : "")} ref={refer}>
                <nav className={"position-relative d-flex bg-white justify-content-between align-items-start"}>
                    <div
                        className="d-flex"
                    >
                        <Button 
                            variant="dark" 
                            className={"hard-edges d-flex flex-column align-items-center cut-left-corner me-3" + (location.key !== "default" ? "" : " invisible")}
                            onClick={location.key !== "default" ? () => navigate(-1) : () => {}}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="fs-3"/>
                            <span className="pt-1"><small>Volver</small></span>
                        </Button>
                    </div>
                    <h1 className="text-4 absolute-center">
                        { title ? <FontAwesomeIcon icon={icon} className="text-2 me-3 mb-1"/> : "" }
                        {title}
                    </h1>
                    <div
                        className="d-flex align-items-center"
                    >
                        {!userPage ? (
                            <Button 
                                variant="dark" 
                                className={"hard-edges d-flex flex-column align-items-center cut-right-corner pt-2"}
                                onClick={(() => navigate("/users/"))}
                            >
                                <FontAwesomeIcon icon={faUser} className="fs-3 mb-1" style={{
                                    height: "1rem"
                                }}/>
                                <span className="pt-1"><small>{"Usuarios"}</small></span>
                            </Button>) : ""}
                    </div>
                    
                </nav>
                <span className="pt-3 bg-white">
                </span>
                { (menuAlert && menuAlert.value) ? (<Alert
                        variant={menuAlert.variant}
                        className="hard-edges"
                    >{menuAlert.value}</Alert>) : (<Alert
                        variant="dark"
                        className='invisible hard-edges'
                    >Placeholder</Alert>)}
            </div>
            
        </>
    )
}

export default ContextMenu;
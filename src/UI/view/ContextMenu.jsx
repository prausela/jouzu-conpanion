import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ContextMenu = ({className, title, refer, menuAlert}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className={"d-flex flex-column" + (className ? " " + className : "")} ref={refer}>
                <nav className={"position-relative d-flex bg-white justify-content-between align-items-center"}>
                    <Button 
                        variant="dark" 
                        className={"hard-edges d-flex flex-column align-items-center cut-left-corner" + (location.key !== "default" ? "" : " invisible")}
                        onClick={location.key !== "default" ? () => navigate(-1) : () => {}}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="fs-3"/>
                        <span className="pt-1"><small>Volver</small></span>
                    </Button>
                    <h1 className="text-4 absolute-center">{title}</h1>
                    <FontAwesomeIcon icon={faHome} className="text-3 me-4"/>
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
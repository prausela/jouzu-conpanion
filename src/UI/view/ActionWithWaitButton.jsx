import { faCheck, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const ActionWithWaitButton = ({className, icon, variant, text, noHoverVariant, onHoverVariant, onClick, waiting, success}) => {
    const [isHover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true);
    }

    const mouseLeave = () => {
        setHover(false);
    }

    return (
        <Button
            className={ (className ? (className + " ") : "") + "d-flex align-items-stretch"}
            variant={waiting ? "outline-dark" : (success ? "outline-success" : "danger")}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={onClick}
            size="lg"
            disabled={waiting || (!waiting && success)}
            style={{
                opacity: "1"
            }}
        >
            <div className={"pe-3 ps-1 border-end d-flex" + (waiting ? (isHover ? " border-white" : " border-dark") : (success ? (isHover ? (" border-white") : (" border-success")) : (isHover ? (" border-white") : (" border-white"))))}>
                <div className="d-flex align-items-center justify-content-center">
                    {
                        waiting ? <Spinner size="sm" animation="border" variant={isHover ? "white" : "dark"} /> : (success ? <FontAwesomeIcon icon={faCheck} className=""/> : <FontAwesomeIcon icon={faRotateRight} className=""/>)
                    }
                </div>
            </div>
            <div
                className="flex-grow-1"
            >
                {text}
            </div>
            
        </Button>
    )
}

export default ActionWithWaitButton;
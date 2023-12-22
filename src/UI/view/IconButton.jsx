import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";

const IconButton = ({className, icon, variant, text, noHoverVariant, onHoverVariant, onClick}) => {
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
            variant={variant}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={onClick}
            size="lg"
        >
            <div className={"pe-3 ps-1 border-end d-flex" + ((isHover ? (" border-" + onHoverVariant) : (" border-" + noHoverVariant)))}>
                <div className="d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={icon} className=""/>
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

export default IconButton;
import { useState } from "react";
import { Button } from "react-bootstrap";

const FolderButton = ({text, visible, onClick, isFolder}) => {
    const [isHover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true);
    }

    const mouseLeave = () => {
        setHover(false);
    }

    return (
        <>
            {
                isFolder ? (<div
                    className="d-flex mb-2"
                >
                    <Button
                        variant={visible ? "dark" : "secondary"}
                        className={"d-flex p-3 round-borders hard-bl-edge hard-br-edge border-end-0"}
                        style={{
                            width: "50%"
                        }}
                        onClick={onClick}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        active={isHover}
                    />
                    <Button
                        variant={visible ? "dark" : "secondary"}
                        className={"d-flex p-2 mt-3 round-borders hard-bl-edge hard-br-edge hard-tl-edge border-start-0"}
                        style={{
                            width: "50%"
                        }}
                        onClick={onClick}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        active={isHover}
                    />
                </div>) : ""
            }
            <Button 
                variant={visible ? "dark" : "secondary"} 
                className="p-2 flex-grow-1 text-2"
                onClick={onClick}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                active={isHover}
            >
                <strong>{text}</strong>
            </Button>
        </>
    );
}

export default FolderButton;
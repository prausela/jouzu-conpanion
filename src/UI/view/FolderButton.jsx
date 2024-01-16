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
                isFolder ? (
                    <>
                        <div
                            className="d-flex"
                        >
                            <Button
                                variant={visible ? "dark" : "secondary"}
                                className={"d-flex p-3 round-borders hard-bl-edge hard-br-edge border-end-0 border-bottom-0 flex-grow-1"}
                                onClick={onClick}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                                active={isHover}
                            />
                            <Button
                                variant={visible ? "dark" : "secondary"}
                                className={"d-flex p-2 mt-3 round-borders hard-bl-edge hard-br-edge hard-tl-edge border-start-0 flex-grow-1 me-5"}
                                onClick={onClick}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                                active={isHover}
                            />
                        </div>
                        <div
                            className="flex-grow-1 d-flex"
                        >
                            <span className={`btn btn-${visible ? "dark" : "secondary"} hard-tr-edge hard-tl-edge hard-br-edge border-top-0 mb-3 ps-2 pe-2 ${isHover ? "active" : ""}`}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                                onClick={onClick}
                            />
                            <div
                                className="d-flex flex-grow-1"
                            >
                                <Button 
                                    variant={visible ? "dark" : "secondary"} 
                                    className="p-2 flex-grow-1 text-2 mt-2 ms-2"
                                    onClick={onClick}
                                    onMouseEnter={mouseEnter}
                                    onMouseLeave={mouseLeave}
                                    active={isHover}
                                >
                                    <strong>{text}</strong>
                                </Button>
                            </div>
                            
                        </div>
                    </>
                ) : (
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
                )
            }
        </>
    );
}

export default FolderButton;
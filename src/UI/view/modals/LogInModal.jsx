import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import UserService from "../../../logic/UserService";
import { OK } from "../../config/apiConstants";

const LogInModal = ({title, loginButton, icon, show, setShow, logInAlert, setLogInAlert, authActionsPending, setAuthActionsPending}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => setShow(false);

    const handleAccept = () => {
        setLogInAlert("");

        if (username === "" && password === "") {
            setLogInAlert("Los campos usuario y contraseña no pueden estar vacíos");
            return;
        }

        if (username === "") {
            setLogInAlert("El campo usuario no puede estar vacío");
            return;
        } 

        if (password === "") {
            setLogInAlert("El campo contraseña no puede estar vacío");
            return;
        }
        
        UserService.logIn(username, password).then(response => {
            if (response.status === OK) {
                handleClose();
                authActionsPending.forEach(action => action());
                setAuthActionsPending([]);
                setUsername("");
                setPassword("");
            }
            else {
                setLogInAlert("Usuario y contraseña incorrecto/s");
            }
        });
        
    }

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            handleAccept();
        }
    }

    return (
        <>
            <Modal show={show} onHide={() => {}}>
                <Modal.Header closeButton className="text-white bg-dark">
                    <Modal.Title className="d-flex align-items-center">
                        <FontAwesomeIcon icon={icon} className="text-2"/><span className="ps-2"><small>{title}</small></span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        { logInAlert ? <Alert
                            variant="danger"
                        >
                            {logInAlert}
                        </Alert> : ""}
                        <Form.Group className="mb-3">
                            <Form.Control 
                                placeholder="Usuario"
                                onKeyDown={handleEnter}
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                placeholder="Contraseña"
                                onKeyDown={handleEnter}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer className="align-items-stretch">
                    <Button variant="dark" onClick={handleAccept} className="flex-fill no-flex-basis p-3">
                        {loginButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogInModal;
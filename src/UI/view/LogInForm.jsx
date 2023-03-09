import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";

const LogInForm = ({className, style}) => {
    return (
        <div className={className ? className : ""} style={style}>
            <FontAwesomeIcon
                icon={faUser}
                className="text-10"
            />
            <Form.Group className="mx-5 mt-5">
                <Form.Control 
                    className="p-3 fs-3"
                    placeholder="Usuario"
                    autoFocus
                />
            </Form.Group>
            <Form.Group className="m-5">
                <Form.Control
                    className="p-3 fs-3"
                    placeholder="Contraseña"
                    type="password"
                />
            </Form.Group>
        </div>
    )
}

export default LogInForm;
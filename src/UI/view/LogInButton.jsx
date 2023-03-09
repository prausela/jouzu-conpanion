import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogInButton = ({title, className, variant, icon, refer}) => {

    return (
        <>
            <div className={"d-flex flex-column" + (className ? " " + className : "")} ref={refer}>
                <div className="d-flex">
                    <Button 
                        variant={variant ? variant : "dark"} 
                        className="hard-edges p-5 flex-grow-1 fs-3 d-flex flex-column align-items-center"
                        onClick={() => {}}
                    >
                        { icon ? (<>
                            <FontAwesomeIcon icon={icon} className="text-4"/>
                            <span className="pt-2"/>
                        </>) : "" }
                        {title}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default LogInButton;
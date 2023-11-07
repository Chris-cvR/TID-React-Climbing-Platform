import Button from 'react-bootstrap/Button';
import "../../styles/index.css";

function SecondaryButton({Text, onClick}) {

    const ButtonText= Text;
    
    return (
        <>
            <Button id="SecondaryButton" onClick={onClick}>{ButtonText}</Button>
        </>
    );
}

export default SecondaryButton;
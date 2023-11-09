import Button from 'react-bootstrap/Button';
import "../../styles/index.css";

function SecondaryButton({ Text, onClick }) {

    const ButtonText = Text;

    return (
        <>
            {/*We have had a hard time styling the Secondary button and overriding the Bootstrap CSS, therefore we have left it with an ID and as two separate componenets*/}
            <Button id="secondary-button" onClick={onClick}>{ButtonText}</Button>
        </>
    );
}

export default SecondaryButton;
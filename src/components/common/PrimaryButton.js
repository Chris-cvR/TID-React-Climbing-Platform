import Button from 'react-bootstrap/Button';
import "../../styles/index.css";

function PrimaryButton({ Text, onClick }) {

    const ButtonText = Text;

    return (
        <>
            <Button id="primary-button" onClick={onClick}>{ButtonText}</Button>
        </>
    );
}

export default PrimaryButton;
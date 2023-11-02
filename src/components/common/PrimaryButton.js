import Button from 'react-bootstrap/Button';
import "../../styles/index.css";

function PrimaryButton({Text}) {

    const ButtonText= Text;
    return (
        <>
            <Button id="PrimaryButton" > {ButtonText} </Button>{' '}
        </>
    );
}

export default PrimaryButton;
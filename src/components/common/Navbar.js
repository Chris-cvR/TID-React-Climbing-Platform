import "../../styles/Navbar.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import images from "../../assets/images/PeakPulse.png"

function CompleteNavbar() {

    const PeakPulseImage = images;

    return (
        <Navbar fixed="top" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={PeakPulseImage}
                        width="70"
                        height="70"
                        className="d-inline-block align-center"
                    />{' '}
                    PeakPulse
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="src/pages/LoginPage.js">User!</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CompleteNavbar;


import "../../styles/index.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import images from "../../assets/images/PeakPulse.png"
import { NavLink, Link } from "react-router-dom";

function CompleteNavbar() {

    const PeakPulseImage = images;

    return (
        <Navbar sticky="top" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="custom-brand">
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
                        Signed in as:
                        <NavLink className="nav-link" to="/login">User!</NavLink>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CompleteNavbar;


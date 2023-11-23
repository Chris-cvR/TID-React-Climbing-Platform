import "../../styles/index.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import images from "../../assets/images/PeakPulse.png"
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { Button } from 'antd';

const CompleteNavbar = ({ logout }) => {

    const user = Parse.User.current();

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
                    <Navbar.Text className="navbar-text">
                        Hello, {user ? user.get("username") : 'Guest'}!
                    </Navbar.Text>
                    <Button id="logout-button" className="form-button" size="large" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CompleteNavbar;


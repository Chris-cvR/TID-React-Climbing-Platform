import "../../styles/index.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ProfilePicture from "./ProfilePicture";
import images from "../../assets/images/PeakPulse.png"
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CompleteNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        Parse.User.logOut().then(() => {
            navigate('/');
        }).catch((error) => {
            console.error('Failed to log out, with error: ', error);
        });
    }

    const user = Parse.User.current();

    const PeakPulseImage = images;

    return (
        <Navbar sticky="top" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/feed" className="custom-brand">
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
                    <Link to={`/user/${user.get("username")}`}>
                        <ProfilePicture size="60px" />
                    </Link>
                    <Navbar.Text className="navbar-text">
                        Hello, {user ? (
                            <Link to={`/user/${user.get("username")}`}>
                                {user.get("username")}
                            </Link>
                        ) : 'Guest'}!
                    </Navbar.Text>
                    <Button id="logout-button" className="form-button" size="large" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CompleteNavbar;


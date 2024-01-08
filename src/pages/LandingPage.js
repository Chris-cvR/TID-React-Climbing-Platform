import '../styles/index.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/images/PeakPulse_white.png"
import image from "../assets/images/peak-stars.webp"
import mockup from "../assets/images/mockup-cut.png"

export const LandingPage = () => { 

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <div className='landing-page' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'bottom', height: '100vh', color: 'white'}}>
            <div className="landing-page-info">
                <div className="landing-image">
                    <img className="landing-logo"
                        src={Logo}
                        width="150"
                        height="150"
                        alt=""
                    />
                </div>
                <div className='landing-page-text'>
                    <h2>Meet PeakPulse, the #1 social media platform for climbers</h2>
                    <br></br>
                    <h5>Join climbers around the globe to connect, uncover new locations, share experiences, and stay updated with the latest climbing trends. Benefit from an engaging community, intuitive interface, and a wealth of insights. Join us today and elevate your climbing journey!</h5>
                </div>
                <div className='landing-page-button'>
                    <Button onClick={navigateToLogin} className="form-button" size="large"> Get started </ Button>
                </div>
            </div>
            <div className='mockup-container'>
                <img
                    src={mockup}
                    alt=""
                    width="100%"
                    height="auto"
                />
            </div>
        </div>
    );
}

export default LandingPage;
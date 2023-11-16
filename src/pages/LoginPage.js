import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/PeakPulse_white.png";
import PrimaryButton from "../components/common/PrimaryButton";
import image from "../assets/images/CityOfRocks_KieranHadley_BathRock_Calamari12b-2048x1152.jpg"

function LoginPage() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //code for API call
    }

    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', color: 'white' }}>
            <div className="login-container">
                <div className="login-image">
                    <img className="login-logo"
                        src={Logo}
                        width="100"
                        height="100"
                        alt=""
                    />
                </div>

                <p className="welcome-text"><i className="fas fa-home"></i> Welcome to PeakPulse!</p>

                <div>
                    <form>
                        <div className="mb-3 custom-input">
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Email'
                                name='email'
                                value={loginData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3 custom-input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Password'
                                name='password'
                                value={loginData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <PrimaryButton Text="Login" />
                    </form>
                    <h6 className="not-a-member">Not a member? <NavLink className="nav-link" to="/register">Register</NavLink></h6>
                </div>
            </div>

        </div >
    );
}

export default LoginPage;


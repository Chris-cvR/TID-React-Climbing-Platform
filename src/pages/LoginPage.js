import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/PeakPulse_white.png";
import image from "../assets/images/CityOfRocks_KieranHadley_BathRock_Calamari12b-2048x1152.jpg"
import Parse from 'parse/dist/parse.min.js';
import { Input, Button } from 'antd';

export const LoginPage = () => {
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const doUserLogIn = async function () {
        try {
            const loggedInUser = await Parse.User.logIn(username, password);
            // Clear input fields
            setUsername('');
            setPassword('');
            // Update state variable holding current user
            setCurrentUser(loggedInUser);

            navigate("/feed");
            return true;
        } catch (error) {
            // Error can be caused by wrong parameters or lack of Internet connection
            setErrorMessage('Invalid username or password.');
            return false;
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    }

    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', color: 'white' }}>
            <div className="login-container">
                <div className="login-image">
                    <img className="login-logo"
                        src={Logo}
                        width="150"
                        height="150"
                        alt=""
                    />
                </div>

                <p className="welcome-text"><i className="fas fa-home"></i> Welcome to PeakPulse!</p>

                <div>
                    <form>
                        <div className="mb-3 custom-input">
                            <Input
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    clearErrorMessage();
                                }
                                }
                                placeholder="Username"
                                size="large"
                            />
                        </div>

                        <div className="mb-3 custom-input">
                            <Input
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    clearErrorMessage();
                                }
                                }
                                placeholder="Password"
                                size="large"
                                type="password"
                            />
                        </div>
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        <Button onClick={() => doUserLogIn()} className="form-button" size="large"> Log In </ Button>

                    </form>
                    <h6 className="not-a-member">Not a member? <NavLink className="nav-link" to="/register">Register</NavLink></h6>
                </div>
            </div>

        </div >
    );
}


export default LoginPage;


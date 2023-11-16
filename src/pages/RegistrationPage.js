import React, { useState } from 'react';
import '../styles/index.css';
import Parse from 'parse/dist/parse.min.js';
import { Input } from 'antd';
import Logo from "../assets/images/PeakPulse_white.png"
import image from "../assets/images/climb_cliff.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from 'antd';


export const RegistrationPage = () => {
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('');

    const navigate = useNavigate();

    const doUserRegistration = async function () {
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        const experienceValue = experience;

        try {
            // Create a new Parse Object for your custom class (e.g., UserData)
            const User = Parse.Object.extend("User");
            const user = new User();

            // Set the user attributes
            user.set("username", usernameValue);
            user.set("password", passwordValue);
            user.set("experience", experienceValue);

            // Save the new user data object
            await user.save();
            // Since the signUp method returns a Promise, we need to call it using await
            alert(
                `Success! User ${usernameValue} was successfully created!`
            );
            navigate("/");
            return true;
        } catch (error) {
            // signUp can fail if any parameter is blank or failed an uniqueness check on the server
            alert(`Error! ${error}`);
            return false;
        }
    };

    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', color: 'white' }}>
            <div>
                <div className="logo-welcome">
                    <img
                        src={Logo}
                        alt=""
                        width="150"
                        height="150"
                    />

                    <p className="welcome-text">Join the PeakPulse community!</p>
                </div>
                <div className="register-container">
                    <div className="form_wrapper">
                        <Input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username"
                            size="large"
                            className="form_input"
                        />
                        <Input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                            size="large"
                            type="password"
                            className="form_input"
                        />
                        <label className='proficiency-selector'>
                            Proficiency Level:
                            <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                                <option value=""></option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </label>
                    </div>
                    <Button onClick={() => doUserRegistration()} className="form-button" size="large"> Sign Up </ Button>
                    <h6 className="member-status"> Already a member? <NavLink className="nav-link" to="/login">Login</NavLink></h6>
                </div>
            </div>
        </div>
    );
};


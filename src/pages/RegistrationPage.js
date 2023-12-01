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
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

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

            let profilePictureToSave;
            if (profilePicture) {
                profilePictureToSave = new Parse.File(profilePicture.name, profilePicture);
                await profilePictureToSave.save();
            }

            // Set the user attributes
            user.set("username", usernameValue);
            user.set("password", passwordValue);
            user.set("experience", experienceValue);
            if(profilePictureToSave) user.set("ProfilePicture", profilePictureToSave);

            // Save the new user data object
            await user.signUp();
            //User is logged in after signing up, so data can be accessed
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);

            navigate("/feed");
            return true;
        } catch (error) {
            // signUp can fail if any parameter is blank or failed an uniqueness check on the server
            if (error.message.includes('username')) {
                setErrorMessage('Username is already taken.');
            } else if (error.message.includes('password')) {
                setErrorMessage('The password must be at least 8 characters and contain one number and uppercase letter.');
            } else if (!experienceValue) {
                setErrorMessage('Please select a proficiency level.');
            } else if (profilePicture == null) {
                setErrorMessage('Please upload a profile picture.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
            return false;
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    }

    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', color: 'white' }}>
            <div className='register-container'>
                <div className="logo-welcome">
                    <img
                        src={Logo}
                        alt=""
                        width="160"
                        height="160"
                    />
                    <p className="welcome-text">Join the PeakPulse community!</p>
                </div>
                <div className="register-form-container">
                    <div className='register-input-fields'>
                        <Input
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                clearErrorMessage();
                            }
                            }
                            placeholder="Username"
                            size="large"
                            className="custom-input"
                            style={{ marginTop: '4%' }}
                        />
                        <Input
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                clearErrorMessage();
                            }
                            }
                            placeholder="Password"
                            size="large"
                            type="password"
                            className="custom-input"
                            style={{ marginTop: '4%' }}
                        />
                        <Input
                            type="file"
                            onChange={(event) => {
                                setProfilePicture(event.target.files[0]);
                                clearErrorMessage();
                            }}
                            placeholder="Profile Picture"
                            size="large"
                            className="custom-input"
                            style={{ marginTop: '4%' }}
                        />
                    </div>
                    <label className='proficiency-selector' style={{ marginBottom: '20px' }}>
                        Proficiency Level:
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                            <option value=""></option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="pro">Pro</option>
                        </select>
                    </label>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <Button onClick={() => doUserRegistration()} className="form-button" size="large"> Sign Up </ Button>
                    <h6 className="member-status"> Already a member? <NavLink className="nav-link" to="/">Login</NavLink></h6>
                </div>
            </div>
        </div>
    );
};


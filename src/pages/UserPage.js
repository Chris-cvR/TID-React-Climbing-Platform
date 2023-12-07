import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import ProfilePicture from "../components/common/ProfilePicture";
import Parse from 'parse/dist/parse.min.js';
import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { LocationCardFactory } from "../components/sections/LocationCardFactory";
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

function UserPage() {
    const user = Parse.User.current();
    const [experience, setExperience] = useState(user.get('experience'));
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(user.get('ProfilePicture'));
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];

    const greetingText = "This is your personalized space where you can manage your settings and keep track of all your created posts. This is your hub to revisit, edit, or interact with your content.";

    const userLocationsQuery = new Parse.Query('Location');
    userLocationsQuery.equalTo('UserID', user);

    const handleExperienceChange = async () => {
        user.set('experience', experience);
        await user.save();
        setMessage('Experience successfully updated!');
    };

    const handlePasswordChange = async () => {
        try {
            //this is neccessary the user won't get logout after updating the password
            const checkUser = new Parse.User();
            checkUser.set('username', user.get('username'));
            checkUser.set('password', currentPassword);
            await checkUser.logIn();
        } catch (error) {
            setMessage('Incorrect password.');
            return;
        }

        if (password !== repeatPassword) {
            setMessage('New password and repeated password do not match.');
            return;
        }

        try {
            user.setPassword(password);
            await user.save();
            setMessage('Password successfully updated!');
            setCurrentPassword('');    // Reset currentPassword
            setPassword('');           // Reset password
            setRepeatPassword('');     // Reset repeatPassword
        } catch (error) {
            setMessage('Failed to save user. Please try again later.');
        }
    };

    const handleProfilePictureChange = async () => {
        if(!newProfilePicture){
            setMessage('Please select a file.');
            return;
        }

        try{
            const newPictureFile = new Parse.File(newProfilePicture.name, newProfilePicture);
            await newPictureFile.save();

            user.set('ProfilePicture', newPictureFile);
            await user.save();
            await user.fetch(); //fetch the user again to get the updated profile picture

            setMessage('Profile picture successfully updated!');
            setNewProfilePicture(null); // Reset file input field
            setProfilePicture(user.get('ProfilePicture')); // Update profile picture state
        }catch(error){
            setMessage('Error updating the profile picture');
        }
    }


    const clearMessage = () => {
        setMessage('');
    }

    return (
        <div>
            <Navbar />
            <div className="user-page">
                <div className='user-info-container'>
                    <ProfilePicture size='200px' />
                    <h3 className="greeting-user-page"> Hello {user.get("username")}!</h3>
                    <p className="user-page-greeting">{greetingText}</p>
                            <div>
                                Change proficiency level:
                                <div>
                                    <label className='user-page-selector' style={{ marginBottom: '10px'}}>
                                        <Form.Control as="select" className="proficiency-selector">
                                                value={experience} 
                                                onChange={(e) => setExperience(e.target.value)}
                                            
                                            {proficiencyLevels.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </Form.Control>
                                    </label>
                                </div>
                                <Button type="submit" className="form-button" size="large" onClick={handleExperienceChange}>Save Changes</Button>
                            </div>
                            <div className="change-password-container">
                                Change password:
                                <input className="user-page-input" type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value); clearMessage();}}/>
                                <input className="user-page-input" type="password" placeholder="New Password" value={password} onChange={(e) => {setPassword(e.target.value); clearMessage();}}/>
                                <input className="user-page-input" type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => {setRepeatPassword(e.target.value); clearMessage();}}/>
                                {message && <p className='error-message'>{message}</p>}
                                <Button type="submit" className="form-button" size="large" onClick={handlePasswordChange}>Change Password</Button>
                            </div>
                            <div className="change-profile-picture-container">
                                Change profile picture:
                                <label className="profile-picture-upload">
                                    <input
                                        type="file"
                                        class="profile-picture-file-input"
                                        onChange={(event) => {
                                            setNewProfilePicture(event.target.files[0]);
                                            clearMessage();
                                        }}
                                        />
                                        <FontAwesomeIcon icon={faCamera} />
                                    </label>
                                <Button type="submit" className="form-button change-picture-button" size="large" onClick={handleProfilePictureChange}>Change Profile Picture</Button>
                            </div>
                </div>
                <div className="personlized-feed">
                    <LocationCardFactory parseQuery={userLocationsQuery}/>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default UserPage;
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import Parse from 'parse/dist/parse.min.js';
import React, { useState } from 'react';
import { Button } from 'antd';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function UserPage() {
    const user = Parse.User.current();
    const [experience, setExperience] = useState(user.get('experience'));
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');

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

    const clearMessage = () => {
        setMessage('');
    }

    return (
        <div>
            <Navbar />
            <div className='col user-page-container'>
                <h3> Hello {user.get("username")}!</h3>
                <p>Welcome to your user page.</p>
                    
                        <Form.Group>
                            Change Proficiency Level:
                            <div>
                                <label className='user-page-selector' style={{ marginBottom: '10px', width: '70%'}}>
                                    <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                                        <option value=""></option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="pro">Pro</option>
                                    </select>
                                </label>
                            </div>
                            <Button type="submit" className="form-button" id="change-password-button" size="large" onClick={handleExperienceChange}>Save Changes</Button>
                        </Form.Group>
                        <Form.Group>
                            <FormControl className="custom-input" type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value); clearMessage();}}/>
                            <FormControl className="custom-input" type="password" placeholder="New Password" value={password} onChange={(e) => {setPassword(e.target.value); clearMessage();}}/>
                            <FormControl className="custom-input" type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => {setRepeatPassword(e.target.value); clearMessage();}}/>
                            {message && <p className='error-message'>{message}</p>}
                            <Button type="submit" className="form-button" size="large" onClick={handlePasswordChange}>Change Password</Button>
                        </Form.Group>
                    
            </div>
            <Footer />
        </div>

    );
}

export default UserPage;
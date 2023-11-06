import React, {useState} from 'react';
import Logo from "../assets/images/PeakPulse.png"
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/common/PrimaryButton";

function RegisterPage() {

    const [formData, setFormData] = useState([
        {id: 1, label: 'First Name', type: 'text', value: ''},
        {id: 2, label: 'Last Name', type: 'text', value: ''},
        {id: 3, label: 'Email', type: 'email', value: ''},
        {id: 4, label: 'Password', type: 'password', value: ''},
        {id: 5, label: 'Repeat Password', type: 'password', value: ''},
        {id: 6, label: 'Experience Level', type: 'radio', value: '', options: ['beginner', 'intermediate', 'advanced']},
    ]);

    const handleInputChange = (e, id) => {
        const updateFormData = formData.map((field) =>
        field.id === id ? {...field, value: e.target.value} : field
        );
        setFormData(updateFormData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //code for submitting data to API
    }

    return (
        <div>
            <div className="container w-50 register-form">
                <div className="logo-welcome">
                    <img
                        src={Logo}
                        alt=""
                        width="150"
                        height="150"
                    />

                    <p className="welcome-text">Join the PeakPulse community!</p>
                </div>
                <div className="register">
                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-md-8">
                                {formData.slice(0, 5).map((field) => (
                                <div className="custom-input" key={field.id}>
                                    <input
                                        type={field.type}
                                        className={`input-field ${field.label === 'First Name' || field.label === 'Password' ? 'margin-bottom' : ''}`}
                                        placeholder={field.label}
                                        value={field.value}
                                        onChange={(e) => handleInputChange(e, field.id)}
                                        required
                                    />
                                </div>
                                ))}
                            </div>
                            <div className="col-md-4">
                                <div className="experience-container">
                                <span className="experience-label">{formData[5].label}:</span>
                                {formData[5].options.map((option) => (
                                    <div className="form-checkbox" key={option}>
                                    <input
                                        className="form-checkbox-input"
                                        type="radio"
                                        id={option}
                                        name="experience"
                                        value={option}
                                        checked={formData[5].value === option}
                                        onChange={(e) => handleInputChange(e, formData[5].id)}
                                    />
                                    <label className="form-checkbox-label" htmlFor={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </label>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div class="text-center mt-3">
                            <PrimaryButton Text="Register" />
                        </div>
                        <h6 className='memberStatus'>Already a member?<NavLink className="nav-link" to="/login">Login</NavLink> </h6>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;
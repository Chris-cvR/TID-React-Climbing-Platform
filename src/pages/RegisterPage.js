import Logo from "../assets/images/PeakPulse.png"
import { NavLink } from "react-router-dom";

function RegisterPage() {

    return (
        <div>
            <div className="container w-50 mt-5 register-form">
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
                    <form>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="custom-input">

                                    <input type="name" className="input-field" id="exampleInputFirstName" placeholder="First Name*" />
                                </div>

                                <div className="custom-input">
                                    <input type="name" className="input-field" id="exampleInputLastName" placeholder="Last Name*" />
                                </div>

                                <div className="custom-input">
                                    <input type="name" className="input-field" id="exampleInputEmail" placeholder="E-Mail*" />
                                </div>

                                <div className="custom-input">
                                    <input type="name" className="input-field" id="exampleInputPassword2" placeholder="Password*" />
                                </div>

                                <div className="custom-input">
                                    <input type="name" className="input-field" id="exampleInputPassword2" placeholder="Repeat Password*" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="experience-container">
                                    <span className="experience-label">Choose your experience level*:</span>
                                    <div className="form-checkbox">
                                        <input className="form-checkbox-input" type="radio" id="beginner" name="experience" value="beginner" />
                                        <label className="form-checkbox-label" for="beginner">Beginner</label>
                                    </div>
                                    <div className="form-checkbox">
                                        <input className="form-checkbox-input" type="radio" id="intermediate" name="experience" value="intermediate" />
                                        <label className="form-checkbox-label" for="intermediate">Intermediate</label>
                                    </div>
                                    <div className="form-checkbox">
                                        <input className="form-checkbox-input" type="radio" id="advanced" name="experience" value="advanced" />
                                        <label className="form-checkbox-label" for="advanced">Advanced</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" className="btn btn-primary custom-button">Register</button>
                        </div>
                        <h6>Already a member? <NavLink className="nav-link" to="/login">Login</NavLink> </h6>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;
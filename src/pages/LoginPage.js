import { NavLink } from "react-router-dom";
import Logo from "../assets/images/PeakPulse.png";

function LoginPage() {

    return (
        <>
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
                            <input type="text" className="form-control" id="exampleInputEmail" placeholder="E-Mail" />
                        </div>

                        <div className="mb-3 custom-input">
                            <input type="text" className="form-control" id="exampleInputPassword" placeholder="Password" />
                        </div>

                        <button type="Login" className="btn btn-primary custom-button">Login</button>
                    </form>
                    <h6 className="NotAMember">Not a member? <NavLink className="nav-link" to="/register">Register!</NavLink></h6>
                </div>
            </div>

        </>
    );
}

export default LoginPage;


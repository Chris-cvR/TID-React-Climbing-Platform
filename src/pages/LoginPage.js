import Logo from "../assets/images/PeakPulse.png"

function LoginPage() {

    const PeakPulseLogo = Logo;

    return (
        <div>
            <img
                src={PeakPulseLogo}
                alt=""
                width="100"
                height="100"
            />
        </div>
    );
}

export default LoginPage;


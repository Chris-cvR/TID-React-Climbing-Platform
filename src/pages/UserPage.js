import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"

function UserPage() {

    return (
        <div>
            <Navbar />
            <div className='page-container'>
                <p> Hello User!</p>
            </div>
            <Footer />
        </div>

    );
}

export default UserPage;
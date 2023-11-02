import NavBar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import DetailedLocationCard from "../components/common/DetailedLocationCard"


function LocationPage() {

    return (
        <div>
            <NavBar></NavBar>
            <DetailedLocationCard></DetailedLocationCard>
            <Footer></Footer>
        </div>
    );
}

export default LocationPage;
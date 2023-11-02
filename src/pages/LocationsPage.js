import DetailedLocationCard from "../components/common/DetailedLocationCard"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"


function LocationPage() {

    return (
        <div>
            <Navbar />
            <DetailedLocationCard></DetailedLocationCard>
            <Footer />
        </div>
    );
}

export default LocationPage;
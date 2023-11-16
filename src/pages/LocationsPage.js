import DetailedLocationCard from "../components/common/DetailedLocationCard"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import Comment from '../components/common/Comment'


function LocationPage() {

    return (
        <div>
            <Navbar />
            <DetailedLocationCard></DetailedLocationCard>
            <Comment />
            <Footer />
        </div>
    );
}

export default LocationPage;
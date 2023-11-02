import LocationCard from "../components/common/LocationCard";
import picture1 from "../assets/images/Blocs&Walls.jpg";
import picture2 from "../assets/images/cphBoulders.jpg";
import Sidebar from "../components/sections/Sidebar"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"


function FeedPage() {
    return (
        <div>
            <Navbar />
            <Sidebar></Sidebar>
            <LocationCard picture={picture1} Title={"Blocs & Walls"}></LocationCard>
            <LocationCard picture={picture2} Title={"Copenhagen Boulders"}></LocationCard>
            <Footer />
        </div>

    );
}

export default FeedPage;
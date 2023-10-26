import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer";
import LocationCard from "../components/common/LocationCard";
import Sidebar from "../components/sections/Sidebar";
import picture1 from "../assets/images/Blocs&Walls.jpg";
import picture2 from "../assets/images/cphBoulders.jpg";


function FeedPage() {
    return (
        <>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div>
                <LocationCard picture={picture1} Title={"Blocs & Walls"}></LocationCard>
                <LocationCard picture={picture2} Title={"Copenhagen Boulders"}></LocationCard>
            </div>
            <Footer></Footer>
        </>
    );
}

export default FeedPage;
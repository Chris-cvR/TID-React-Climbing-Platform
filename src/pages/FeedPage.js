import LocationCard from "../components/common/LocationCard";
import picture1 from "../assets/images/Blocs&Walls.jpg";
import picture2 from "../assets/images/cphBoulders.jpg";
import Sidebar from "../components/sections/Sidebar"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import React, { useState } from 'react';
import CreateLocation from "../components/common/CreateLocation";

function FeedPage() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar />
            <div className="main-wrapper">
            <Sidebar handleShow={handleShow} />
            <CreateLocation show={show} handleClose={handleClose} />
            <div className="feed">
            <LocationCard picture={picture1} Title={"Blocs & Walls"}></LocationCard>
            <LocationCard picture={picture2} Title={"Copenhagen Boulders"}></LocationCard>
            </div>
            </div>
            <Footer />
        </div>

    );
}

export default FeedPage;
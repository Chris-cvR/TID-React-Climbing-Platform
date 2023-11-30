import { LocationCardFactory } from "../components/sections/LocationCardFactory";
import Sidebar from "../components/sections/Sidebar"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import React, { useState } from 'react';
import CreateLocation from "../components/common/CreateLocation";
import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from 'react-router-dom';

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
                <LocationCardFactory />
            </div>
            <Footer />
        </div>

    );
}

export default FeedPage;
import LocationCard from "../components/common/LocationCard";
import picture1 from "../assets/images/Blocs&Walls.jpg";
import picture2 from "../assets/images/cphBoulders.jpg";
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

    const navigate = useNavigate();

    const logout = () => {
        Parse.User.logOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.errror('Failed to log out, with error: ', error);
        });
    }

    return (
        <div>
            <Navbar logout={logout}/>
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
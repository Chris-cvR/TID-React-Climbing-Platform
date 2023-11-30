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
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCountryChange = (values) => {
        setSelectedCountries(values);
    };

    const handleTypeChange = (values) => {
        setSelectedTypes(values);
    };

    return (
        <div>
            <Navbar logout={logout} />
            <div className="main-wrapper">
                <Sidebar handleShow={handleShow} onCountryChange={handleCountryChange} onTypeChange={handleTypeChange} />
                <CreateLocation show={show} handleClose={handleClose} />
                <LocationCardFactory selectedCountries={selectedCountries} selectedTypes={selectedTypes} />
            </div>
            <Footer />
        </div>

    );
}

export default FeedPage;
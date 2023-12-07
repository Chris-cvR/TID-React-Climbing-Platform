import React, { useState } from 'react';
import { LocationCardFactory } from "../components/sections/LocationCardFactory";
import Sidebar from "../components/sections/Sidebar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CreateLocation from "../components/common/CreateLocation";
import Parse from 'parse/dist/parse.min.js';

function FeedPage() {
    const [show, setShow] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('None');
    const [selectedType, setSelectedType] = useState('None');
    const [selectedDifficulty, setSelectedDifficulty] = useState('None');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCountryChange = (selectedValue) => {
        setSelectedCountry(selectedValue);
    };

    const handleTypeChange = (selectedValue) => {
        setSelectedType(selectedValue);
    };

    const handleDifficultyChange = (selectedValue) => {
        setSelectedDifficulty(selectedValue);
    };

    const allLocationsQuery = new Parse.Query('Location');

    return (
        <div>
            <Navbar />
            <div className="main-wrapper">
                <Sidebar
                    handleShow={handleShow}
                    onCountryChange={handleCountryChange}
                    onTypeChange={handleTypeChange}
                    onDifficultyChange={handleDifficultyChange}
                />
                <CreateLocation show={show} handleClose={handleClose} />
                <LocationCardFactory
                    parseQuery={allLocationsQuery}
                    selectedCountry={selectedCountry}
                    selectedType={selectedType}
                    selectedDifficulty={selectedDifficulty}
                />
            </div>
            <Footer />
        </div>
    );
}

export default FeedPage;

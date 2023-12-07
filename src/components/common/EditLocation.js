import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import LocationModal from './LocationModal';

const EditLocation = ({ show, handleClose, locationId }) => {
    const [formData, setFormData] = useState([]);
    const [inputError, setInputError] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Fetch location data using locationId on component mount
    useEffect(() => {
        // Fetch location data using Parse
        // Update formData state with fetched data
        async function fetchLocationData() {
            try {
                const Location = Parse.Object.extend('Location');
                const query = new Parse.Query(Location);
                const location = await query.get(locationId);

                // Extract location data and update the formData state
                setFormData([
                    { id: 1, label: 'Title', type: 'text', value: location.get('Name'), required: true },
                    { id: 2, label: 'Latitude', type: 'number', value: location.get('Latitude'), required: true },
                    { id: 3, label: 'Longitude', type: 'number', value: location.get('Longitude'), required: true },
                    { id: 4, label: 'Country', type: 'text', value: location.get('Country'), required: true },
                    { id: 5, label: 'Type', type: 'checkbox', value: location.get('Type'), options: ['Alpine', 'Boulder', 'Cliff', 'Freeclimb', 'Gym', 'Horizontal', 'Ice', 'Indoor', 'Lead', 'Outdoor', 'Speedclimb', 'Sport', 'Urban'], required: true },
                    { id: 6, label: 'Difficulty', type: 'text', value: location.get('Difficulty'), required: true },
                    { id: 7, label: 'Description', type: 'text', value: location.get('Description'), required: true, textarea: true },
                    { id: 8, label: 'Picture', type: 'file', value: location.get('Picture'), required: true },
                ]);
            } catch (error) {
                console.error('Error fetching location data:', error);
                // Handle error accordingly
            }
        }

        fetchLocationData();
    }, [locationId]);

    const handleInputChange = (label, value) => {
        // Find the index of the item being updated
        const updatedIndex = formData.findIndex(item => item.label === label);
        const updatedFormData = [...formData];

        // Update the value of the specific item in the copied array
        updatedFormData[updatedIndex] = { ...updatedFormData[updatedIndex], value };

        setFormData(updatedFormData);
        setInputError(false); //clears error message when user starts typing
    };


    const valueFor = (label) => {
        const item = formData.find(item => item.label === label);
        return item ? item.value : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAnyFieldEmpty = formData.some(item => item.type !== 'file' && (item.value === '' || item.value === null));
        const isFileUploaded = formData.some(item => item.type === 'file' && item.value);

        if (isAnyFieldEmpty || !isFileUploaded) {
            setInputError(true);
            return;
        }

        const Location = Parse.Object.extend('Location');
        const newLocation = new Location();

        const countryValue = valueFor("Country");
        const formattedCountry = countryValue && countryValue.trim() !== ""
            ? countryValue.trim().charAt(0).toUpperCase() + countryValue.slice(1).toLowerCase()
            : "";

        console.log("Formatted Country:", formattedCountry);

        const difficultyValue = valueFor("Difficulty");
        const formattedDifficulty = difficultyValue && difficultyValue.trim() !== ""
            ? difficultyValue.trim().charAt(0).toUpperCase() + difficultyValue.slice(1).toLowerCase()
            : "";

        console.log("Formatted Difficulty", formattedDifficulty);

        const imageFile = valueFor("Picture");
        const reader = new FileReader();

        reader.onloadend = async function () {
            const dataUri = reader.result;
            const imageFileName = imageFile.name;

            try {
                const parseFile = new Parse.File(imageFileName, { base64: dataUri });
                const savedFile = await parseFile.save();

                newLocation.set("Name", valueFor("Title"));
                newLocation.set("Latitude", Number(valueFor("Latitude")));
                newLocation.set("Longitude", Number(valueFor("Longitude")));
                newLocation.set("Type", valueFor("Type"));
                newLocation.set("Description", valueFor("Description"));
                newLocation.set("Picture", savedFile);

                var Countries = Parse.Object.extend("Countries");
                var query = new Parse.Query(Countries);

                var Difficulty = Parse.Object.extend("Difficulty");
                var querydifficulty = new Parse.Query(Difficulty);

                query.equalTo("Country", formattedCountry);
                querydifficulty.equalTo("Difficulty", formattedDifficulty);

                const country = await query.first();
                if (!country) {
                    const newCountry = new Countries();
                    newCountry.set("Country", formattedCountry);
                    await newCountry.save();
                    newLocation.set("Country", newCountry);
                } else {
                    newLocation.set("Country", country);
                }

                const difficulty = await querydifficulty.first();
                if (!difficulty) {
                    const newDifficulty = new Difficulty();
                    newDifficulty.set("Difficulty", formattedDifficulty);
                    await newDifficulty.save();
                    newLocation.set("Difficulty", newDifficulty);
                } else {
                    newLocation.set("Difficulty", difficulty);
                }

                let loggedInUser = Parse.User.current();
                if (loggedInUser) {
                    newLocation.set("UserID", loggedInUser);
                } else {
                    console.log("No user logged in");
                }

                await newLocation.save();

                setSuccessMessage('Location created successfully!');
                setShowSuccessMessage(true);

                setFormData([
                    { id: 1, label: 'Title', type: 'text', value: '' },
                    { id: 2, label: 'Latitude', type: 'number', value: '' },
                    { id: 3, label: 'Longitude', type: 'number', value: '' },
                    { id: 4, label: 'Country', type: 'text', value: '' },
                    { id: 5, label: 'Type', type: 'checkbox', value: '', options: ['Alpine', 'Boulder', 'Cliff', 'Freeclimb', 'Gym', 'Horizontal', 'Ice', 'Indoor', 'Lead', 'Outdoor', 'Speedclimb', 'Sport', 'Urban'] },
                    { id: 6, label: 'Difficulty', type: 'text', value: '' },
                    { id: 7, label: 'Description', type: 'text', value: '' },
                    { id: 8, label: 'Picture', type: 'file', value: null },
                ]);

                setTimeout(() => {
                    window.location.reload();
                    setShowSuccessMessage(false);
                }, 2000);
            } catch (error) {
                console.error('Error while creating Location: ', error);
            }
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        reader.readAsDataURL(imageFile);
    };

    return (
        <>
            <LocationModal
                show={show}
                handleClose={handleClose}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                inputError={inputError}
                successMessage={successMessage}
                showSuccessMessage={showSuccessMessage}
                title="Edit Location"
            />
        </>
    );
};

export default EditLocation;

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
                query.include('Country');
                query.include('Difficulty');
                const location = await query.get(locationId);
                const pictureFile = location.get('Picture');
                let pictureUrl = '';
                if (pictureFile) {
                    pictureUrl = pictureFile.url();
                }
                // Extract location data and update the formData state
                setFormData([
                    { id: 1, label: 'Name', type: 'text', value: location.get('Name'), required: true },
                    { id: 2, label: 'Latitude', type: 'number', value: location.get('Latitude'), required: true  },
                    { id: 3, label: 'Longitude', type: 'number', value: location.get('Longitude'), required: true  },
                    { id: 4, label: 'Country', type: 'text', value: location.get('Country').get('Country'), required: true  },
                    { id: 5, label: 'Type', type: 'checkbox', value: location.get('Type'), options: ['Alpine', 'Boulder', 'Cliff', 'Freeclimb', 'Gym', 'Horizontal', 'Ice', 'Indoor', 'Lead', 'Outdoor', 'Speedclimb', 'Sport', 'Urban'], required: true  },
                    { id: 6, label: 'Difficulty', type: 'text', value: location.get('Difficulty').get('Difficulty'), required: true  },
                    { id: 7, label: 'Description', type: 'text', value: location.get('Description'), required: true, textarea: true  },
                    { id: 8, label: 'Picture', type: 'file', value: pictureUrl, required: true  },
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
    
    const handleSubmit = async (event) => {
    event.preventDefault();
       
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

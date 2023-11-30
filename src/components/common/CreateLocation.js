import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from 'antd';
import Parse from 'parse/dist/parse.min.js';

const CreateLocation = ({ show, handleClose }) => {
    const [formData, setFormData] = useState([
        { id: 1, label: 'Title', type: 'text', value: '' },
        { id: 2, label: 'Latitude', type: 'number', value: '' },
        { id: 3, label: 'Longitude', type: 'number', value: '' },
        { id: 4, label: 'Country', type: 'text', value: '' },
        { id: 5, label: 'Type', type: 'checkbox', value: '', options: ['Alpine', 'Boulder', 'Cliff', 'Freeclimb', 'Gym', 'Horizontal', 'Ice', 'Indoor', 'Lead', 'Outdoor', 'Speedclimb', 'Sport', 'Urban'] },
        { id: 6, label: 'Difficulty', type: 'text', value: '' },
        { id: 7, label: 'Description', type: 'text', value: '' },
        { id: 8, label: 'Picture', type: 'file', value: null },
    ]);

    const [inputError, setInputError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    function valueFor(label) {
        const field = formData.find(item => item.label === label);
        return field ? field.value : undefined;
    }

    const handleInputChange = (id, e) => {
        let value = id === 8 ? e.target.files[0] : e.target.value;

        const updatedFormData = formData.map(item =>
            item.id === id ? { ...item, value: value } : item
        );

        setFormData(updatedFormData);
    };

    const handleCloseModal = () => {
        setInputError(false);
        setShowSuccessMessage(false);
        handleClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAnyFieldEmpty = formData.some(item => item.type !== 'file' && (item.value === '' || item.value === null));

        if (isAnyFieldEmpty) {
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
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_1">
                                <Form.Label>Title*</Form.Label>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    value={valueFor("Title")}
                                    onChange={(e) => handleInputChange(1, e)}
                                />
                            </Form.Group>
                        </div>
                        <div className='container-fluid mt-2'>
                            <div className="row">
                                <div className="col">
                                    <Form.Group controlId="formControl_2">
                                        <Form.Label>Latitude*</Form.Label>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Latitude"
                                            value={valueFor("Latitude")}
                                            onChange={(e) => handleInputChange(2, e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formControl_3">
                                        <Form.Label>Longitude*</Form.Label>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Longitude"
                                            value={valueFor("Longitude")}
                                            onChange={(e) => handleInputChange(3, e)}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="col">
                                    <Form.Group controlId="formControl_4">
                                        <Form.Label>Country*</Form.Label>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Country"
                                            value={valueFor("Country")}
                                            onChange={(e) => handleInputChange(4, e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formControl_5">
                                        <Form.Label>Type*</Form.Label>
                                        <Form.Select onChange={(e) => handleInputChange(5, e)}>
                                            <option value=""></option>
                                            {formData.find(item => item.label === "Type").options.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col">
                                    <Form.Group controlId="formControl_6">
                                        <Form.Label>Difficulty*</Form.Label>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Difficulty"
                                            value={valueFor("Difficulty")}
                                            onChange={(e) => handleInputChange(6, e)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_7">
                                <Form.Label>Description*</Form.Label>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    value={valueFor("Description")}
                                    onChange={(e) => handleInputChange(7, e)}
                                />
                            </Form.Group>
                        </div>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_8">
                                <Form.Label>Image*</Form.Label>
                                <FormControl
                                    type="file"
                                    onChange={(e) => handleInputChange(8, e)}
                                />
                            </Form.Group>
                        </div>

                        {inputError && (
                            <div className="row w-100 text-danger">
                                Please provide input for all fields marked with a *
                            </div>
                        )}

                        {showSuccessMessage && (
                            <div className="row w-100 text-success">
                                {successMessage}
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="container">
                        <div className="row w-100">
                            <div className="col">
                                <Button className="form-button-secondary" size="large" onClick={handleCloseModal}> Cancel </Button>
                            </div>
                            <div className="col">
                                <Button type='submit' onClick={handleSubmit} className="form-button" size="large"> Save Changes </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateLocation;

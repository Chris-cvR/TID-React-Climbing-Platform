import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import SecondaryButton from './SecondaryButton';
import { Button } from 'antd';
import Parse from 'parse/dist/parse.min.js';

const CreateLocation = ({ show, handleClose }) => {
    const [formData, setFormData] = useState([
        { id: 1, label: 'Title', type: 'text', value: '' },
        { id: 2, label: 'Latitude', type: 'number', value: '' },
        { id: 3, label: 'Longitude', type: 'number', value: '' },
        { id: 4, label: 'Country', type: 'text', value: '' },
        { id: 5, label: 'Type', type: 'checkbox', value: '', options: ['Alpine', 'Boulder', 'Cliff', 'Freeclimb', 'Gym', 'Horizontal', 'Ice', 'Indoor', 'Lead', 'Outdoor', 'Speedclimb', 'Sport', 'Urban'] },
        { id: 6, label: 'Difficulty', type: 'radio', value: '', options: ['Beginner', 'Intermediate', 'Advanced'] },
        { id: 7, label: 'Description', type: 'text', value: '' },
        { id: 8, label: 'Picture', type: 'file', value: null },
    ]);


    function valueFor(label) {
        const field = formData.find(item => item.label === label);
        return field ? field.value : undefined;
    };

    const handleInputChange = (id, e) => {
        const value = id === 8 ? e.target.files[0] : e.target.value;
        const updatedFormData = formData.map(item =>
            item.id === id ? { ...item, value: value } : item
        );
        setFormData(updatedFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //code for submitting data to API
        const Location = Parse.Object.extend("Location");
        const newLocation = new Location();

        const imageFile = valueFor("Picture");
        const reader = new FileReader();

        reader.onloadend = function () {
            const dataUri = reader.result;
            const imageFileName = imageFile.name;

            let parseFile = new Parse.File(imageFileName, { base64: dataUri });

            parseFile.save().then(savedFile => {

                newLocation.set("Name", valueFor("Title"));
                newLocation.set("Latitude", Number(valueFor("Latitude")));
                newLocation.set("Longitude", Number(valueFor("Longitude")));
                newLocation.set("Type", valueFor("Type"));
                newLocation.set("Difficulty", valueFor("Difficulty"));
                newLocation.set("Description", valueFor("Description"));
                newLocation.set("Picture", savedFile);

                // Assume that "Countries" class has an object with objectId equals to the CountryID
                var Countries = Parse.Object.extend("Countries");
                var query = new Parse.Query(Countries);

                query.equalTo("Country", valueFor("Country")); // first "Countyr" is the column in the Countries table
                query.first().then((country) => {
                    if (!country) {
                        // Country doesn't exist. Create a new one.
                        country = new Countries();
                        country.set("Country", valueFor("Country"));
                        return country.save();
                    } else {
                        // Country already exists, do nothing.
                        return country;
                    }
                }).then((country) => {
                    // Now, country is either the existing country, or a new one created above. 

                    newLocation.set("Country", country); // Set pointer to Country object

                    let loggedInUser = Parse.User.current();
                    if (loggedInUser) {
                        newLocation.set("UserID", loggedInUser);
                    } else {
                        console.log("No user logged in")
                    }

                    newLocation.save().then(
                        (result) => {
                            if (typeof document !== 'undefined') console.log(`Location created succesfully: ${JSON.stringify(result)}`);
                        },
                        (error) => {
                            if (typeof document !== 'undefined') console.log(`Error while creating Location: ${JSON.stringify(error)}`);
                        }
                    );
                }).catch(error => {
                    console.error('Error while saving file: ', error);
                });
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        reader.readAsDataURL(imageFile);

        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_1">
                                <Form.Label>Title</Form.Label>
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
                                        <Form.Label>Latitude</Form.Label>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Latitude"
                                            value={valueFor("Latitude")}
                                            onChange={(e) => handleInputChange(2, e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formControl_3">
                                        <Form.Label>Longitude</Form.Label>
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
                                        <Form.Label>Country</Form.Label>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Country"
                                            value={valueFor("Country")}
                                            onChange={(e) => handleInputChange(4, e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formControl_5">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select onChange={(e) => handleInputChange(5, e)}>
                                            {formData.find(item => item.label === "Type").options.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col border rounded margin-12">
                                    <Form.Group controlId="formControl_6">
                                        <Form.Label>Difficulty</Form.Label>
                                        {formData.find(item => item.label === "Difficulty").options.map(option => (
                                            <Form.Check
                                                id="radio-button"
                                                type="radio"
                                                label={option}
                                                key={option}
                                                name="radioGroup_5"
                                                value={option}
                                                onChange={(e) => handleInputChange(6, e)}
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_7">
                                <Form.Label>Description</Form.Label>
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
                                <Form.Label>Picture</Form.Label>
                                <FormControl
                                    type="file"
                                    onChange={(e) => handleInputChange(8, e)}
                                />
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="container">
                        <div className="row w-100">
                            <div className="col">
                                <SecondaryButton Text={"Cancel"} onClick={handleClose}></SecondaryButton>
                            </div>
                            <div className="col">
                                <Button type='submit' onClick={handleSubmit} className="form-button" size="large">Save Changes </ Button>

                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateLocation;

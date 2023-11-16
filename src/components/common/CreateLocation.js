import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import SecondaryButton from './SecondaryButton';
import { Button } from 'antd';

const CreateLocation = ({ show, handleClose }) => {
    const [formData, setFormData] = useState([
        { id: 1, label: 'Title', type: 'text', value: '' },
        { id: 2, label: 'Latitude', type: 'number', value: '' },
        { id: 3, label: 'Longitude', type: 'number', value: '' },
        { id: 4, label: 'Type', type: 'checkbox', value: '', options: ['Gym-Lead', 'Outdoor-Boulder', 'Gym-Boulder'] },
        { id: 5, label: 'Experience Level', type: 'radio', value: '', options: ['Beginner', 'Intermediate', 'Advanced'] },
        { id: 6, label: 'Description', type: 'text', value: '' },
        { id: 7, label: 'Picture', type: 'file', value: '' },
    ]);

    const handleInputChange = (id, e) => {
        const updatedFormData = formData.map(item =>
            item.id === id ? { ...item, value: e.target.value } : item
        );
        setFormData(updatedFormData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //code for submitting data to API
    }

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
                                    value={formData[0].value}
                                    onChange={(e) => handleInputChange(1, e)}
                                />
                            </Form.Group>
                        </div>
                        <div className='container mt-2'>
                            <div className="row w-100">
                                <div className="col-md-4">
                                    <Form.Group controlId="formControl_2">
                                        <Form.Label>Latitude</Form.Label>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Latitude"
                                            value={formData[1].value}
                                            onChange={(e) => handleInputChange(2, e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formControl_3">
                                        <Form.Label>Longitude</Form.Label>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Longitude"
                                            value={formData[2].value}
                                            onChange={(e) => handleInputChange(3, e)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 border rounded">
                                    <Form.Group controlId="formControl_4">
                                        <Form.Label>Type</Form.Label>
                                        {formData[3].options.map(option => (
                                            <Form.Check
                                                type="checkbox"
                                                label={option}
                                                key={option}
                                                onChange={(e) => handleInputChange(4, e)}
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 border rounded">
                                    <Form.Group controlId="formControl_5">
                                        <Form.Label>Experience Level</Form.Label>
                                        {formData[4].options.map(option => (
                                            <Form.Check
                                                type="radio"
                                                label={option}
                                                key={option}
                                                name="radioGroup_5"
                                                value={option}
                                                onChange={(e) => handleInputChange(5, e)}
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100">
                            <Form.Group controlId="formControl_6">
                                <Form.Label>Description</Form.Label>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    value={formData[5].value}
                                    onChange={(e) => handleInputChange(6, e)}
                                />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <Form.Group controlId="formControl_7">
                                    <Form.Label>Picture</Form.Label>
                                    <FormControl
                                        type="file"
                                        onChange={(e) => handleInputChange(7, e)}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='container'>
                        <div className="row">
                            <div className="col">
                                <SecondaryButton Text={"Cancel"} onClick={handleClose}></SecondaryButton>
                            </div>
                            <div className="col">
                                <Button type='submit' onClick={handleClose} className="form-button" size="large"> Save Changes </ Button>

                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateLocation;

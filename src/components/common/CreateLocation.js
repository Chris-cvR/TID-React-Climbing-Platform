import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from "../common/PrimaryButton";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import SecondaryButton from './SecondaryButton';

const CreateLocation = ({ show, handleClose }) => {
    const [formData, setFormData] = useState([
        {id: 1, label: 'Latitude', type: 'number', value: ''},
        {id: 2, label: 'Longitude', type: 'number', value: ''},
        {id: 3, label: 'Title', type: 'text', value: ''},
        {id: 4, label: 'Experience Level', type: 'radio', value: '', options: ['Beginner', 'Intermediate', 'Advanced']},
        {id: 5, label: 'Description', type: 'text', value: ''},
        {id: 6, label: 'Type', type: 'checkbox', value: '', options: ['Gym-Lead', 'Outdoor-Boulder', 'Gym-Boulder']},
        {id: 7, label: 'Picture', type: 'file', value: ''},
    ]);

    const handleInputChange = (id, e) => {
        const updatedFormData = formData.map(item => 
            item.id === id ? {...item, value: e.target.value} : item
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
                <div className="row">
                        <div className="col-md-4">
                            {formData.slice(0, 3).map(item => (
                            <Form.Group controlId={`formControl_${item.id}`} key={item.id}>
                                <Form.Label>{item.label}</Form.Label>
                                <FormControl
                                type={item.type}
                                placeholder={`Enter ${item.label}`}
                                value={item.value}
                                onChange={(e) => handleInputChange(item.id, e)}
                                />
                            </Form.Group>
                            ))}
                        </div>
                        <div className="col-md-4">
                            {formData.slice(3, 5).map(item => (
                            <Form.Group controlId={`formControl_${item.id}`} key={item.id}>
                                <Form.Label>{item.label}</Form.Label>
                                {item.type === 'radio' ? (
                                item.options.map(option => (
                                    <Form.Check 
                                    type="radio" 
                                    label={option} 
                                    key={option}
                                    name={`radioGroup_${item.id}`}
                                    value={option}
                                    onChange={(e) => handleInputChange(item.id, e)}
                                    />
                                ))
                                ) : (
                                <FormControl
                                    type={item.type}
                                    placeholder={`Enter ${item.label}`}
                                    value={item.value}
                                    onChange={(e) => handleInputChange(item.id, e)}
                                />
                                )}
                            </Form.Group>
                            ))}
                        </div>
                        <div className="col-md-4">
                            {formData.slice(5, 7).map(item => (
                            <Form.Group controlId={`formControl_${item.id}`} key={item.id}>
                                <Form.Label>{item.label}</Form.Label>
                                {item.type === 'checkbox' ? (
                                item.options.map(option => (
                                    <Form.Check 
                                    type="checkbox" 
                                    label={option} 
                                    key={option}
                                    onChange={(e) => handleInputChange(item.id, e)}
                                    />
                                ))
                                ) : item.type === 'file' ? (
                                <FormControl 
                                    type="file" 
                                    onChange={(e) => handleInputChange(item.id, e)}
                                />
                                ) : (
                                <FormControl
                                    type={item.type}
                                    placeholder={`Enter ${item.label}`}
                                    value={item.value}
                                    onChange={(e) => handleInputChange(item.id, e)}
                                />
                                )}
                            </Form.Group>
                            ))}
                        </div>
                    </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <div className="row">
                <PrimaryButton type='submit' Text={"Save Changes"} onClick={handleClose}></PrimaryButton>
                <SecondaryButton Text={"Cancel"} onClick={handleClose}></SecondaryButton>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateLocation;

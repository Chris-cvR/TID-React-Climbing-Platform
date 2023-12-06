import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'antd';
import FormControl from 'react-bootstrap/FormControl';

const LocationModal = ({
  show,
  handleClose,
  formData,
  handleInputChange,
  handleSubmit,
  inputError,
  successMessage,
  showSuccessMessage
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* form fields */}
          {formData.map((item) => (
            <div className="row w-100" key={item.id}>
              <Form.Group controlId={`formControl_${item.id}`}>
                <Form.Label>{item.label}{item.type === 'file' ? '*' : ''}</Form.Label>
                {item.type !== 'checkbox' && item.type !== 'file' ? (
                  <FormControl
                    type={item.type}
                    placeholder={`Enter ${item.label}`}
                    value={item.value}
                    onChange={(e) => handleInputChange(item.label, e.target.value)}
                  />
                ) : item.type === 'file' ? (
                  <FormControl
                    type={item.type}
                    onChange={(e) => handleInputChange(item.label, e.target.files[0])}
                  />
                ) : (
                  <Form.Select onChange={(e) => handleInputChange(item.label, e.target.value)}>
                    <option value=""></option>
                    {item.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </div>
          ))}
          {/* Display input errors or success message */}
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
              <Button className="form-button-secondary" size="large" onClick={handleClose}> Cancel </Button>
            </div>
            <div className="col">
              <Button type='submit' onClick={handleSubmit} className="form-button" size="large"> Save Changes </Button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
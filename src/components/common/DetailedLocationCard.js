import React from 'react';
import { Card } from 'react-bootstrap';
import LikeFunctionality from './LikeFunctionality';
import { Button } from 'antd';

function DetailedLocationCard({ locationPicture, locationLatitude, locationLongitude, locationType, locationName, locationCountry, locationDetails, locationID, userID, currentUserID, handleShow }) {

    return (
        <Card className=" detailed-card-style">
            <Card.Body className="d-flex">
                {/* Left side with the image */}
                <div className="mr-5">
                    <Card.Img className="crop-image detailed-location-image" src={locationPicture} />
                    <div className="detailed-flex-container">
                        <div className="detailed-content">
                            <h8>Coordinates</h8>
                            <div className="detailed-text-container">
                                <div className="coordinate-container">
                                    <p><b>Latitude:</b></p>
                                    <span className="coordinate-value">{locationLatitude}</span>
                                </div>
                            </div>

                            <div className="detailed-text-container">
                                <div className="coordinate-container">
                                    <p><b>Longitude:</b></p>
                                    <span className="coordinate-value">{locationLongitude}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="detailed-content">
                                <div className='col'><h8>Type</h8></div>
                                <div className="col detailed-text-container">
                                    {locationType}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider (thin black line) */}
                <div className="divider"></div>

                {/* Right side with text information */}
                <div>
                    <div className="row detailed-location-info">
                        <div className="col-auto .mr-auto detailed-likes-content">
                            <LikeFunctionality id={locationID} />
                        </div>
                        <div className="col detailed-location-title">
                            <Card.Title className="col float-start detailed-truncate-text">{locationName}</Card.Title>
                        </div>
                        <div className="col detailed-location-place">
                            <Card.Subtitle className="col float-end location-country"><b>{locationCountry}</b></Card.Subtitle>
                        </div>
                    </div>

                    <div className='detailed-text'>
                        {locationDetails}
                    </div>
                    <div className='edit-location-button'>
	                    {JSON.stringify(userID) === JSON.stringify(currentUserID) && <Button onClick={handleShow} className="form-button" size="large"> Edit </Button>}
	                </div>
                    <div className="detailed-flex-container2">

                    </div>
                </div>
            </Card.Body>
        </Card>

    );
};

export default DetailedLocationCard;


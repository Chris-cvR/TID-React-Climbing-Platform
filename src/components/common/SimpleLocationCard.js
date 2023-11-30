import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Card from 'react-bootstrap/Card';
import '../../styles/index.css';
import LikeFunctionality from '../common/LikeFunctionality';

function SimpleLocationCard({ locationURL, locationPicture, locationID, locationName, locationCountry, locationType }) {

    return (
        <Card className="custom-card mx-auto">
            <Link to={locationURL}>
                <Card.Img className="card-img-custom crop-image" src={locationPicture} />
            </Link>
            <Card.Body>
                <div className="d-flex align-items-top">
                    <div className="likes-container">
                        <div className="center-likes">
                            <LikeFunctionality id={locationID} />
                        </div>
                    </div>
                    <div className="location-details">
                        <div className="location-title">
                            <Card.Title className="truncate-text">
                                <Link to={locationURL} className="card-title-link">
                                    {locationName}
                                </Link>
                            </Card.Title>
                        </div>
                        <div className="location-place">
                            <Card.Subtitle className="location-country">
                                <b>{locationCountry}</b>
                            </Card.Subtitle>
                        </div>
                    </div>
                </div>
                <div>
                    <Card.Text>
                        <small className="text-muted">{locationType}</small>
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>

    )

}

export default SimpleLocationCard;
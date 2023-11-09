import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "../../styles/index.css";


function LocationCard({ picture, Title }) {
    const LocationImage = picture;
    const LocationTitle = Title;

    return (
        <Container className="my-5 location-card">
            <Card className="custom-card mx-auto">
                <Card.Img variant={LocationImage} src={LocationImage} />
                <Card.Body>
                    <div className="d-flex align-items-top">
                        <div className="likes-container">
                            <div className="center-likes">
                                <FontAwesomeIcon icon={faHeart} id="heart" />
                                <div id="likes">10</div>
                            </div>
                        </div>
                        <div className="location-details">
                            <div className="location-title">
                                <Card.Title className="truncate-text">{LocationTitle}</Card.Title>
                            </div>
                            <div className="location-place">
                                <Card.Subtitle className="location-country"><b>Denmark</b></Card.Subtitle>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card.Text>
                            <small className="text-muted">Bouldering, Gym</small>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LocationCard;
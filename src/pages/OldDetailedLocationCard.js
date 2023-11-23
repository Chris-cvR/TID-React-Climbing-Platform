import React from 'react';
import "../styles/index.css";
import picture1 from "../assets/images/Blocs&Walls.jpg"
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function OldDetailedLocationCard() {
    const LocationImage = picture1;

    return (
        <Container className="DetailedContainer">
            <Card className=" DetailedCardStyle">
                <Card.Body className="d-flex">
                    {/* Left side with the image */}
                    <div className="mr-5">
                        <Card.Img className="DetailedLocationImage" src={LocationImage} />
                        <div className="detailed-flex-container">
                            <div className="detailed-content">
                                <h8>Coordinates</h8>
                                <div className="detailed-text-container">
                                    <div className="coordinate-container">
                                        <p><b>Latitude:</b></p>
                                        <span className="coordinate-value">55.6928</span>
                                    </div>
                                </div>

                                <div className="detailed-text-container">
                                    <div className="coordinate-container">
                                        <p><b>Longitude:</b></p>
                                        <span className="coordinate-value">12.6107</span>
                                    </div>
                                </div>

                            </div>

                            <div className="detailed-content">
                                <h8>Address</h8>
                                <div className="detailed-text-container">
                                    <p>Refshalevej 163D
                                        1432, København K
                                        Denmark
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Divider (thin black line) */}
                    <div className="divider"></div>

                    {/* Right side with text information */}
                    <div>
                        <div className="detailed-location-info">
                            <div className="detailed-location-title">
                                <Card.Title className="detailed-truncate-text">Blocs & Walls</Card.Title>
                            </div>
                            <div className="detailed-location-place">
                                <Card.Subtitle className="location-country"><b>Denmark</b></Card.Subtitle>
                            </div>
                        </div>
                        <div className='detailed-text'>
                            Blocs & Walls, located on Amager Island, offers a wide range of climbing options. The gym features both bouldering walls and top-rope climbing routes. Whether you prefer the intense, dynamic nature of bouldering or the more endurance-focused rope climbing, you'll find suitable challenges here. Blocs & Walls, located on Amager Island, offers a wide range of climbing options. The gym features both bouldering walls and top-rope climbing routes. Whether you prefer the intense, dynamic nature of bouldering or the more endurance-focused rope climbing, you'll find suitable challenges here. Blocs & Walls, located on Amager Island, offers a wide range of climbing options. The gym features both bouldering walls and top-rope climbing routes. Whether you prefer the intense, dynamic nature of bouldering or the more endurance-focused rope climbing, you'll find suitable challenges here.
                        </div>
                        <div className="detailed-flex-container2">
                            <div className="detailed-content">
                                <h8>Type</h8>
                                <div className="detailed-text-container">
                                    <p>Gym, Bouldering</p>
                                </div>

                            </div>

                            <div className="detailed-likes-content">
                                <h8>Likes</h8>
                                <div className="coordinate-container">
                                    <FontAwesomeIcon icon={faHeart} id="likes-heart" />
                                    <div id="detailed-likes">10</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OldDetailedLocationCard;



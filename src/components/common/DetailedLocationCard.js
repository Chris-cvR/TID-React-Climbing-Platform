import React from 'react';
import "../../styles/index.css";
import picture1 from "../../assets/images/Blocs&Walls.jpg"
import { Container, Card } from 'react-bootstrap';


function LocationCard() {
    const LocationImage = picture1;

    return (
        <Container className="DetailedContainer">
            <Card className=" DetailedCardStyle">
                <Card.Body className="d-flex">
                    {/* Left side with the image */}
                    <div className="mr-5">
                        <Card.Img className="DetailedLocationImage" src={LocationImage} />
                        <div className="detailed-flex-container">
                            <div className="detailed-text-container">
                                <p>Text in Container 1</p>
                            </div>

                            <div className="detailed-text-container">
                                <p>Text in Container 2</p>
                            </div>
                        </div>
                    </div>

                    {/* Divider (thin black line) */}
                    <div className="divider"></div>

                    {/* Right side with text information */}
                    <div>
                        <div className="detailed-location-info">
                            <div className="detailed-location-title">
                                <Card.Title className="detailed-truncate-text">TestTextasfbdyfbdifubdsfdkfbdsifgb</Card.Title>
                            </div>
                            <div className="detailed-location-place">
                                <Card.Subtitle className="location-country"><b>Denmark</b></Card.Subtitle>
                            </div>
                        </div>
                        <div className='detailed-text'>
                            This is some text information that you want to display on the right side of the card.
                        </div>

                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LocationCard;



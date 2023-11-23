import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { useParams } from 'react-router-dom';
import "../styles/index.css";
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Comment from '../components/common/Comment'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const DetailedLocationPage = () => {
    const { id } = useParams();
    const [locationDetails, setLocationDetails] = useState(null);

    const fetchLocationDetails = async () => {
        const parseQuery = new Parse.Query('Location');
        parseQuery.include('Country');

        try {
            const location = await parseQuery.get(id);
            console.log('Fetched location details:', location);
            console.log(location.get('Name'))
            setLocationDetails(location);
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };

    useEffect(() => {
        console.log('Fetching location details for objectid:', id);
        fetchLocationDetails();
    }, [id]);


    return (
        <div>
            <Navbar />
            <div>
                <Container className="DetailedContainer">
                    {locationDetails && (
                        <Card className=" DetailedCardStyle">
                            <Card.Body className="d-flex">
                                {/* Left side with the image */}
                                <div className="mr-5">
                                    <Card.Img className="DetailedLocationImage" src={locationDetails.get('Picture')?.url()} />
                                    <div className="detailed-flex-container">
                                        <div className="detailed-content">
                                            <h8>Coordinates</h8>
                                            <div className="detailed-text-container">
                                                <div className="coordinate-container">
                                                    <p><b>Latitude:</b></p>
                                                    <span className="coordinate-value">{locationDetails.get('Latitude')}</span>
                                                </div>
                                            </div>

                                            <div className="detailed-text-container">
                                                <div className="coordinate-container">
                                                    <p><b>Longitude:</b></p>
                                                    <span className="coordinate-value">{locationDetails.get('Longitude')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="detailed-content">
                                            <h8>Address</h8>
                                            <div className="detailed-text-container">
                                                <p>{locationDetails.get('Address')}</p>
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
                                            <Card.Title className="detailed-truncate-text">{locationDetails.get('Name')}</Card.Title>
                                        </div>
                                        <div className="detailed-location-place">
                                            <Card.Subtitle className="location-country"><b>{locationDetails.get('Country').get('Country')}</b></Card.Subtitle>
                                        </div>
                                    </div>
                                    <div className='detailed-text'>
                                        {locationDetails.get('Description')}
                                    </div>
                                    <div className="detailed-flex-container2">
                                        <div className="detailed-content">
                                            <h8>Type</h8>
                                            <div className="detailed-text-container">
                                                <p>{locationDetails.get('Type')}</p>
                                            </div>
                                        </div>

                                        <div className="detailed-likes-content">
                                            <h8>Likes</h8>
                                            <div className="coordinate-container">
                                                <FontAwesomeIcon icon={faHeart} id="likes-heart" />
                                                <div id="detailed-likes">{locationDetails.get('Likes')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Container>
            </div>
            <div>
                <Comment />
            </div>
            <Footer />
        </div>
    );
};

export default DetailedLocationPage;

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
import CommentFactory from '../components/sections/CommentFactory';

const DetailedLocationPage = () => {
    const { id } = useParams();
    const [locationDetails, setLocationDetails] = useState(null);

    const fetchLocationDetails = async () => {
        const parseQuery = new Parse.Query('Location');
        parseQuery.include('Country');

        try {
            const location = await parseQuery.get(id);
            setLocationDetails(location);
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };

    useEffect(() => {
        fetchLocationDetails();
    }, [id]);


    return (
        <div>
            <Navbar />
            <div>
                <Container className="detailed-container">
                    {locationDetails && (
                        <Card className=" detailed-card-style">
                            <Card.Body className="d-flex">
                                {/* Left side with the image */}
                                <div className="mr-5">
                                    <Card.Img className="crop-image detailed-location-image" src={locationDetails.get('Picture')?.url()} />
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
                                        <div>
                                            <div className="detailed-content">
                                                <div className='col'><h8>Type</h8></div>
                                                <div className="col detailed-text-container">
                                                    {locationDetails.get('Type')}
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
                                            <FontAwesomeIcon icon={faHeart} id="likes-heart" />
                                            <div id="detailed-likes">{locationDetails.get('Likes')}</div>
                                        </div>
                                        <div className="col detailed-location-title">
                                            <Card.Title className="col float-start detailed-truncate-text">{locationDetails.get('Name')}</Card.Title>
                                        </div>
                                        <div className="col detailed-location-place">
                                            <Card.Subtitle className="col float-end location-country"><b>{locationDetails.get('Country').get('Country')}</b></Card.Subtitle>
                                        </div>
                                    </div>

                                    <div className='detailed-text'>
                                        {locationDetails.get('Description')}
                                    </div>
                                    <div className="detailed-flex-container2">



                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Container>
            </div>
            <div>
                <Comment locationId={id} />
            </div>
            <CommentFactory locationId={id}></CommentFactory>
            <Footer />
        </div>
    );
};

export default DetailedLocationPage;

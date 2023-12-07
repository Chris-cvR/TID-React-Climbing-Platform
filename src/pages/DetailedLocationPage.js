import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { useParams } from 'react-router-dom';
import "../styles/index.css";
import { Container } from 'react-bootstrap';
import Comment from '../components/common/Comment'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CommentSectionFactory from '../components/sections/CommentSectionFactory';
import DetailedLocationCard from '../components/common/DetailedLocationCard'
import EditLocation from '../components/common/EditLocation';

const DetailedLocationPage = () => {
    const { id } = useParams();
    const [locationDetails, setLocationDetails] = useState(null);

    const user = Parse.User.current();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const allLocationsQuery = new Parse.Query('Location');

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
            <EditLocation show={show} handleClose={handleClose} locationId={id} />
            <div className="detailed-container">
                <Container className="detailed-container">
                    {locationDetails && (
                        <DetailedLocationCard
                            locationPicture={locationDetails.get('Picture')?.url()}
                            locationLatitude={locationDetails.get('Latitude')}
                            locationLongitude={locationDetails.get('Longitude')}
                            locationType={locationDetails.get('Type')}
                            locationName={locationDetails.get('Name')}
                            locationCountry={locationDetails.get('Country').get('Country')}
                            locationDetails={locationDetails.get('Description')}
                            locationDifficulty={locationDetails.get('Difficulty').get('Difficulty')}
                            locationID={id}
                            userID={locationDetails.get('UserID')}
                            currentUserID={user}
                            handleShow={handleShow}
                        />
                    )}
                </Container>
            </div>
            <div className="detailed-container">
                <Comment locationId={id} />
            </div>
            <div className="comments-container">
                <CommentSectionFactory locationId={id} />
            </div>
            <Footer />
        </div>
    );
};

export default DetailedLocationPage;

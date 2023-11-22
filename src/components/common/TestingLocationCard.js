import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Parse from 'parse';
import '../../styles/index.css';

const PARSE_APPLICATION_ID = 'SkB4EbitycaKhaamgOXH6VSIF8v9wALZX8BdrVAY';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'm5BftvHxXy2m3GdT1OhQL32BVIIBWp1WjESfiosZ';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function TestingLocationCard({ objectId }) {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const fetchData = async function () {
            const parseQuery = new Parse.Query('Location');
            try {
                parseQuery.select('Picture', 'Name', 'Country', 'Type', 'Likes');

                let data = await parseQuery.first();
                setLocationData(data);
                return true;
            } catch (error) {
                // Error can be caused by lack of Internet connection
                alert(`Error! ${error.message}`);
                return false;
            }
        };

        fetchData();
    }, [objectId]);

    console.log(locationData)

    if (!locationData) {
        return <div>Loading...</div>;
    }

    const { Picture, Name, Country, Type, Likes } = locationData;

    return (
        <Container className="my-5 location-card">
            <Card className="custom-card mx-auto">
                <Card.Img variant={Picture} src={Picture} />
                <Card.Body>
                    <div className="d-flex align-items-top">
                        <div className="likes-container">
                            <div className="center-likes">
                                <FontAwesomeIcon icon={faHeart} id="heart" />
                                <div id="likes">{Likes}</div>
                            </div>
                        </div>
                        <div className="location-details">
                            <div className="location-title">
                                <Card.Title className="truncate-text">{Name}</Card.Title>
                            </div>
                            <div className="location-place">
                                <Card.Subtitle className="location-country">
                                    <b>{Country}</b>
                                </Card.Subtitle>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card.Text>
                            <small className="text-muted">{Type}</small>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default TestingLocationCard;

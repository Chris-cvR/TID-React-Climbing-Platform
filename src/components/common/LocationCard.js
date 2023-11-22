import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { List } from 'antd';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/index.css';


export const LocationCard = () => {
    const [readResults, setReadLocations] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const readLocations = async function () {
        const parseQuery = new Parse.Query('Location');
        parseQuery.include('Country'); //This part is crucial if we want to fetch data that is a pointer to a different class in our backend. Along with the code on line 68. Without it done this way you cant fetch data that is a pointer to another class.
        try {
            let locations = await parseQuery.find();

            setReadLocations(locations);
            setLoading(false); // Set loading to false when data is fetched
            return true;
        } catch (error) {
            // Safety in case of an internet error
            alert(`Error! ${error.message}`);
            setLoading(false); // Set loading to false in case of an error
            return false;
        }
    };

    useEffect(() => {
        readLocations();
    }, []);

    return (
        <div>
            <div className="location-container">
                <div>
                    {loading && <div>Loading...</div>}
                    {!loading && readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (

                            <List
                                dataSource={readResults}
                                renderItem={(item) => (
                                    <List.Item className="card-items">
                                        <Container className="my-5 location-card">
                                            <Card className="custom-card mx-auto">
                                                <Card.Img className="card-img-custom" src={item.get('Picture')?.url()} />
                                                <Card.Body>
                                                    <div className="d-flex align-items-top">
                                                        <div className="likes-container">
                                                            <div className="center-likes">
                                                                <FontAwesomeIcon icon={faHeart} id="heart" />
                                                                <div id="likes">{item.get('Likes')}</div>
                                                            </div>
                                                        </div>
                                                        <div className="location-details">
                                                            <div className="location-title">
                                                                <Card.Title className="truncate-text">{item.get('Name')}</Card.Title>
                                                            </div>
                                                            <div className="location-place">
                                                                <Card.Subtitle className="location-country">
                                                                    <b>{item.get('Country').get('Country')}</b>
                                                                </Card.Subtitle>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Card.Text>
                                                            <small className="text-muted">{item.get('Type')}</small>
                                                        </Card.Text>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Container>
                                    </List.Item>
                                )}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};
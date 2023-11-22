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

    const readLocations = async function () {
        // Reading parse objects is done by using Parse.Query
        const parseQuery = new Parse.Query('Location');
        try {
            let locations = await parseQuery.find();
            // Set results to state variable
            setReadLocations(locations);
            return true;
        } catch (error) {
            //Safety in case of internet error
            alert(`Error! ${error.message}`);
            return false;
        }
    };

    // Use useEffect to fetch data on component mount
    useEffect(() => {
        readLocations();
    }, []); // Empty dependency array ensures that this effect runs once on mount


    return (
        <div>
            <div className="container">
                <div>
                    {readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (

                            <List
                                dataSource={readResults}
                                renderItem={(item) => (
                                    <List.Item className="card_items">
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
                                                                    <b>{ }</b>
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
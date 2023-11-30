import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Parse from 'parse/dist/parse.min.js';
import { List } from 'antd';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../../styles/index.css';
import LikeFunctionality from '../common/LikeFunctionality';

export const LocationCardFactory = () => {
    const [readLocations, setReadLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const readLocationsQuery = async function () {
        const parseQuery = new Parse.Query('Location');
        parseQuery.include('Country');
        parseQuery.descending('updatedAt'); //Now the cards are sorted based on popularity 

        try {
            let locations = await parseQuery.find();
            setReadLocations(locations);
            setLoading(false);
            return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
            setLoading(false);
            return false;
        }
    };

    useEffect(() => {
        readLocationsQuery();
    }, []);

    return (
        <div>
            <div className="location-container">
                <div>
                    {loading && <div>Loading...</div>}
                    {!loading && readLocations !== null &&
                        readLocations !== undefined &&
                        readLocations.length > 0 && (
                            <List
                                dataSource={[...readLocations]}
                                renderItem={(item) => (
                                    <List.Item className="card-items">
                                        <Container className="my-4 location-card">
                                            <Card className="custom-card mx-auto">
                                                <Link to={`/location/${item.id}`}>
                                                    <Card.Img className="card-img-custom crop-image" src={item.get('Picture')?.url()} />
                                                </Link>
                                                <Card.Body>
                                                    <div className="d-flex align-items-top">
                                                        <div className="likes-container">
                                                            <div className="center-likes">
                                                                <LikeFunctionality id={item.id} />
                                                            </div>
                                                        </div>
                                                        <div className="location-details">
                                                            <div className="location-title">
                                                                <Card.Title className="truncate-text">
                                                                    <Link to={`/location/${item.id}`} className="card-title-link">
                                                                        {item.get('Name')}
                                                                    </Link>
                                                                </Card.Title>
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

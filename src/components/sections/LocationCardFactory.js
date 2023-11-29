import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';
import { List } from 'antd';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/index.css';

export const LocationCardFactory = ({ selectedCountries, selectedTypes }) => {
    const [readResults, setReadLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const readLocations = async function () {
        const parseQuery = new Parse.Query('Location');
        parseQuery.include('Country');

        // Default state: show all cards when no filters are selected
        if (selectedCountries.length === 0 && selectedTypes.length === 0) {
            console.log("No filters selected - Fetching all locations");
        } else {
            // Apply filters based on selected values
            console.log("Applying filters - Countries:", selectedCountries);
            console.log("Applying filters - Types:", selectedTypes);

            if (selectedCountries.length > 0) {
                parseQuery.containedIn('Country', selectedCountries);
            }

            if (selectedTypes.length > 0) {
                parseQuery.containedIn('TypeName', selectedTypes);
            }
        }

        try {
            let locations = await parseQuery.find();
            console.log("Fetched locations:", locations);
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
        const fetchData = async () => {
            try {
                await readLocations();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedCountries, selectedTypes]);

    return (
        <div>
            <div className="location-container">
                <div>
                    {loading && <div>Loading...</div>}
                    {!loading && readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (
                            <List
                                dataSource={[...readResults].reverse()}
                                renderItem={(item) => (
                                    <List.Item className="card-items" key={item.id}>
                                        <Container className="my-4 location-card">
                                            <Card className="custom-card mx-auto">
                                                <Link to={`/location/${item.id}`}>
                                                    <Card.Img className="card-img-custom crop-image" src={item.get('Picture')?.url()} />
                                                </Link>
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

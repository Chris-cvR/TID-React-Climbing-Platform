import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { List } from 'antd';
import Container from 'react-bootstrap/Container';
import '../../styles/index.css';
import SimpleLocationCard from '../common/SimpleLocationCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const LocationCardFactory = ({ parseQuery, selectedCountry, selectedType, selectedDifficulty }) => {
    const [readLocations, setReadLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const readLocationsQuery = async function () {
            parseQuery.include('Country');
            parseQuery.include('Difficulty');
            parseQuery.descending('updatedAt');

            try {
                let locations = await parseQuery.find();

                // Apply filters based on the selected values
                let filteredLocations = locations;

                if (selectedCountry && selectedCountry !== 'None') {
                    filteredLocations = filteredLocations.filter(item => item.get('Country').get('Country') === selectedCountry);
                }

                if (selectedType && selectedType !== 'None') {
                    filteredLocations = filteredLocations.filter(item => item.get('Type') === selectedType);
                }

                if (selectedDifficulty && selectedDifficulty !== 'None') {
                    filteredLocations = filteredLocations.filter(item => item.get('Difficulty').get('Difficulty') === selectedDifficulty);
                }

                setReadLocations(filteredLocations);
                setLoading(false);
            } catch (error) {
                alert(`Error! ${error.message}`);
                setLoading(false);
            }
        };

        readLocationsQuery();
    }, [selectedCountry, selectedType, selectedDifficulty]);

    return (
        <div>
            <div className="location-container">
                <div>
                    {loading && (
                        <div>
                            <Skeleton height={400} count={7} />
                        </div>
                    )}
                    {!loading && readLocations !== null && readLocations !== undefined && readLocations.length > 0 && (
                        <List
                            dataSource={[...readLocations]}
                            renderItem={(item) => (
                                <List.Item className="card-items">
                                    <Container className="my-4 location-card">
                                        <SimpleLocationCard
                                            locationURL={`/location/${item.id}`}
                                            locationPicture={item.get('Picture')?.url()}
                                            locationID={item.id}
                                            locationName={item.get('Name')}
                                            locationCountry={item.get('Country').get('Country')}
                                            locationType={item.get('Type')}
                                            locationDifficulty={item.get('Difficulty').get('Difficulty')}
                                        />
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

import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { List } from 'antd';
import Container from 'react-bootstrap/Container';
import '../../styles/index.css';
import SimpleLocationCard from '../common/SimpleLocationCard';

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
                                            <SimpleLocationCard
                                                locationURL={`/location/${item.id}`}
                                                locationPicture={item.get('Picture')?.url()}
                                                locationID={item.id}
                                                locationName={item.get('Name')}
                                                locationCountry={item.get('Country').get('Country')}
                                                locationType={item.get('Type')}
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

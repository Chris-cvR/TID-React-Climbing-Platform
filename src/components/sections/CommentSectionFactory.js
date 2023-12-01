import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import '../../styles/index.css'
import { List } from 'antd';
import { Container } from 'react-bootstrap';
import ProfilePicture from '../common/ProfilePicture';


function CommentSectionFactory({ locationId }) {
    const [readResults, setReadComments] = useState([]);

    useEffect(() => {
        const readComments = async function () {
            // Create a new query on the Comment class
            const parseQuery = new Parse.Query('Comment');
            parseQuery.include('UserID');
            parseQuery.include('Hashtags');
            parseQuery.descending('createdAt'); //Now the comments will be sorted by the newest first

            // Use equalTo to find comments related to a specific locationId
            parseQuery.equalTo('LocationID', locationId);

            try {
                // Perform the query to get comments matching the locationId
                let commentsReceived = await parseQuery.find();
                // Set the results to state variable
                setReadComments(commentsReceived);
            } catch (error) {
                // Handle errors, like lack of Internet connection
                alert(`Error! ${error.message}`);
            }
        };
        readComments();
    }, [locationId]); // Depend on locationId to refetch when it changes

    return (
        <div>
            <div className="comment-container">
                <h2>Comments</h2>
                <div>
                    {readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (
                            <List
                                dataSource={[...readResults]}
                                renderItem={(item) => (
                                    <List.Item className="comment-card-items">
                                        <Container className="comment-card-container">
                                            <div className="comment-card">
                                                <div className="comment-profile-picture">
                                                        <ProfilePicture user={item.get('UserID')} size="60px" />
                                                </div>
                                                <div className="user-info">
                                                    <p className="comment-username">{item.get('UserID').get('username')}</p>
                                                    <p className="comment-experience">{item.get('UserID').get('experience')}</p>
                                                </div>
                                                <p>{item.get('CommentText')}</p>
                                            </div>
                                        </Container>
                                    </List.Item>
                                )}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}

export default CommentSectionFactory;
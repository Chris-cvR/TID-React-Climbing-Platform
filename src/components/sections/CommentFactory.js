import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
// if you use antd button somewhere, you can import it
// import { Button } from 'antd';
import '../../styles/index.css'
import { List } from 'antd';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Container from 'react-bootstrap/Container';


function CommentFactory({ locationId }) {
    const [readResults, setReadComments] = useState([]);

    useEffect(() => {
        const readComment = async function () {
            // Create a new query on the Comment class
            const parseQuery = new Parse.Query('Comment');
            parseQuery.include('UserID');
            parseQuery.include('Hashtags');

            // Use equalTo to find comments related to a specific locationId
            parseQuery.equalTo('LocationID', locationId);

            try {
                // Perform the query to get comments matching the locationId
                let commentsReceived = await parseQuery.find();
                // Set the results to state variable
                setReadComments(commentsReceived);
                console.log(commentsReceived); // Log the correct variable
            } catch (error) {
                // Handle errors, like lack of Internet connection
                alert(`Error! ${error.message}`);
            }
        };
        readComment();
    }, [locationId]); // Depend on locationId to refetch when it changes

    return (
        <div>
            <div className="comment-container">
                <div>
                    {readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (
                            <List
                                dataSource={[...readResults].reverse()}
                                renderItem={(item) => (
                                    <List.Item className="card-items">
                                        <div class="comment-card">
                                            <p class="username">{item.get('UserID').get('username')}</p>
                                            <b class="experience">{item.get('UserID').get('experience')}</b>
                                            <p class="comment-text">{item.get('CommentText')}</p>
                                            <p class="name">{item.get('Name')}</p>
                                        </div>

                                    </List.Item>
                                )}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}

export default CommentFactory;
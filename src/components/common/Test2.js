import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Button, List } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/index.css';



export const TodoList = () => {
    // State variables
    const [readResults, setReadResults] = useState([]);

    const readTodos = async function () {
        // Reading parse objects is done by using Parse.Query
        const parseQuery = new Parse.Query('Location');
        try {
            let todos = await parseQuery.find();
            // Be aware that empty or invalid queries return as an empty array
            // Set results to state variable
            setReadResults(todos);
            return true;
        } catch (error) {
            // Error can be caused by lack of Internet connection
            alert(`Error! ${error.message}`);
            return false;
        }
    };

    return (
        <div>
            <div className="container">
                <div className="flex_between">
                    <h2 className="list_heading">Todo List</h2>
                    {/* To-do read (refresh) button */}
                    <Button
                        type="primary"
                        shape="circle"
                        color={'#208AEC'}
                        size={'default'}
                        onClick={readTodos}
                        icon={<RedoOutlined />}
                    ></Button>
                </div>

                <div>
                    {/* Todo read results list */}
                    {readResults !== null &&
                        readResults !== undefined &&
                        readResults.length > 0 && (

                            <List
                                dataSource={readResults}
                                renderItem={(item) => (
                                    <List.Item className="card_items">
                                        <Container className="my-5 location-card">
                                            <Card className="custom-card mx-auto">
                                                <Card.Img variant={item.get('Picture')} src={item.get('Picture')} />
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
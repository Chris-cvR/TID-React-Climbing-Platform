import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../styles/index.css";
import picture from "../../assets/images/Blocs&Walls.jpg";

function LocationCard() {
    const image = picture;

    return (
        <Container className="my-5">
            <Card className="custom-card mx-auto">
                <Card.Img variant={image} src={image} />
                <Card.Body>
                    <Row>
                        <Col md={3.5}>
                            <div className="d-flex align-items-center">
                                <div id="likes-container">
                                    <i className="fa fa-heart-o btn btn-default" id="heart"></i>
                                    <div id="likes">0</div>
                                </div>
                                <div id="location-details" className="ml-2">
                                    <h5 className="card-title mb-2">Blocs & Walls</h5>
                                    <h6 className="mt-1">Denmark</h6>
                                    <small className="text-muted">Type: Bouldering, Gym</small>
                                </div>
                            </div>
                        </Col>
                    </Row>



                </Card.Body>
            </Card>
        </Container>
    );
}

export default LocationCard;



/* 
<Container>
            <Card className="mx-auto card-width card-margin">
                <a href="Location.html">
                    <Card.Img variant="top" src={image} />
                </a>
                <Card.Body>
                    <Row>
                        <Col md={3.5}>
                            <div className="d-flex align-items-center">
                                <div id="likes-container">
                                    <i className="fa fa-heart-o btn btn-default" onClick={btnClick} id="heart"></i>
                                    <div id="likes">0</div>
                                </div>
                                <div id="location-details" className="ml-2">
                                    <h5 className="card-title mb-2">Blocs & Walls</h5>
                                    <h6 className="mt-1">Denmark</h6>
                                    <small className="text-muted">Type: Bouldering, Gym</small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>

*/

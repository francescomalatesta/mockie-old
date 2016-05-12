import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

const Field = ({ item, onClick }) => (
    <Row className="field">
        <Col md={5}>
            <input type="text" className="form-control" placeholder="Field Name..." />
        </Col>
        <Col md={5}>
            <Button bsStyle="info" className="form-control">Choose Type</Button>
        </Col>
        <Col md={2}>
            <Button bsStyle="danger" className="form-control" onClick={onClick}>Remove</Button>
        </Col>
    </Row>
);

export default Field

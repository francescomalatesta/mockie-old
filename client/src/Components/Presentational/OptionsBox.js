import React from 'react';
import {Row, Col} from 'react-bootstrap';

const OptionsBox = () => (
    <Row className="optionsBox">
        <Col md={6}>
            <h3>Count</h3>
            <p>How many items you want to generate?</p>
            <input type="text" placeholder="Count..." className="form-control" />
        </Col>
        <Col md={6}>
            <h3>Output Format</h3>
            <p>Choose the desired format for your random data.</p>
            <select className="form-control">
                <option value="json">JSON</option>
                <option value="xml">XML</option>
            </select>
        </Col>
    </Row>
);

export default OptionsBox

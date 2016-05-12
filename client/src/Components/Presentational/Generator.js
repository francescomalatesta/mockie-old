import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import FieldsBox from './FieldsBox';
import OptionsBox from './OptionsBox';

const Generator = () => (
    <div className="generator">
        <FieldsBox />

        <hr />

        <OptionsBox />

        <hr />

        <Row>
            <Col md={12}>
                <Button bsStyle="success" className="generateButton form-control">Generate!</Button>
            </Col>
        </Row>
    </div>
);

export default Generator

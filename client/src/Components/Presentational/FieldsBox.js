import React from 'react';
import {Row, Col} from 'react-bootstrap';

import FieldItemsContainer from '../Container/FieldItemsContainer';
import Previewer from './Previewer';

const FieldsBox = () => (
    <Row className="fieldsBox">
        <Col md={7}>
            <h2>Fields</h2>
            <p>Here you can specify everything about the fields you want to generate.</p>
            <FieldItemsContainer />
        </Col>
        <Col md={5}>
            <h2>Preview</h2>
            <p>Don't risk! Here's a preview of what are going to get.</p>
            <Previewer />
        </Col>
    </Row>
);

export default FieldsBox

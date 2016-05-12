import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

let AddFieldButton = ({dispatch }) => {
    return <Button bsStyle="success" className="addFieldButton form-control" onClick={() => dispatch({ type: 'ADD_FIELD' })}>+ Add Field</Button>
};

AddFieldButton = connect()(AddFieldButton);

export default AddFieldButton

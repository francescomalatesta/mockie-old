import { connect } from 'react-redux'

import FieldsList from '../Presentational/FieldsList'

const mapStateToProps = (state) => {
    return {
        items: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveClick: (id) => {
            dispatch({ type: 'REMOVE_FIELD', id: id })
        }
    }
};

const FieldItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldsList);

export default FieldItemsContainer

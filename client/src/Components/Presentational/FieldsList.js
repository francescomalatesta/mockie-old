import React from 'react';

import Field from './Field';
import AddFieldButton from './AddFieldButton';

const FieldsList = ({ items, onRemoveClick }) => (
    <div className="fieldsList little-separated">
        {items.map(function (item) {
            return <Field key={item.id} data={item} onClick={() => onRemoveClick(item.id)} />;
        })}

        <AddFieldButton />
    </div>
);

export default FieldsList

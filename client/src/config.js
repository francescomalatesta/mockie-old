'use strict';

module.exports = {
    defaultFields: [
        { name: "first_name", type: "name.firstName", typeLabel: "Name > First Name" },
        { name: "last_name", type: "name.lastName", typeLabel: "Name > Last Name" },
        { name: "email", type: "internet.email", typeLabel: "Internet > Email" }
    ],

    defaultItemsCount: 100,

    defaultOutputFormat: 'json',

    availableOutputFormats: [
        {'name': 'JSON', 'extension': 'json'},
        {'name': 'CSV', 'extension': 'csv'},
        {'name': 'XML', 'extension': 'xml'}
    ]
};

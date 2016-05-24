'use strict';

module.exports = function () {
    Vue.filter('show_names', function (fields) {
        return fields.map(function (field) {
            return field.name;
        }).join(', ');
    });
};

'use strict';

// Use vue-resource to make http calls
Vue.use(require('vue-resource'));

// Load filters
require('./Filters/ShowNames')();

// Load components
var FieldTypeSelector = require('./Components/FieldTypeSelector')();
var FieldsSets = require('./Components/FieldsSets')();
var PreviewBox = require('./Components/PreviewBox')();
var Generator = require('./Components/Generator')();

// Load config file with basic bootstrap and default data
var config = require('./config');

new Vue({
    el: '#application',
    data: {
        fields: config.defaultFields,

        itemsCount: 100,

        outputFormat: 'json',
        availableOutputFormats: config.availableOutputFormats
    },
    components: {
        'preview-box': PreviewBox,
        'field-type-selector': FieldTypeSelector,
        'fields-sets': FieldsSets,
        'generator': Generator
    },
    ready: function () {
        this.$broadcast('refresh-preview', this.fields);
    },
    methods: {
        addField: function () {
            this.fields.push({
                name: '',
                type: null
            });
        },
        removeField: function (index) {
            if(this.fields.length > 1){
                this.fields.splice(index, 1);
                this.$broadcast('refresh-preview', this.fields);
            } else {
                alert('You must specify at least one field!');
            }
        }
    },
    events: {
        'change-fields': function (chosenFieldsSet) {
            this.fields = chosenFieldsSet;
        },
        'change-field-type': function (fieldData) {
            var fields = this.fields;

            fields[fieldData.index].type = fieldData.type;
            fields[fieldData.index].typeLabel = fieldData.typeLabel;

            this.fields = fields;

            this.$broadcast('refresh-preview', this.fields);
        }
    }
});

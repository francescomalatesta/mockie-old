'use strict';

// Use vue-resource to make http calls
Vue.use(require('vue-resource'));

// Load filters
require('./Filters/ShowNames')();

// Load components
var FieldTypeSelector = require('./Components/FieldTypeSelector.vue');
var OutputFormatSelector = require('./Components/OutputFormatSelector.vue');
var FieldsSets = require('./Components/FieldsSets.vue');
var PreviewBox = require('./Components/PreviewBox.vue');
var Generator = require('./Components/Generator.vue');

// Load config file with basic bootstrap and default data
var config = require('./config');

new Vue({
    el: '#application',
    data: {
        fields: config.defaultFields,
        itemsCount: 100,
        outputFormat: 'json'
    },
    components: {
        'preview-box': PreviewBox,
        'field-type-selector': FieldTypeSelector,
        'output-format-selector': OutputFormatSelector,
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
            this.$broadcast('refresh-preview', this.fields);
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

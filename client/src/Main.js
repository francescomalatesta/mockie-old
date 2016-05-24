'use strict';

// Use vue-resource to make http calls
Vue.use(require('vue-resource'));

// Load filters
require('./Filters/ShowNames')();

// Load components
var FieldTypeSelector = require('./Components/FieldTypeSelector')();
var FieldsSets = require('./Components/FieldsSets')();
var PreviewBox = require('./Components/PreviewBox')();

// Load config file with basic bootstrap and default data
var config = require('./config');

new Vue({
    el: '#application',
    data: {
        fields: config.defaultFields,

        itemsCount: 100,

        outputFormat: 'json',
        availableOutputFormats: config.availableOutputFormats,

        // UI
        isGenerating: false
    },
    components: {
        'preview-box': PreviewBox,
        'field-type-selector': FieldTypeSelector,
        'fields-sets': FieldsSets
    },
    http: {
        root: ''
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
        },
        generateFile: function () {
            var mustRefresh = true;
            var fieldsArray = [];

            for(var c in this.fields){
                var item = this.fields[c];

                if(item.type === null){
                    mustRefresh = false;
                }

                if(item.name === '') {
                    mustRefresh = false;
                }
            }

            if(mustRefresh) {
                for(var i in this.fields){
                    fieldsArray.push({
                        name: this.fields[i].name,
                        type: this.fields[i].type
                    });
                }

                this.isGenerating = true;
                this.$http({url: 'http://localhost:3000/generate', method: 'POST', data: {
                    fields: fieldsArray,
                    count: this.itemsCount,
                    output: this.outputFormat
                }}).then(function (response) {
                    this.isGenerating = false;
                    window.location.href = response.data.url;
                }, function (response) {
                    alert('Some issues occurred during the generation procedure. Try again.');
                });
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

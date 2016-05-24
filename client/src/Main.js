'use strict';

Vue.use(require('vue-resource'));

// Load Filters
require('./Filters/ShowNames')();

// Load Components
var FieldsSets = require('./Components/FieldsSets')();
var PreviewBox = require('./Components/PreviewBox')();

var config = require('./config');

new Vue({
    el: '#application',
    data: {
        fields: config.defaultFields,
        itemsCount: 100,
        outputFormat: 'json',

        availableOutputFormats: config.availableOutputFormats,

        availableFieldTypeCategories: require('./Fields/AvailableFields').fieldTypeCategories,
        fieldsSets: [],

        // UI
        showFieldTypeSidebar: false,
        currentlySelectedField: 0,
        chosenFieldTypeCategory: 0,
        isGenerating: false
    },
    components: {
        sidebar: window.VueStrap.aside,
        accordion: window.VueStrap.accordion,

        'preview-box': PreviewBox,
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
        setSelectedField: function (index) {
            this.currentlySelectedField = index;
        },
        changeFieldType: function (fieldIndex, fieldTypeIndex) {
            var fields = this.fields;

            fields[fieldIndex].type =
                this.availableFieldTypeCategories[this.chosenFieldTypeCategory].slug +
                '.' +
                this.availableFieldTypeCategories[this.chosenFieldTypeCategory].types[fieldTypeIndex].slug;

            fields[fieldIndex].typeLabel =
                this.availableFieldTypeCategories[this.chosenFieldTypeCategory].name +
                ' > ' +
                this.availableFieldTypeCategories[this.chosenFieldTypeCategory].types[fieldTypeIndex].name;

            this.fields = fields;
            this.$broadcast('refresh-preview', this.fields);
            
            this.showFieldTypeSidebar = false;
        },
        refreshPreview: function () {
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

                this.$http({url: 'http://localhost:3000/preview', method: 'POST', data: {
                    fields: fieldsArray
                }}).then(function (response) {
                    this.previewContent = response.data;
                }, function (response) {
                    this.previewContent = 'Errors. Try again.';
                });
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
        }
    }
});

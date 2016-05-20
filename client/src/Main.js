'use strict';

Vue.use(require('vue-resource'));

new Vue({
    el: '#application',
    data: {
        fields: [
            { name: "first_name", type: "name.firstName", typeLabel: "Name > First Name" },
            { name: "last_name", type: "name.lastName", typeLabel: "Name > Last Name" },
            { name: "email", type: "internet.email", typeLabel: "Internet > Email" }
        ],

        items_count: 100,

        output_format: 'json',
        available_output_formats: [
            {'name': 'JSON', 'extension': 'json'},
            {'name': 'CSV', 'extension': 'csv'},
            {'name': 'XML', 'extension': 'xml'}
        ],

        availableFieldTypeCategories: require('./AvailableFields').fieldTypeCategories,
        fieldsSets: [],

        // UI
        showFieldTypeSidebar: false,
        showFieldsSetsSidebar: false,
        currentlySelectedField: 0,
        chosenFieldTypeCategory: 0,
        previewContent: '',
        isGenerating: false
    },
    components: {
        sidebar: window.VueStrap.aside,
        accordion: window.VueStrap.accordion,
        panel: window.VueStrap.panel
    },
    http: {
        root: ''
    },
    ready: function () {
        this.refreshPreview();
        this.loadFieldsSets();
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
                this.refreshPreview();
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
            this.refreshPreview();
            
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
                    count: this.items_count,
                    output: this.output_format
                }}).then(function (response) {
                    this.isGenerating = false;
                    window.location.href = response.data.url;
                }, function (response) {
                    alert('Some issues occurred during the generation procedure. Try again.');
                });
            }
        },
        loadFieldsSets: function () {
            this.$http({url: 'http://localhost:3000/fields-sets', method: 'GET', data: {}}).then(function (response) {
                this.fieldsSets = response.data;
            }, function (response) {
                alert('Errors while retrieving the fields sets list.');
            });
        },
        useSavedFieldsSet : function (index) {
            this.showFieldsSetsSidebar = false;
            this.fields = this.fieldsSets[index].fields;
            this.refreshPreview();
        },
        saveCurrentSet: function () {
            var setName = prompt("Please enter a name for your fields set:", "My Set Name");

            this.$http({url: 'http://localhost:3000/add-set', method: 'POST', data: {
                fields: this.fields,
                name: setName
            }}).then(function (response) {
                alert('Saved!');
                this.loadFieldsSets();
            }, function (response) {
                alert('Some issues occurred during the save procedure. Try again.');
            });
        },
        deleteFieldsSet: function (setId) {
            if(confirm('Are you sure to delete this saved set?')) {
                this.$http({url: 'http://localhost:3000/delete-set/' + setId, method: 'GET', data: {}}).then(function (response) {
                    this.loadFieldsSets();
                }, function (response) {
                    alert('Errors while removing the fields set.');
                });
            }
        }
    }
});

Vue.filter('show_names', function (fields) {
    return fields.map(function (field) {
       return field.name;
    }).join(', ');
});
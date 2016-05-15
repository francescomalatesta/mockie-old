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

        availableFieldTypeCategories: require('./AvailableFields').fieldTypeCategories,

        // UI
        showSidebar: false,
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
            
            this.showSidebar = false;
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
                    window.location.href = 'http://localhost:3000/downloads/' + response.data.url;
                }, function (response) {
                    alert('Some issues occurred during the generation procedure. Try again.');
                });
            }
        }
    }
});

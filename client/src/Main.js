'use strict';

Vue.use(require('vue-resource'));

new Vue({
    el: '#application',
    data: {
        fields: [
            { name: "first_name", type: "name.firstName" },
            { name: "last_name", type: "name.lastName" },
            { name: "email", type: "internet.email" }
        ],
        items_count: 100,
        output_format: 'json',

        availableFieldTypeCategories: require('./AvailableFields').fieldTypeCategories,

        // UI
        showSidebar: false,
        currentlySelectedField: 0,
        chosenFieldTypeCategory: 0,
        previewContent: ''
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

            this.fields = fields;
            this.refreshPreview();
            
            this.showSidebar = false;
        },
        refreshPreview: function () {
            var mustRefresh = true;

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
                this.$http({url: 'http://localhost:3000/generate', method: 'POST', data: {
                    fields: this.fields,
                    count: 1,
                    output: 'json'
                }}).then(function (response) {
                    this.previewContent = response.data;
                }, function (response) {
                    this.previewContent = 'Errors. Try again.';
                });
            }
        }
    }
});

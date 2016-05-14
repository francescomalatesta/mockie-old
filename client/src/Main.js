'use strict';

new Vue({
    el: '#application',
    data: {
        fields: [
            { name: "id", type: "random.uuid" },
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
        chosenFieldTypeCategory: 0
    },
    components: {
        sidebar: window.VueStrap.aside,
        accordion: window.VueStrap.accordion,
        panel: window.VueStrap.panel
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
            
            this.showSidebar = false;
        }
    }
});

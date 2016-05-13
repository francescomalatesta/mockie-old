'use strict';

new Vue({
    el: '#application',
    data: {
        items_count: 100,
        output_format: 'json',
        fields: [
            { name: "first_name", type: null },
            { name: "last_name", type: null },
            { name: "email", type: null }
        ],

        showSidebar: false,
        currentlySelectedField: null
    },
    components: {
        sidebar: window.VueStrap.aside
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
        }
    }
});

<template>
    <sidebar :show.sync="showFieldsSetsSidebar" placement="right" header="Choose Fields Set" :width="550">
        <div class="row">
            <div class="col-md-12">
                <h3>Choose a fields set from your saved collection.</h3>

                <hr />

                <div v-for="set in fieldsSets">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="set-name">{{ set.name }}</h4>
                            <p class="set-fields"><i>{{ set.fields | show_names }}</i></p>
                        </div>
                        <div class="col-md-3">
                            <p><button class="btn btn-success form-control" v-on:click="useSavedFieldsSet($index)">Use Set</button></p>
                        </div>
                        <div class="col-md-3">
                            <p><button class="btn btn-danger form-control" v-on:click="deleteFieldsSet(set._id)">Trash</button></p>
                        </div>
                    </div>

                    <hr class="set-separator" />
                </div>

                <p v-if="fieldsSets.length == 0"><i>Oops, no saved sets right now! To save one, just choose the fields you want, and then click on "Save Fields Set".</i></p>
            </div>
        </div>
    </sidebar>
</template>

<style>
</style>

<script>
    export default {
        data: function () {
            return {
                fieldsSets: [],
                showFieldsSetsSidebar: false
            };
        },
        components: {
            sidebar: window.VueStrap.aside
        },
        http: {
            root: ''
        },
        ready: function () {
            this.loadFieldsSets();
        },
        methods: {
            openSidebar: function () {
                this.showFieldsSetsSidebar = true;
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
                this.$dispatch('change-fields', this.fieldsSets[index].fields);
            },

            saveCurrentSet: function (currentFieldsSet) {
                var setName = prompt("Please enter a name for your fields set:", "My Set Name");

                this.$http({url: 'http://localhost:3000/add-set', method: 'POST', data: {
                    fields: currentFieldsSet,
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
        },
        events: {
            'open-fields-sets': function () {
                this.openSidebar();
            },
            'save-current-set': function (currentFieldsSet) {
                this.saveCurrentSet(currentFieldsSet);
            }
        }
    }
</script>

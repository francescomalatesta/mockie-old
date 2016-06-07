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
    import axios from 'axios';
    import { aside } from 'vue-strap';

    export default {
        data() {
            return {
                fieldsSets: [],
                showFieldsSetsSidebar: false
            };
        },
        ready: function () {
            this.loadFieldsSets();
        },
        components: {
            sidebar: aside
        },
        methods: {
            openSidebar: function () {
                this.showFieldsSetsSidebar = true;
            },
            loadFieldsSets: function () {
                let httpClient = axios.create({});
                let that = this;

                httpClient.get('http://localhost:3000/fields-sets')
                        .then(function(response){
                            that.fieldsSets = response.data;
                        })
                        .catch(function(error){
                            alert('Errors while retrieving the fields sets list.');
                        });
            },
            useSavedFieldsSet : function (index) {
                this.showFieldsSetsSidebar = false;
                this.$dispatch('change-fields', this.fieldsSets[index].fields);
            },
            saveCurrentSet: function (currentFieldsSet) {
                let setName = prompt("Please enter a name for your fields set:", "My Set Name");

                let httpClient = axios.create({});
                let that = this;

                httpClient.post('http://localhost:3000/add-set', {
                    fields: currentFieldsSet,
                    name: setName
                }).then(function (response) {
                    alert('Saved!');
                    that.loadFieldsSets();
                }).catch(function (error) {
                    alert('Some issues occurred during the save procedure. Try again.');
                });
            },

            deleteFieldsSet: function (setId) {
                if(confirm('Are you sure to delete this saved set?')) {
                    let httpClient = axios.create({});
                    let that = this;

                    httpClient.get('http://localhost:3000/delete-set/' + setId)
                            .then(function (response) {
                                that.loadFieldsSets();
                            })
                            .catch(function (error) {
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

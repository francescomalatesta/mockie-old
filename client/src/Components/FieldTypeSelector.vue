<template>
    <sidebar :show.sync="showSidebar" placement="right" header="Choose Field Type" :width="550">
        <div class="row">
            <div class="col-md-12">
                <h3>Choose the type for the <b>"{{ currentlySelectedFieldName }}"</b> field.</h3>

                <hr>

                <p>
                    <select class="form-control" v-model="chosenFieldTypeCategory">
                        <option value="{{ $index }}" v-for="fieldTypeCategory in availableFieldTypeCategories">
                            {{ fieldTypeCategory.name }}
                        </option>
                    </select>
                </p>

                <hr />

                <h3>Category: {{ availableFieldTypeCategories[chosenFieldTypeCategory].name }}</h3>
                <p v-for="type in availableFieldTypeCategories[chosenFieldTypeCategory].types">
                    <button class="btn btn-default form-control" v-on:click="changeFieldType($index)">{{ type.name }}</button>
                </p>
            </div>
        </div>
    </sidebar>
</template>

<style>
</style>
<script>
    import { aside } from 'vue-strap';
    import { fieldTypeCategories } from '../Fields/AvailableFields';

    export default {
        data() {
            return {
                currentlySelectedField: 0,
                currentlySelectedFieldName: '',

                chosenFieldTypeCategory: 0,
                availableFieldTypeCategories: fieldTypeCategories,

                showSidebar: false
            }
        },
        components: {
            sidebar: aside
        },
        methods: {
            changeFieldType: function (index) {
                let type =
                        this.availableFieldTypeCategories[this.chosenFieldTypeCategory].slug +
                        '.' +
                        this.availableFieldTypeCategories[this.chosenFieldTypeCategory].types[index].slug;

                let typeLabel =
                        this.availableFieldTypeCategories[this.chosenFieldTypeCategory].name +
                        ' > ' +
                        this.availableFieldTypeCategories[this.chosenFieldTypeCategory].types[index].name;

                this.$dispatch('change-field-type', {
                    index: this.currentlySelectedField,
                    type: type,
                    typeLabel: typeLabel
                });

                this.showSidebar = false;
            }
        },
        events: {
            'select-field-type': function (selectedFieldData) {
                this.currentlySelectedField = selectedFieldData.index;
                this.currentlySelectedFieldName = selectedFieldData.name;

                this.showSidebar = true;
            }
        }
    }
</script>

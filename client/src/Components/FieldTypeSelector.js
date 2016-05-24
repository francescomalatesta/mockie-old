'use strict';

module.exports = function () {
    return Vue.extend({
        data: function () {
            return {
                currentlySelectedField: 0,
                currentlySelectedFieldName: '',

                chosenFieldTypeCategory: 0,
                availableFieldTypeCategories: require('../Fields/AvailableFields').fieldTypeCategories,

                showSidebar: false
            }
        },
        components: {
            sidebar: window.VueStrap.aside
        },
        template: `<sidebar :show.sync="showSidebar" placement="right" header="Choose Field Type" :width="550">
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
        </sidebar>`,
        methods: {
            changeFieldType: function (index) {
                var type =
                    this.availableFieldTypeCategories[this.chosenFieldTypeCategory].slug +
                    '.' +
                    this.availableFieldTypeCategories[this.chosenFieldTypeCategory].types[index].slug;

                var typeLabel =
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

                console.log(selectedFieldData);

                this.currentlySelectedField = selectedFieldData.index;
                this.currentlySelectedFieldName = selectedFieldData.name;

                this.showSidebar = true;
            }
        }
    });
};
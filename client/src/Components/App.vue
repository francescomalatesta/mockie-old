<template>
    <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <h1>Mockie!</h1>
                    <h2 class="subtitle">Random Data Generator</h2>
                </li>
                <li>
                    <a href="#" v-on:click="this.$broadcast('open-fields-sets')">Fields Sets</a>
                </li>
            </ul>
        </div>

        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Hey there.</h1>
                        <p>Time to generate some random data, baby!</p>

                        <hr />

                        <div>
                            <div class="row">
                                <div class="col-md-7">
                                    <h2>Fields</h2>
                                    <p>1. Choose your fields and their types.</p>

                                    <div id="fields">
                                        <div class="row field" v-for="field in fields" v-on:keyup="this.$broadcast('refresh-preview', fields)">
                                            <div class="col-md-5">
                                                <input type="text" class="form-control" placeholder="Field Name..." v-model="field.name" />
                                            </div>
                                            <div class="col-md-5">
                                                <button class="btn btn-info form-control" v-on:click="this.$broadcast('select-field-type', {index: $index, name: field.name})">
                                                    <span v-if="field.type === null">Choose Type</span>
                                                    <span v-else>Chosen Type: {{ field.typeLabel }}</span>
                                                </button>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-danger form-control" v-on:click="removeField($index)">Remove</button>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-3">
                                                <button class="btn btn-default form-control" v-on:click="this.$broadcast('save-current-set', fields)">Save Fields Set</button>
                                            </div>

                                            <div class="col-md-9">
                                                <button class="btn btn-success form-control" v-on:click="addField">+ Add Field</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <preview-box></preview-box>
                                </div>
                            </div>

                            <hr />

                            <div class="row">
                                <div class="col-md-6">
                                    <h3>Count</h3>
                                    <p>3. How many items you want to generate?</p>
                                    <p><input type="text" class="form-control" placeholder="Items Count..." v-model="itemsCount" /></p>
                                </div>
                                <div class="col-md-6">
                                    <output-format-selector :output_format.sync="outputFormat"></output-format-selector>
                                </div>
                            </div>

                            <hr />

                            <div class="row">
                                <div class="col-md-12">
                                    <generator :fields.sync="fields" :items_count.sync="itemsCount" :output_format.sync="outputFormat"></generator>
                                </div>
                            </div>

                            <field-type-selector></field-type-selector>
                            <fields-sets></fields-sets>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    var FieldTypeSelector = require('./FieldTypeSelector.vue');
    var OutputFormatSelector = require('./OutputFormatSelector.vue');
    var FieldsSets = require('./FieldsSets.vue');
    var PreviewBox = require('./PreviewBox.vue');
    var Generator = require('./Generator.vue');

    var config = require('../config');

    export default{
        data: function(){
            return {
                fields: config.defaultFields,
                itemsCount: config.defaultItemsCount,
                outputFormat: config.defaultOutputFormat
            };
        },
        components: {
            'preview-box': PreviewBox,
            'field-type-selector': FieldTypeSelector,
            'output-format-selector': OutputFormatSelector,
            'fields-sets': FieldsSets,
            'generator': Generator
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
            }
        },
        events: {
            'change-fields': function (chosenFieldsSet) {
                this.fields = chosenFieldsSet;
                this.$broadcast('refresh-preview', this.fields);
            },
            'change-field-type': function (fieldData) {
                var fields = this.fields;

                fields[fieldData.index].type = fieldData.type;
                fields[fieldData.index].typeLabel = fieldData.typeLabel;

                this.fields = fields;

                this.$broadcast('refresh-preview', this.fields);
            }
        }
    }
</script>

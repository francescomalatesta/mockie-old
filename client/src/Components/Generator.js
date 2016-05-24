'use strict';

module.exports = function () {
    return Vue.extend({
        data: function () {
            return {
                isGenerating: false
            }
        },
        props: ['fields', 'items_count', 'output_format'],
        template: `<button class="btn btn-success form-control generateButton" v-on:click="generate">
            <span v-if="isGenerating">Generating your file, please wait...</span>
            <span v-else>Generate {{ items_count }} items in one nice file!</span>
        </button>`,
        methods: {
            generate: function () {
                var canGenerate = true;
                var fieldsArray = [];

                for(var c in this.fields){
                    var item = this.fields[c];

                    if(item.type === null){
                        canGenerate = false;
                    }

                    if(item.name === '') {
                        canGenerate = false;
                    }
                }

                if(canGenerate) {
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
            }
        },
        http: {
            root: ''
        }
    });
};

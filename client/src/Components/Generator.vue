<template>
    <button class="btn btn-success form-control generateButton" v-on:click="generate">
        <span v-if="isGenerating">Generating your file, please wait...</span>
        <span v-else>Generate {{ items_count }} items in one nice file!</span>
    </button>
</template>

<style>
</style>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                isGenerating: false
            }
        },
        props: ['fields', 'items_count', 'output_format'],
        methods: {
            generate: function () {
                let canGenerate = true;
                let fieldsArray = [];

                for(let c in this.fields){
                    let item = this.fields[c];

                    if(item.type === null){
                        canGenerate = false;
                    }

                    if(item.name === '') {
                        canGenerate = false;
                    }
                }

                if(canGenerate) {
                    for(let i in this.fields){
                        fieldsArray.push({
                            name: this.fields[i].name,
                            type: this.fields[i].type
                        });
                    }

                    this.isGenerating = true;

                    let httpClient = axios.create({});
                    let that = this;

                    httpClient.post('http://localhost:3000/generate', {
                        fields: fieldsArray,
                        count: this.items_count,
                        output: this.output_format
                    }).then(function (response) {
                        that.isGenerating = false;
                        window.location.href = response.data.url;
                    }).catch(function () {
                        alert('Some issues occurred during the generation procedure. Try again.');
                    });
                }
            }
        }
    }
</script>

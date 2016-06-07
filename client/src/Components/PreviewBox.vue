<template>
    <h2>Preview</h2>
    <p>2. Here's an example of what you're going to generate.</p>
    <pre>{{ previewContent | json }}</pre>
</template>

<style>
</style>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                previewContent: ''
            }
        },
        methods: {
            refreshPreview: function (currentFieldsSet) {
                let mustRefresh = true;
                let fieldsArray = [];

                for(let c in currentFieldsSet){
                    let item = currentFieldsSet[c];

                    if(item.type === null){
                        mustRefresh = false;
                    }

                    if(item.name === '') {
                        mustRefresh = false;
                    }
                }

                if(mustRefresh) {
                    for(let i in currentFieldsSet){
                        fieldsArray.push({
                            name: currentFieldsSet[i].name,
                            type: currentFieldsSet[i].type
                        });
                    }

                    let httpClient = axios.create({});
                    let that = this;

                    httpClient.post('http://localhost:3000/preview', {
                        fields: fieldsArray
                    }).then(function (response) {
                        that.previewContent = response.data;
                    }).catch(function () {
                        alert('Some issues occurred during preview generation. Try again.');
                    });
                }
            }
        },
        events: {
            'refresh-preview': function (currentFieldsSet) {
                this.refreshPreview(currentFieldsSet);
            }
        }
    }
</script>

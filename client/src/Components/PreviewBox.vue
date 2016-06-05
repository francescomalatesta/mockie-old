<template>
    <h2>Preview</h2>
    <p>2. Here's an example of what you're going to generate.</p>
    <pre>{{ previewContent | json }}</pre>
</template>

<style>
</style>

<script>
    export default {
        data: function () {
            return {
                previewContent: ''
            };
        },
        methods: {
            refreshPreview: function (currentFieldsSet) {
                var mustRefresh = true;
                var fieldsArray = [];

                for(var c in currentFieldsSet){
                    var item = currentFieldsSet[c];

                    if(item.type === null){
                        mustRefresh = false;
                    }

                    if(item.name === '') {
                        mustRefresh = false;
                    }
                }

                if(mustRefresh) {
                    for(var i in currentFieldsSet){
                        fieldsArray.push({
                            name: currentFieldsSet[i].name,
                            type: currentFieldsSet[i].type
                        });
                    }

                    this.$http({url: 'http://localhost:3000/preview', method: 'POST', data: {
                        fields: fieldsArray
                    }}).then(function (response) {
                        this.previewContent = response.data;
                    }, function (response) {
                        this.previewContent = 'Errors. Try again.';
                    });
                }
            }
        },
        events: {
            'refresh-preview': function (currentFieldsSet) {
                this.refreshPreview(currentFieldsSet);
            }
        }
    };
</script>

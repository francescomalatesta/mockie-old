'use strict';

module.exports = function () {
    return Vue.extend({
        data: function () {
            return {
                availableOutputFormats: require('../config').availableOutputFormats
            }
        },
        props: ['output_format'],
        template: `<h3>Output Format</h3>
            <p>4. Choose the output format for your generated data.</p>
            <p>
                <select class="form-control" v-model="output_format">
                    <option v-for="format in availableOutputFormats" value="{{ format.extension }}">{{ format.name }}</option>
                </select>
            </p>`
    });
};

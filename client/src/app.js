'use strict';

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap/dist/css/bootstrap-theme.min.css');

require('../assets/css/style.css');

require('../assets/fonts/Roboto-Bold.ttf');
require('../assets/fonts/Roboto-Italic.ttf');
require('../assets/fonts/Roboto-Light.ttf');
require('../assets/fonts/Roboto-Regular.ttf');

import Vue from 'vue';
import App from './Components/App.vue';

Vue.filter('show_names', function (fields) {
    return fields.map(function (field) {
        return field.name;
    }).join(', ');
});

new Vue({
    el: 'body',
    components: {
        'app': App
    }
});

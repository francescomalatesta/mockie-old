'use strict';

// Use vue-resource to make http calls
Vue.use(require('vue-resource'));

// Load filters
require('./Filters/ShowNames')();

var App = require('./Components/App.vue');

new Vue({
    el: 'body',
    components: {
        'app': App
    }
});

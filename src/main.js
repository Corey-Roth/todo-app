// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';
import store from './store';
import App from './App';

Vue.use(Vuex);

localforage.config({
  name: 'to-do'
});

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    template: '<App/>',
    components: { App },
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        listCount: 0,
    },

    mutations: {
        increment(state) {
            listCount++;
        },
    },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },
});

export default store;

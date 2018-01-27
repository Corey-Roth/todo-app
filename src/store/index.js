import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';
import { state, mutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
});

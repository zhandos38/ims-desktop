import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import invoice from "./invoice";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    auth,
    invoice
  }
});

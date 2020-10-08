import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import invoice from "./invoice";
import supplier from "./supplier";
import category from "./category";
import product from "./product";
import customer from "./customer";
import staff from "./staff";
import order from "./order";
import cashbox from "./cashbox";
import shift from "./shift";
import revision from "./revision";
import cashboxTransactions from "./cashboxTransaction";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    auth,
    invoice,
    supplier,
    product,
    category,
    customer,
    staff,
    order,
    cashbox,
    shift,
    revision,
    cashboxTransactions
  }
});

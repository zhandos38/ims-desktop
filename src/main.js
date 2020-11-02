import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate/src";
import Paginate from "vuejs-paginate";
import dateFilter from "./filters/date.filter";
import VueToast from "vue-toast-notification";
import Loader from "@/components/app/Loader";
import "bootstrap/dist/js/bootstrap.min";
import "vue-toast-notification/dist/theme-default.css";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import VueMask from "v-mask";
import { VueMaskFilter } from "v-mask";
import Printer from "./plugins/printer";
import Formatter from "./plugins/formatter";

Vue.config.productionTip = false;

Vue.use(VueNumberInput);
Vue.use(Vuelidate);
Vue.use(VueMask);
Vue.use(VueToast, {
  position: "top-right"
});
Vue.use(Printer);
Vue.use(Formatter);

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Vue.filter("date", dateFilter);
Vue.filter("VMask", VueMaskFilter);
Vue.filter("number", value => value.toFixed(2));

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: "login" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

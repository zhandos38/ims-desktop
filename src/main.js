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
import { VueMaskFilter } from 'v-mask';

Vue.config.productionTip = false;

Vue.use(VueNumberInput);
Vue.use(Vuelidate);
Vue.use(VueMask);
Vue.use(VueToast, {
  position: "top-right"
});

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Vue.filter("date", dateFilter);
Vue.filter("VMask", VueMaskFilter);
Vue.filter("number", value => value.toFixed(2));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

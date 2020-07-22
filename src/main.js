import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate/src";
import Paginate from 'vuejs-paginate';
import dateFilter from "./filters/date.filter";
import VueToast from 'vue-toast-notification';
import Loader from '@/components/app/Loader';
import "bootstrap/dist/js/bootstrap.min";
import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false;

Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

Vue.use(VueToast, {
  position: 'top-right'
});

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

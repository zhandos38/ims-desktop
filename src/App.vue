<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import FullLayout from "@/layouts/FullLayout";
import store from "./store";
import Vue from "vue";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    }
  },
  components: {
    AuthLayout,
    MainLayout,
    FullLayout
  },
  mounted() {
    const interval = setInterval(function() {
      const date = new Date();
      const expireDate = new Date(store.getters.getExpireDate);
      expireDate.setDate(expireDate.getDate() - 3);
      if (date >= expireDate) {
        Vue.$toast.error("Срок лицензии истекает, пожалуйста продлите");
      }
    }, 5000);
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "./assets/css/style.css";

#app {
  height: 100vh;
}
</style>

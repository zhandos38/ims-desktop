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

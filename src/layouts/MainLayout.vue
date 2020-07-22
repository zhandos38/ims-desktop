<template>
  <div class="app-site">
    <Loader v-if="loading" />
    <div v-else>
      <Navbar />
      <div class="wrap">
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import messages from "../utils/messages"

export default {
  name: "MainLayout",
  data: () => ({
    loading: true
  }),
  components: {
    Navbar
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$toast.open(messages[this.$route.query.message]);
    }

    this.loading = false
  }
};
</script>

<style scoped>
  .wrap {
    height: auto;
    margin: 0 auto -60px;
    padding: 20px 30px 80px;
  }
</style>

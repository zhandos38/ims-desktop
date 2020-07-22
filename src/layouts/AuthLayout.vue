<template>
  <div class="site-login">
    <div class="site-login__left">
      <div class="site-login__left-bg"></div>
      <div class="site-login__logo-wrapper">
        <img class="site-login__logo" src="/img/logo.svg" />
      </div>
    </div>
    <div class="site-login__right">
      <router-view />
      <div class="site-login__right-bg"></div>
    </div>
  </div>
</template>

<script>
import messages from "../utils/messages"

export default {
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$toast.open(messages[this.$route.query.message]);
    }
  }
}
</script>

<style scoped>
.site-login {
  height: 100%;
  width: 100%;
}

.site-login__left {
  background: linear-gradient(180deg, #009ffd 0%, #2a2a72 100%);
  height: 100%;
  width: 55%;
  float: left;
  position: relative;
}
.site-login__left-bg {
  background-image: url(/img/line.png);
  height: 41%;
  width: 100%;
  margin-top: -4%;
  margin-bottom: 50px;
  background-size: cover;
  background-position: center;
}

.site-login__right {
  height: 100%;
  width: 45%;
  float: right;
  position: relative;
  background-color: #2a303b !important;
}
.site-login__right a {
  background-color: #323944;
  border: 1px solid #323944;
}
.site-login__right-bg {
  background-image: url(/img/right-line.png);
  height: 32%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0.2;
  background-size: cover;
}

.site-login__logo {
  height: 130px;
}

.site-login__logo-wrapper {
  text-align: center;
  display: block;
}

@media screen and (max-width: 992px) {
  .site-login__right {
    width: 100%;
  }

  .site-login__left {
    display: none;
  }
}
</style>

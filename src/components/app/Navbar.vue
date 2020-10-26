<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="user-info">
        <div class="dropdown">
          <div
            class="user-info__btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user"></i>
            <p class="user-info__name">{{ user.username }}</p>
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="dropdown-item" to="/profile"
              >Профиль</router-link
            >
            <a class="dropdown-item" href="#" @click.prevent="logout">Выйти</a>
          </div>
        </div>
        <div class="user-info__logo"></div>
        <div class="user-info__datetime">{{ date | date("datetime") }}</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    date: new Date(),
    interval: null,
    user: {
      username: null
    }
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.user = this.$store.getters.user;
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
nav {
  padding: 10px 0;
  background: #323944 !important;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  border-bottom: none !important;
}

.user-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.user-info__btn {
  font-size: 14px;
  color: #ddd !important;
  padding-top: 5px;
  font-weight: 200;
  display: inline-flex;
}
.user-info__name {
  padding-left: 10px;
}
.user-info__balance {
  padding-left: 10px;
}

.user-balance__btn {
  font-size: 14px;
  font-weight: 300;
  color: #ddd !important;
  padding-top: 5px;
  display: inline-flex;
}

.dropdown-toggle::after {
  margin-top: 8px;
  margin-left: 10px;
}

.user-info__datetime {
  color: #fff;
}
.user-info__logo {
  background: url(/img/logo.svg);
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 38px;
}
</style>

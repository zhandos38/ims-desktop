<template>
  <div class="wrapper">
    <div class="site-login__form">
      <img src="/img/left.svg" />
      <p class="site-login__title">Авторизация</p>
      <p class="site-login__text">Войдите чтобы начать сессию</p>

      <form action="#" @submit.prevent="submitHandler">
        <div
          class="form-group"
          :class="{ 'has-error': $v.username.$dirty && !$v.username.required }"
        >
          <input
            class="form-control"
            type="text"
            id="username"
            name="username"
            v-model.trim="username"
            placeholder="Введите логин"
          />
        </div>

        <div
          class="form-group"
          :class="{
            'has-error':
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        >
          <input
            class="form-control"
            type="password"
            id="password"
            name="password"
            v-model.trim="password"
            placeholder="Введите пароль"
          />
          <small
            class="help-block-error"
            v-if="$v.password.$dirty && !$v.password.minLength"
            >Пароль должен состоять как минимум из 6 символов</small
          >
        </div>
        <div class="form-group" v-if="showToken">
          <input
            class="form-control"
            type="text"
            id="token"
            name="token"
            v-model.trim="token"
            placeholder="Введите токен"
          />
        </div>
        <div class="form-group">
          <button class="site-login__button" type="submit">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    username: null,
    password: null,
    token: null,
    showToken: true
  }),
  validations: {
    username: { required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      let userData = {
        username: this.username,
        password: this.password,
        token: this.token
      };

      try {
        await this.$store.dispatch("login", userData);
      } catch (e) {
        console.error("Login failed");
        return;
      }

      await this.$router.push("/?message=login");
    },
    async check() {
      const result = await (
        await fetch(`http://localhost:4040/user/check`)
      ).json();

      if (!result) {
        this.showToken = true;
      }
    }
  },
  async mounted() {
    if (this.$store.getters.user.id) {
      await this.$router.push("/?message=login");
    }

    await this.check();
  }
};
</script>

<style scoped>
.login-title {
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
}

.login-text {
  color: #fff;
  margin-bottom: 20px;
}

.site-login__form input[type="text"] {
  background: #323944;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
}
.site-login__form input[type="password"] {
  background: #323944;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
}
.site-login__form .checkbox {
  color: #fff;
}
.site-login__form {
  width: 55%;
  padding-top: 140px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.site-login__form img {
  display: none;
}

.site-login__button {
  font-family: "Roboto", sans-serif;
  margin-top: auto;
  background: #009ffd;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  font-size: 13px;
  width: 100%;
  display: block;
}
.site-login__button:hover {
  text-decoration: none;
  background-color: #0288d1b0;
  transition: 0.5s;
}

.modal-body p,
a {
  font-size: 13px;
}

.site-login__title {
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
  font-family: "Roboto", sans-serif;
}

.site-login__text {
  font-family: "Roboto", sans-serif;
  color: #fff;
  margin-bottom: 20px;
}

@media screen and (max-width: 992px) {
  .site-login__form {
    width: 60%;
    z-index: 2;
    position: relative;
    padding-top: 20px;
  }
  .back-button {
    z-index: 3;
  }
  img {
    height: 90px !important;
  }
  .site-login__form img {
    display: inline-block;
    height: 60px !important;
    margin-bottom: 25px;
  }
}
</style>

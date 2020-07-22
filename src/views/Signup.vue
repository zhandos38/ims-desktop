<template>
    <div>
      <router-link to="/login" class="back-button"><i class="fas fa-angle-left"></i> Назад</router-link>
      <div class="signup-block text-center">
        <p class="signup-title">Регистрация</p>
        <p class="signup-text">Для регистрации на платформе IMS заполните форму</p>

        <form @submit.prevent="submitHandler">
          <div class="form-group">
            <input
                    class="form-control"
                    type="text"
                    id="iin"
                    name="username"
                    placeholder="Введенный ИИН/БИН будет вашим логином"
            />
          </div>

          <div id="res"></div>

          <div class="form-group">
            <input
                    class="form-control"
                    type="text"
                    id="full-name"
                    name="full-name"
                    placeholder="Введите ваши Ф.И.О."
            />
          </div>

          <div class="form-group">
            <input
                    class="form-control"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Введите ваш E-mail"
            />
          </div>

          <div class="form-group">
            <input
                    class="form-control"
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Введите ваш контактный телефон"
            />
          </div>

          <div class="form-group form-password__input">
            <input
                    class="form-control input-password login__page_input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
            />
            <span class="form-password__input-btn"><i class="fa fa-eye" id="eye" aria-hidden="true"></i></span>
          </div>

          <div class="form-group form-password__input">
            <input
                    class="form-control input-password login__page_input"
                    type="password"
                    id="password-repeat"
                    name="password"
                    placeholder="Подтвердите пароль"
            />
            <span class="form-password-repeat__input-btn"><i class="fa fa-eye" id="eye-slash" aria-hidden="true"></i></span>
          </div>

          <div class="terms-block">
            <input id="checkbox" class="checkbox-input" type="checkbox" name="checkbox">
            <label for="checkbox" class="checkbox-label">Я ознакомлен(а) и принимаю условия <a href="/ims_policy.pdf" target="_blank">Пользовательского соглашения</a></label>
            <div class="form-group submit-btn">
              <button class="submit-button" type="submit">Зарегистрироваться</button>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: "Signup",
  methods: {
    submitHandler() {
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
  .signup-title {
    font-size: 28px;
    text-transform: uppercase;
    color: #fff;
  }

  .signup-text {
    color: #fff;
    margin-bottom: 20px;
  }

  .signup-block {
    width: 85%;
    padding-top: 100px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .signup-block input[type="text"] {
    background: #323944;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
  }
  .signup-block input[type="password"] {
    background: #323944;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
  }
  .signup-block .checkbox {
    color: #fff;
  }
  .signup-block img {
    display: none;
  }

  .signup-block__button {
    font-family: "Roboto", sans-serif;
    margin-top: auto;
    background: #009ffd;
    border-radius: 5px;
    color: #fff;
    padding: 8px;
    font-size: 15px;
    width: 100%;
    display: block;
  }
  .signup-block__button:hover {
    text-decoration: none;
    background-color: #0288d1b0;
    transition: 0.5s;
  }

  .back-button {
    top: 1.5%;
    left: 1.5%;
    z-index: 3;
    font-weight: 400;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    position: absolute;
    background-color: #323944;
    border: 1px solid #323944;
    text-decoration: none;
  }
  .back-button:hover {
    text-decoration: none;
    background: #a8acb43b;
    color: #fff;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  }

  .modal-body p,
  a {
    font-size: 13px;
  }

  .submit-button {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: auto;
    background: #009FFD;
    border-radius: 5px;
    color: #fff;
    padding: 8px;
    font-size: 15px;
    transition: .5s;
  }

  .submit-button:hover {
    text-decoration: none;
    background-color: #0288d1b0;
  }

  .form-password__input {
    position: relative;
  }

  .form-password__input-btn {
    webkit-user-select: none;
    -webkit-transition: .3s;
    -moz-user-select: none;
    -ms-user-select: none;
    -moz-transition: .3s;
    position: absolute;
    -o-transition: .3s;
    text-align: center;
    user-select: none;
    line-height: 38px;
    cursor: pointer;
    transition: .3s;
    font-size: 18px;
    color: #646e73;
    width: 40px;
    right: 3px;
    top: -2px;
  }

  .form-password-repeat__input-btn {
    webkit-user-select: none;
    -webkit-transition: .3s;
    -moz-user-select: none;
    -ms-user-select: none;
    -moz-transition: .3s;
    position: absolute;
    -o-transition: .3s;
    text-align: center;
    user-select: none;
    line-height: 38px;
    cursor: pointer;
    transition: .3s;
    font-size: 18px;
    color: #646e73;
    width: 40px;
    right: 3px;
    top: -2px;
  }

  .checkbox-input {
    margin: 4px 0 0;
    float: left;
  }
  .checkbox-label {
    float: left;
    margin-left: 5px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 12px;
    padding-top: 3px;
  }

  @media screen and (max-width: 992px) {
    .signup-block {
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
    .signup-block img {
      display: inline-block;
      height: 60px !important;
      margin-bottom: 25px;
    }
  }
</style>

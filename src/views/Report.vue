<template>
  <div>
    <div class="object__title-wrapper">
      <h1 class="object__title text-center">Отчеты</h1>
    </div>
    <div class="menu">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/">
            <div class="menu-link__container">
              <div class="menu-link__icon">
                <i class="fas fa-arrow-left"></i>
              </div>
              <div class="menu-link__title">
                Назад
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/order">
            <div class="menu-link__container">
              <div class="menu-link__icon">
                <i class="fas fa-clipboard"></i>
              </div>
              <div class="menu-link__title">
                Заказы / Чеки
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="#">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-boxes" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Отчеты по складу
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/shift">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-user-clock"></i>
              </div>
              <div class="menu-link__title">
                Смены
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="#">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-cash-register"></i>
              </div>
              <div class="menu-link__title">
                Операции с кассой
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="#">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="far fa-calendar-alt" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Продажи по дням
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="#">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="far fa-calendar-alt" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Возвраты товаров
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    loading: true
  }),
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped>
.object__title-wrapper {
  font-size: 22px;
  position: relative;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
  color: #fff;
  font-weight: 600;
}

.menu-link {
  background: #323944;
  border-radius: 6px;
  border: 2px solid #9e9e9e;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  display: block;
  color: #fff;
  padding: 20px;
}
.menu-link:hover {
  text-decoration: none;
  background: #a8acb43b;
}
.menu-link__icon {
  float: left;
}
.menu-link i {
  color: #009ffd;
  font-size: 22px;
  margin-right: 15px;
}
.menu-link__title {
  font-weight: 500;
  font-size: 15px;
}
</style>

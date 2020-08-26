<template>
  <div>
    <div class="object__title-wrapper">
      <h1 class="object__title text-center">Объект</h1>
    </div>
    <div class="menu">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/report">
            <div class="menu-link__container">
              <div class="menu-link__icon">
                <i class="fas fa-chart-pie"></i>
              </div>
              <div class="menu-link__title">
                Отчеты
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/product">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-warehouse" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Склад
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/category">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="far fa-list-alt"></i>
              </div>
              <div class="menu-link__title">
                Категории
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/invoice">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-file-invoice" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Накладные
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/staff">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-address-card" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Сотрудники
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/customer">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-users" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Клиенты
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/supplier">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-industry" aria-hidden="true"></i>
              </div>
              <div class="menu-link__title">
                Поставщики
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="#">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-cogs"></i>
              </div>
              <div class="menu-link__title">
                Настройки объекта
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <router-link class="menu-link" to="/cashbox">
            <div class="menu-link__item">
              <div class="menu-link__icon">
                <i class="fas fa-cash-register"></i>
              </div>
              <div class="menu-link__title">
                Кассы
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
    this.loading = false
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
    color: #009FFD;
    font-size: 22px;
    margin-right: 15px;
  }
  .menu-link__title {
    font-weight: 500;
    font-size: 15px;
  }
</style>

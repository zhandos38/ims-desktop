<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/report"
          ><i class="fa fa-arrow-left"></i> Назад</router-link
        >
      </div>
      <h2>Отчет по складу</h2>
      <div class="app-container__body">
        <div class="row">
          <date-range-picker></date-range-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';


export default {
  name: "DateReport",
  data: () => ({
    loading: false,
  }),
  methods: {
    async setData() {
      this.loading = true;

      // const products = await (
      //   await fetch(`http://localhost:4040/product/get-all`)
      // ).json();

      this.loading = false;
    }
  },
  async mounted() {
    await this.setData();
  }
};
</script>

<style scoped>
table {
  color: #fff;
}
.report-item {
  padding: 15px 10px;
  border-radius: 6px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
}
.report-item--1 {
  background: #3c763da6;
}
.report-item--2 {
  background: #337ab78f;
}
.report-item--3 {
  background: #f0ad4ea6;
}
.report-item--4 {
  background: #f06c4e8c;
}
.report-item--5 {
  background: #5cb8897a;
}
</style>

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
          <date-range-picker v-model="dateRange"></date-range-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";

export default {
  name: "ProductReport",
  data: () => ({
    loading: false,
    dateRange: {
      startDate: "2019-12-26",
      endDate: "2019-12-28"
    }
  }),
  components: {
    DateRangePicker
  },
  methods: {}
};
</script>

<style scoped></style>

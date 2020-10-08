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
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="report-item report-item--1">
              <p>Итого наименований на складе</p>
              {{ totalCount }}
            </div>
          </div>
          <div class="col-md-4">
            <div class="report-item report-item--2">
              <p>Итого кол-во на складе</p>
              {{ totalQuantity | number }}
            </div>
          </div>
          <div class="col-md-4">
            <div class="report-item report-item--3">
              <p>Общая стоимость склада (Розница)</p>
              {{ totalRetailCost | number }}
            </div>
          </div>
          <div class="col-md-4">
            <div class="report-item report-item--4">
              <p>Общая стоимость склада (Закуп)</p>
              {{ totalTakeCost | number }}
            </div>
          </div>
          <div class="col-md-4">
            <div class="report-item report-item--5">
              <p>Ориентировочная прибыль</p>
              {{ totalRetailCost - totalTakeCost | number }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductReport",
  data: () => ({
    loading: false,
    totalCount: 0,
    totalQuantity: 0,
    totalRetailCost: null,
    totalTakeCost: null
  }),
  methods: {
    async setData() {
      this.loading = true;

      const products = await (
        await fetch(`http://localhost:4040/product/get-all`)
      ).json();

      console.log(products);

      this.totalCount = products.length;
      for (const product of products) {
        this.totalQuantity += parseFloat(product.quantity);
        this.totalRetailCost += parseFloat(product.quantity) * parseFloat(product.price_retail);
        this.totalTakeCost += parseFloat(product.quantity) * parseFloat(product.price_in);
      }

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

<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <router-link class="btn btn-success" to="/invoice-create"
        >Добавить накладную</router-link
      >
      <div>
        <small>Всего записей: {{ dataProvider.totalItems }}</small>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Номер входа</th>
            <th>Поставщик</th>
            <th>Под реал</th>
            <th>Статус</th>
            <th>Стоимость</th>
            <th>Время создания</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in dataProvider.records" v-bind:key="record.id">
            <td>{{ record.id }}</td>
            <td>{{ record.number_in }}</td>
            <td>{{ record.supplier_name }}</td>
            <td>{{ record.is_debt ? "Да" : "Нет" }}</td>
            <td>{{ record.status }}</td>
            <td>{{ record.cost }}</td>
            <td>{{ new Date(record.created_at * 1000).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      <Paginate
        v-model="page"
        :page-count="dataProvider.totalPages"
        :click-handler="changePageHandler"
        :prev-text="'«'"
        :next-text="'»'"
        :container-class="'pagination'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Invoice",
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    dataProvider: {
      currentPage: null,
      records: [],
      totalPages: 0,
      totalItems: 0
    },
    suppliers: []
  }),
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;
      console.log(this.page);
      this.setTable();
    },
    async setTable() {
      this.loading = true;
      await this.setSuppliers();

      console.log(this.suppliers);

      await this.$store.dispatch("fetchInvoices", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.invoice.dataProvider;
      this.dataProvider.records = this.dataProvider.records.map(record => {
        console.log(record);
        return {
          ...record,
          supplier_name: this.suppliers.find(c => c.id === record.supplier_id).name
        };
      });
      this.loading = false;
    },
    async setSuppliers() {
      await this.$store.dispatch("getSuppliers");
      this.suppliers = this.$store.state.supplier.list;
    }
  },
  async mounted() {
    if (this.$route.query.page) {
      this.page = +this.$route.query.page;
    }

    await this.setTable();
  }
};
</script>

<style scoped>
table {
  color: #fff;
}
</style>

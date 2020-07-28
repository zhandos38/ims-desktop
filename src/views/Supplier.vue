<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-info" to="/">Назад</router-link>
        <button class="btn btn-success" type="button" @click="showCreateSupplierModal = true">Добавить поставщиков</button>
      </div>
      <div>
        <small>Всего записей: {{ dataProvider.totalItems }}</small>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Номер телефона</th>
            <th>Время создание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in dataProvider.records" v-bind:key="record.id">
            <td>{{ ((page - 1) * pageSize) + ++index }}</td>
            <td>{{ record.name }}</td>
            <td v-if="record.phone">{{ record.phone | VMask('7(###)###-##-##') }}</td>
            <td v-else>Не указано</td>
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
    <SupplierModal v-if="showCreateSupplierModal" @close="supplierModalCloseHandler" />
  </div>
</template>

<script>
import SupplierModal from '@/components/SupplierModal';

export default {
  name: "Supplier",
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
    showCreateSupplierModal: false
  }),
  components: {
    SupplierModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchSuppliers", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.invoice.dataProvider;

      this.loading = false;
    },
    supplierModalCloseHandler() {
      this.showCreateSupplierModal = false;
      this.setTable();
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

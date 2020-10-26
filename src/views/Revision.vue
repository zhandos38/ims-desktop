<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/"
          ><i class="fa fa-arrow-left"></i> Назад</router-link
        >
        <router-link class="btn btn-outline-success" to="/revision-create">
          Создать <i class="fa fa-plus"></i>
        </router-link>
      </div>
      <div v-if="dataProvider.totalItems > 0">
        <div>
          <small>Всего записей: {{ dataProvider.totalItems }}</small>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Пользватель</th>
              <th>Сумма потерь</th>
              <th>Время проведения</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in dataProvider.records"
              v-bind:key="record.id"
            >
              <td>{{ (page - 1) * pageSize + ++index }}</td>
              <td>{{ record.User.full_name }}</td>
              <td>{{ record.amount }}</td>
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
      <div v-else>
        <p class="text-center">
          Данные отсутствуют
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Revision",
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    dataProvider: {
      currentPage: null,
      records: [],
      totalPages: 0,
      totalItems: 0
    }
  }),
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchRevisions", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.revision.dataProvider;

      this.loading = false;
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

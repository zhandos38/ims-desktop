<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/"
          ><i class="fa fa-arrow-left"></i> Назад</router-link
        >
      </div>
      <div v-if="dataProvider.totalItems > 0">
        <div>
          <small>Всего записей: {{ dataProvider.totalItems }}</small>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Наименование</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in dataProvider.records"
              v-bind:key="record.id"
            >
              <td>{{ (page - 1) * pageSize + ++index }}</td>
              <td>
                <button
                  class="btn btn-outline-info"
                  @click="openEditModal(record.id)"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </td>
              <td>{{ record.name }}</td>
              <td>{{ record.value }}</td>
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
  name: "Settings",
  computed: {
    dataProvider() {
      return (
        this.$store.state.supplier.dataProvider || {
          currentPage: null,
          records: [],
          totalPages: 0,
          totalItems: 0
        }
      );
    }
  },
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    selected: null,
    showModal: false
  }),
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchSettings", {
        page: this.page - 1,
        pageSize: this.pageSize
      });

      this.loading = false;
    },
    openEditModal(id) {
      this.selected = id;
      this.showModal = true;
    },
    async closeModalHandler() {
      await this.setTable();
      this.showModal = false;
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

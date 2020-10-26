<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/report"
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
              <th>Действия</th>
              <th>Кассир</th>
              <th>Касса</th>
              <th>Статус</th>
              <th>Время открытия</th>
              <th>Время закрытия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in dataProvider.records" v-bind:key="record.id">
              <td>
                <button
                  class="btn btn-outline-info"
                  @click="openViewModal(record.id)"
                >
                  <i class="fa fa-eye"></i>
                </button>
              </td>
              <td>{{ record.User.full_name }}</td>
              <td>{{ record.Cashbox.name }}</td>
              <td>{{ record.status ? "Включен" : "Отключен" }}</td>
              <td>{{ new Date(record.opened_at * 1000).toLocaleString() }}</td>
              <td>{{ new Date(record.closed_at * 1000).toLocaleString() }}</td>
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
    <ShiftModal
      :id="selected"
      v-if="showViewModal"
      @close="closeModalHandler"
    />
  </div>
</template>

<script>
import ShiftModal from "../components/ShiftModal";

export default {
  name: "Shift",
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    selected: null,
    showViewModal: false,
    dataProvider: {
      currentPage: null,
      records: [],
      totalPages: 0,
      totalItems: 0
    }
  }),
  components: {
    ShiftModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchShift", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.shift.dataProvider;
      console.log(this.dataProvider);

      this.loading = false;
    },
    openViewModal(id) {
      this.selected = id;
      this.showViewModal = true;
    },
    async closeModalHandler() {
      await this.setTable();
      this.showViewModal = false;
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

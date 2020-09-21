<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/"
          ><i class="fa fa-arrow-left"></i> Назад</router-link
        >
        <button
          class="btn btn-outline-success"
          type="button"
          @click="showCreateModal = true"
        >
          Создать <i class="fa fa-plus"></i>
        </button>
      </div>
      <div>
        <small>Всего записей: {{ dataProvider.totalItems }}</small>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Действия</th>
            <th>Наименование</th>
            <th>Статус</th>
            <th>Дата открытия</th>
            <th>Дата закрытия</th>
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
            <td>{{ record.name }}</td>
            <td>{{ record.balance }}</td>
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
    <!--        <CashboxModal v-if="openViewModal" @close="closeModalHandler" />-->
  </div>
</template>

<script>
Cas

export default {
  name: "CashboxTransactions",
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    selected: null,
    showModal: false,
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

      await this.$store.dispatch("fetchShift", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.shift.dataProvider;
      // this.dataProvider.records = this.dataProvider.records.map(record => {
      //   return {
      //     ...record,
      //     role_label: User.roles[record.role],
      //     status_label: User.statuses[record.status]
      //   };
      // });

      this.loading = false;
    },
    openViewModal(id) {
      this.selected = id;
      this.showModal = true;
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

<style scoped></style>

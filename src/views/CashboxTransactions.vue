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
              <th>Касса</th>
              <th>Пользователь</th>
              <th>Действия</th>
              <th>Сумма</th>
              <th>Смена</th>
              <th>Дата операции</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in dataProvider.records" v-bind:key="record.id">
              <td>
                <button
                  class="btn btn-outline-info"
                  @click="openViewModal(record)"
                >
                  <i class="fa fa-eye"></i>
                </button>
              </td>
              <td>{{ record.Cashbox.name }}</td>
              <td>{{ record.User.full_name }}</td>
              <td>{{ record.type ? "Внесение" : "Изъятие" }}</td>
              <td>{{ record.amount }}</td>
              <td>{{ record.shift_id }}</td>
              <td>{{ $formatter.date(record.created_at * 1000) }}</td>
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
    <CashboxTransactionModal
      v-if="showModal"
      :record="selected"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import CashboxTransactionModal from "../components/CashboxTransactionModal";

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
  components: {
    CashboxTransactionModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchCashboxTransactions", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.shift.dataProvider;
      console.log(this.dataProvider);
      // this.dataProvider.records = this.dataProvider.records.map(record => {
      //   return {
      //     ...record,
      //     role_label: User.roles[record.role],
      //     status_label: User.statuses[record.status]
      //   };
      // });

      this.loading = false;
    },
    openViewModal(record) {
      this.selected = record;
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

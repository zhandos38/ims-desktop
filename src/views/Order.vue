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
              <th>Номер чека</th>
              <th>Создал</th>
              <th>Клиент</th>
              <th>Сумма по чеку</th>
              <th>Сумма по чеку со скидкой</th>
              <th>Сумма скидки</th>
              <th>Оплачено наличкой</th>
              <th>Оплачено картой</th>
              <!--            <th>Метод оплаты</th>-->
              <th>Тип оплаты</th>
              <th>Статус</th>
              <th>В долг</th>
              <th>Сумма долга</th>
              <th>Дата создания</th>
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
              <td>{{ record.number }}</td>
              <td>{{ record.User ? record.User.full_name : "Не указано" }}</td>
              <td>
                {{ record.Customer ? record.Customer.full_name : "Не указано" }}
              </td>
              <td>{{ record.cost }}</td>
              <td>{{ record.discount_amount }}</td>
              <td>{{ record.cost_total }}</td>
              <td>{{ record.cash_amount }}</td>
              <td>{{ record.card_amount }}</td>
              <!--            <td>{{ record.method }}</td>-->
              <td>{{ record.pay_method_label }}</td>
              <td>{{ record.status_label }}</td>
              <td>{{ record.is_debt_label }}</td>
              <td>{{ record.debt_amount }}</td>
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
    <OrderModal
      v-if="showViewModal"
      :id="selected"
      @close="showViewModal = false"
    />
  </div>
</template>

<script>
import OrderModal from "../components/OrderModal";
import Order from "../utils/order";

export default {
  name: "Staff",
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
    OrderModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchOrder", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.order.dataProvider;

      this.dataProvider.records = this.dataProvider.records.map(record => {
        return {
          ...record,
          pay_method_label: Order.payMethod[record.pay_method],
          status_label: Order.status[record.status],
          is_debt_label: record.is_debt
            ? Order.isDebt[record.is_debt]
            : "Не указано"
        };
      });

      this.loading = false;
    },
    openViewModal(id) {
      this.selected = id;
      this.showViewModal = true;
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

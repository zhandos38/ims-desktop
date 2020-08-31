<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/"><i class="fa fa-arrow-left"></i> Назад</router-link>
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
            <th>#</th>
            <th>Действия</th>
            <th>Ф.И.О</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Время создание</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, index) in dataProvider.records"
            v-bind:key="record.id"
          >
            <td>{{ (page - 1) * pageSize + ++index }}</td>
            <td><button class="btn btn-outline-info" @click="openEditModal(record.id)"><i class="fa fa-pencil-alt"></i></button></td>
            <td>{{ record.full_name }}</td>
            <td>{{ record.role_label }}</td>
            <td>{{ record.status_label }}</td>
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
    <StaffModal
      v-if="showCreateModal"
      @close="closeModalHandler"
    />
    <StaffModal
      v-if="showUpdateModal"
      :id="selected"
      @close="closeModalHandler"
    />
  </div>
</template>

<script>
import StaffModal from "../components/StaffModal";
import User from "../utils/user";

export default {
  name: "Staff",
  data: () => ({
    loading: false,
    page: 1,
    pageSize: 20,
    selected: null,
    showCreateModal: false,
    showUpdateModal: false,
    dataProvider: {
      currentPage: null,
      records: [],
      totalPages: 0,
      totalItems: 0
    },
    statuses: [],
    roles: []
  }),
  components: {
    StaffModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      if (this.$route.query.page) {
        this.page = +this.$route.query.page;
      }

      await this.$store.dispatch("fetchStaff", {
        page: this.page - 1,
        pageSize: this.pageSize
      });
      this.dataProvider = this.$store.state.invoice.dataProvider;
      this.dataProvider.records = this.dataProvider.records.map(record => {
        return {
          ...record,
          role_label: User.roles[record.role],
          status_label: User.statuses[record.status]
        };
      });

      this.loading = false;
    },
    openEditModal(id) {
      this.selected = id;
      this.showUpdateModal = true;
    },
    async closeModalHandler() {
      await this.setTable();
      this.showUpdateModal = false;
      this.showCreateModal = false;
    }
  },
  async mounted() {
    await this.setTable();
  }
};
</script>

<style scoped>
table {
  color: #fff;
}
</style>

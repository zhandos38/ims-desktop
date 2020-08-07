<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-info" to="/"><i class="fa fa-arrow-left"></i> Назад</router-link>
        <button
          class="btn btn-success"
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
            <th>Наименование</th>
            <th>Номер телефона</th>
            <th>Время создание</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, index) in dataProvider.records"
            v-bind:key="record.id"
          >
            <td>{{ (page - 1) * pageSize + ++index }}</td>
            <td><button class="btn btn-info" @click="openEditModal(record.id)"><i class="fa fa-pencil-alt"></i></button></td>
            <td>{{ record.name }}</td>
            <td v-if="record.phone">
              {{ record.phone | VMask("7(###)###-##-##") }}
            </td>
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
    <SupplierModal
      v-if="showCreateModal"
      @close="closeModalHandler"
    />
    <SupplierModal
      v-if="showUpdateModal"
      :id="selected"
      @close="closeModalHandler"
    />
  </div>
</template>

<script>
import SupplierModal from "../components/SupplierModal";

export default {
  name: "Supplier",
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
    showCreateModal: false,
    showUpdateModal: false,
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

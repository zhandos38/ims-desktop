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
      <div v-if="dataProvider.totalItems > 0">
        <div>
          <small>Всего записей: {{ dataProvider.totalItems }}</small>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Действия</th>
              <th>Наименование</th>
              <th>Цвет</th>
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
                  class="table-btn btn btn-outline-info"
                  @click="openEditModal(record.id)"
                >
                  <i class="fa fa-pencil-alt"></i>
                </button>
                <button
                  class="table-btn btn btn-outline-info"
                  @click="openCategoryProductModal(record.id)"
                >
                  <i class="fa fa-link"></i>
                </button>
              </td>
              <td>{{ record.name }}</td>
              <td v-if="record.color">
                <div
                  :style="{
                    'background-color': record.color,
                    width: '100%',
                    height: '20px'
                  }"
                ></div>
              </td>
              <td v-else>Не указано</td>
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
    <CategoryModal v-if="showCreateModal" @close="closeModalHandler" />
    <CategoryModal
      v-if="showUpdateModal"
      :id="selected"
      @close="closeModalHandler"
    />
    <CategoryProductModal
      v-if="showCategoryProductModal"
      :id="selected"
      @close="showCategoryProductModal = false"
    />
  </div>
</template>

<script>
import CategoryModal from "@/components/CategoryModal";
import CategoryProductModal from "../components/CategoryProductModal";

export default {
  name: "Category",
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
    showCreateModal: false,
    showUpdateModal: false,
    showCategoryProductModal: false,
    selected: null
  }),
  components: {
    CategoryModal,
    CategoryProductModal
  },
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    async setTable() {
      this.loading = true;

      await this.$store.dispatch("fetchCategories", {
        page: this.page - 1,
        pageSize: this.pageSize
      });

      this.dataProvider = this.$store.state.category.dataProvider;

      this.loading = false;
    },
    openEditModal(id) {
      this.selected = id;
      this.showUpdateModal = true;
    },
    openCategoryProductModal(id) {
      this.selected = id;
      this.showCategoryProductModal = true;
    },
    async closeModalHandler() {
      await this.setTable();
      this.showCreateModal = false;
      this.showUpdateModal = false;
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

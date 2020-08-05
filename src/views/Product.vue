<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-info" to="/">Назад</router-link>
        <button class="btn btn-success" @click="showProductModal = true">
          Добавить товар
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
            <th>Штрихкод</th>
            <th>Наименование товара</th>
            <th>Ед/изм.</th>
            <th>Цена розничная</th>
            <th>Цена оптовая</th>
            <th>Оптовое количество</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Остаток на складе</th>
            <th>Статус</th>
            <th>Время добавление</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, index) in dataProvider.records"
            v-bind:key="record.id"
          >
            <td>{{ (page - 1) * pageSize + ++index }}</td>
            <td><button class="btn btn-info" @click="openProductEditModal(record.id)"><i class="fa fa-pencil-alt"></i></button></td>
            <td>{{ record.barcode }}</td>
            <td>{{ record.name }}</td>
            <td>{{ record.unit }}</td>
            <td>{{ record.price_retail }}</td>
            <td>{{ record.price_wholesale }}</td>
            <td>{{ record.wholesale_value }}</td>
            <td>{{ record.category_name }}</td>
            <td>{{ record.type ? "Да" : "Нет" }}</td>
            <td>{{ record.quantity }}</td>
            <td>{{ record.status ? "Да" : "Нет" }}</td>
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
    <ProductCreateModal v-if="showProductCreateModal" @close="handleProductCreateModalClose" />
    <ProductEditModal v-if="showProductEditModal" :id="selectedProduct" @close="showProductEditModal = false" />
  </div>
</template>

<script>
import ProductCreateModal from "../components/ProductCreateModal";
import ProductEditModal from "../components/ProductEditModal";

export default {
  name: "Invoice",
  components: {
    ProductCreateModal,
    ProductEditModal
  },
  data: () => ({
    selectedProduct: null,
    loading: false,
    page: 1,
    pageSize: 20,
    dataProvider: {
      currentPage: null,
      records: [],
      totalPages: 0,
      totalItems: 0
    },
    categories: [],
    showProductCreateModal: false,
    showProductEditModal: false
  }),
  methods: {
    changePageHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.page = page;

      this.setTable();
    },
    setTable: async function() {
      this.loading = true;
      await this.setCategories();

      await this.$store.dispatch("fetchProducts", {
        page: this.page - 1,
        pageSize: this.pageSize
      });

      this.dataProvider = this.$store.state.product.dataProvider;
      this.dataProvider.records = this.dataProvider.records.map(record => {
        let category = this.categories.find(c => c.id === record.category_id);

        return {
          ...record,
          category_name:
            typeof category !== "undefined" ? category.name : "Не указано"
        };
      });
      this.loading = false;
    },
    async setCategories() {
      await this.$store.dispatch("getCategories");
      this.categories = this.$store.state.category.list;
    },
    handleProductCreateModalClose() {
      this.setTable();
      this.showProductModal = false;
    },
    openProductEditModal(id) {
      this.selectedProduct = id;
      this.showProductEditModal = true;
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

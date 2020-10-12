<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/"><i class="fa fa-arrow-left"></i> Назад</router-link>
        <button class="btn btn-outline-success" @click="showProductCreateModal = true">
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
            <td>
              <button class="btn btn-outline-info" @click="openProductEditModal(record.id)"><i class="fa fa-pencil-alt"></i></button>
              <button class="btn btn-outline-info ml-2" @click="printBarcode(record"><i class="fa fa-print"></i></button>
            </td>
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
    <ProductModal v-if="showProductCreateModal" @close="handleProductCreateModalClose" />
    <ProductModal v-if="showProductEditModal" :id="selectedProduct" @close="showProductEditModal = false" />
  </div>
</template>

<script>
import ProductModal from "../components/ProductModal";
import JsBarcode from "jsbarcode";

export default {
  name: "Invoice",
  components: {
    ProductModal
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
      this.showProductCreateModal = false;
    },
    openProductEditModal(id) {
      this.selectedProduct = id;
      this.showProductEditModal = true;
    },
    printBarcode(product) {

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

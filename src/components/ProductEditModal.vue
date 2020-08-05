<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <h2>Редактировать товар</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-name">Наименование товара</label>
            <input
              id="product-name"
              class="form-control"
              type="text"
              v-model="product.name"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="invoice-supplier">Категория</label>
            <select
              id="invoice-supplier"
              v-model="product.category_id"
              class="form-control"
            >
              <option value="null">
                Выберите категория
              </option>
              <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-barcode">Штрихкод</label>
            <input
              id="product-barcode"
              class="form-control"
              type="text"
              v-model="product.barcode"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-type">Тип</label>
            <select
              id="product-type"
              v-model="product.type"
              class="form-control"
            >
              <option value="null">
                Выберите тип
              </option>
              <option v-for="(value, name) in types" :value="name" :key="name">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-unit">Ед/изм.</label>
            <input
              id="product-unit"
              class="form-control"
              type="text"
              v-model="product.unit"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-price-retail">Цена розничная</label>
            <input
              id="product-price-retail"
              class="form-control"
              type="text"
              v-model="product.price_retail"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-price-wholesale">Цена оптовая</label>
            <input
              id="product-price-wholesale"
              class="form-control"
              type="text"
              v-model="product.price_wholesale"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-price-wholesale">Цена оптовая</label>
            <input
              id="product-wholesale-value"
              class="form-control"
              type="text"
              v-model="product.wholesale_value"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-quantity">Остаток на складе</label>
            <input
              id="product-quantity"
              class="form-control"
              type="text"
              v-model="product.quantity"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product-status">Статус</label>
            <select
              id="product-status"
              v-model="product.status"
              class="form-control"
            >
              <option value="null">
                Выберите статус
              </option>
              <option
                v-for="(value, name) in statuses"
                :value="name"
                :key="name"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <button class="btn btn-success w-100">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";
import Product from "../utils/product";

export default {
  name: "ProductEditModal",
  components: {
    Modal,
    Loader
  },
  props: {
    id: Number
  },
  data: () => ({
    showLoader: false,
    product: {
      name: null,
      barcode: null,
      unit: null,
      category_id: null,
      quantity: null,
      price_retail: null,
      price_wholesale: null,
      wholesale_value: null,
      type: null,
      status: null
    },
    categories: [],
    types: [],
    statuses: []
  }),
  methods: {
    async setForm() {
      this.product = await (
        await fetch(`http://localhost:4040/product/get-by-id?id=${this.id}`)
      ).json();

      this.types = Product.types;
      this.statuses = Product.statuses;
    },
    close() {
      this.$emit("close");
    }
  },
  async mounted() {
    await this.setForm();

    console.log(this.product);
  }
};
</script>

<style scoped></style>

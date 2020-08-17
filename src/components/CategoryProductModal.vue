<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <div class="row">
        <div class="col-md-12">
          <h4>{{ name }}</h4>
        </div>
      </div>
      <div class="product-lists row">
        <div class="col-md-6">
          <ul v-if="linkedProducts.length > 0" class="product-list list-group">
            <li
              v-for="(product, index) in linkedProducts"
              :key="product.id"
              @click="removeProduct(index)"
              class="list-group-item list-group-item-action"
              :class="{ 'list-group-item-success': product.isNew, 'list-group-item-danger': product.isRemoved }"
            >
              <i class="fa fa-times"></i> {{ product.name }}
            </li>
          </ul>
          <div v-else>
            Товары отсутствуют
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <input
              class="search-input form-control"
              type="text"
              @input="searchProduct"
              v-model="searchTerm"
              placeholder="Найменование товара"
            />
            <i class="search-input-icon fa fa-search"></i>
          </div>
          <ul class="product-list list-group">
            <li
              v-for="(product, index) in products"
              :key="product.id"
              @click="setProduct(product, index)"
              class="list-group-item list-group-item-action"
            >
              <i class="fa fa-arrow-left"></i> {{ product.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-success w-100"
            @click="save"
            data-target="tooltip"
            title="Сохранить"
          >
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
import { required } from "vuelidate/lib/validators";
import axios from "axios";
import App from "../App";
// import axios from "axios";

export default {
  name: "CategoryProductModal",
  components: {
    Modal,
    Loader
  },
  props: {
    id: {
      type: Number,
      default: null,
      required: true
    }
  },
  data: () => ({
    showLoader: true,
    name: null,
    linkedProducts: [],
    products: [],
    searchTerm: null
  }),
  methods: {
    async setForm() {
      const category = await (
        await fetch(`http://localhost:4040/category/get-by-id?id=${this.id}`)
      ).json();

      this.name = category.name;

      this.linkedProducts = await (
        await fetch(
          `http://localhost:4040/product/get-by-category?id=${this.id}`
        )
      ).json();
    },
    async searchProduct() {
      this.products = await (
        await fetch(
          `http://localhost:4040/product/search-by-name?term=${this.searchTerm}`
        )
      ).json();
    },
    setProduct(product, index) {
      let flag = false;
      this.linkedProducts.forEach(item => {
        if (item.id === product.id) {
          this.$toast.error("Данный товар уже привязан");
          flag = true;
          return false;
        }
      });

      if (flag) {
        return;
      }

      product = {
        ...product,
        isNew: true
      };

      this.products.splice(index, 1);
      this.linkedProducts.unshift(product);
    },
    removeProduct(i) {
      if (!this.linkedProducts[i].isNew) {
        this.$set(this.linkedProducts, i, {
          ...this.linkedProducts[i],
          isRemoved: !this.linkedProducts[i].isRemoved
        });

        return;
      }

      this.linkedProducts.splice(i, 1);
    },
    async save() {
      let newLinkedProductIds = [];
      this.linkedProducts.forEach(function(item) {
        if (item.isNew) {
          newLinkedProductIds.push(item.id);
        }
      });

      let unlinkedProductIds = [];
      this.linkedProducts.forEach(function(item) {
        if (item.isRemoved) {
          unlinkedProductIds.push(item.id);
        }
      });

      try {
        await axios
          .post("http://localhost:4040/product/set-category", {
            categoryId: this.id,
            newLinkedProductsIds: newLinkedProductIds,
            unlinkedProductIds: unlinkedProductIds
          })
          .then(async response => {
            this.$toast.open("Товар успешно привязаны");
          })
          .catch(error => {
            this.$toast.error(
              "Произошла ошибка, обратитесь в службу поддержки"
            );
            throw error;
          });
      } catch (e) {
        throw e;
      }

      this.close();
    },
    close() {
      this.categoryProducts = [];
      this.products = [];

      this.$emit("close");
    }
  },
  async mounted() {
    if (this.id) {
      await this.setForm();

      console.log(this.linkedProducts);
    }

    this.showLoader = false;
  }
};
</script>

<style scoped>
.product-list {
  height: 60vh;
  overflow-y: auto;
}

.search-input {
  padding-right: 34px;
}

.search-input-icon {
  position: absolute;
  top: 12px;
  right: 25px;
  font-size: 20px;
  color: #e8e8e8;
}
</style>

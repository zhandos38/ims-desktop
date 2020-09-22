<template>
  <div class="app-container">
    <div class="app-container__header">
      <router-link class="btn btn-outline-danger" to="/revision"
        ><i class="fa fa-arrow-left"></i> Назад</router-link
      >
    </div>
    <h2>Ревизия</h2>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <label for="product-barcode">Штрихкод</label>
          <autocomplete
            id="product-barcode"
            :search="searchProductByBarcode"
            :get-result-value="getResultValueBarcode"
            @submit="setProduct"
            :debounce-time="500"
            auto-select
          >
          </autocomplete>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group" style="position: relative">
          <label for="product-name">Наименование товара</label>
          <autocomplete
            id="product-name"
            :search="searchProductByName"
            :get-result-value="getResultValueName"
            @submit="setProduct"
            :debounce-time="500"
          >
          </autocomplete>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Штрихкод</th>
            <th>Наименование товара</th>
            <th>Фактический остаток</th>
            <th>Остаток</th>
            <th>Разница</th>
            <th>Закупочная цена</th>
            <th>Процент</th>
            <th>Розничная цена</th>
            <th>Сумма потерь</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" v-bind:key="product.id">
            <td>{{ product.barcode }}</td>
            <td>{{ product.name }}</td>
            <td>
              <number-input
                class="order-item__quantity number-input"
                v-model="product.currentQty"
                :min="product.type === 1 ? 0.1 : 1"
                :step="product.type === 1 ? 0.1 : 1"
                inline
                controls
              ></number-input>
            </td>
            <td>{{ product.quantity }}</td>
            <td
              :class="{
                'text-danger':
                  (product.diff =
                    parseFloat(product.currentQty) -
                    parseFloat(product.quantity)) < 0,
                'text-success': product.diff > 0
              }"
            >
              {{ product.diff }}
            </td>
            <td>{{ product.price_in }}</td>
            <td>
              {{
                Math.abs(
                  (product.price_in / product.price_retail - 1) * 100
                ).toFixed(2)
              }}%
            </td>
            <td>{{ product.price_retail }}</td>
            <td
              :class="{
                'text-danger':
                  (product.diffAmount =
                    product.diff * parseFloat(product.price_retail)) < 0,
                'text-success': product.diffAmount > 0
              }"
            >
              {{ product.diffAmount }}
            </td>
            <td
              @click="deleteProduct(index)"
              class="btn btn-danger"
              data-target="tooltip"
              title="Удалить товар"
            >
              <i class="fas fa-trash-alt"></i>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ totalDiffAmount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-outline-success w-100" @click="save">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import axios from "axios";

export default {
  name: "RevisionCreate",
  components: {
    Autocomplete
  },
  computed: {
    totalDiffAmount() {
      return this.products.reduce(function(sum, product) {
        return sum + product.diffAmount;
      }, 0);
    }
  },
  data: () => ({
    suggestProducts: [],
    products: []
  }),
  methods: {
    async searchProductByBarcode(term) {
      if (term.length < 1) {
        return [];
      }

      await this.$store.dispatch("getProductsByBarcode", { term: term });
      return (this.suggestProducts = this.$store.state.product.suggestByBarcode);
    },
    getResultValueBarcode(result) {
      return result.barcode;
    },
    async searchProductByName(term) {
      if (term.length < 1) {
        return [];
      }

      await this.$store.dispatch("getProductsByName", { term: term });
      return (this.suggestProducts = this.$store.state.product.suggestByBarcode);
    },
    getResultValueName(result) {
      return result.name;
    },
    setProduct(product) {
      for (const item of this.products) {
        if (item.id === product.id) {
          this.$toast.warning("Данный товар уже существует");
          return;
        }
      }

      this.products.push({
        ...product,
        currentQty: parseFloat(product.quantity),
        diff: 0,
        diffAmount: 0
      });

      this.products = this.products.slice().reverse();
    },
    deleteProduct(i) {
      this.products.splice(i, 1);
    },
    async save() {
      this.products = this.products.map(function(product) {
        return {
          ...product,
          quantity: product.currentQty
        };
      });

      try {
        await axios
          .post("http://localhost:4040/product/revision", {
            user_id: this.$store.getters.user.id,
            amount: this.totalDiffAmount,
            products: this.products
          })
          .then(response => {
            this.$toast.open("Успешно обналвено");
            this.products = [];

            this.$router.push({ name: "revision" });
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
    }
  }
};
</script>

<style scoped>
table {
  color: #fff;
}
table td {
  text-align: center;
}
</style>

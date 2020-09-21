<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/invoice"><i class="fa fa-arrow-left"></i> Назад</router-link>
      </div>
      <div class="invoice-create__item">
        <div class="row">
          <div class="col-md-3">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="invoice-number">Входящий номер накладной</label>
                  <input
                    id="invoice-number"
                    type="text"
                    v-model="number"
                    class="form-control"
                    @input="onInputChange"
                    data-layout="russian"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="invoice-supplier">Поставщик</label>
                  <select
                    id="invoice-supplier"
                    v-model="selectedSupplier"
                    class="form-control"
                  >
                    <option value="null">
                      Выберите поставщика
                    </option>
                    <option
                      v-for="supplier in suppliers"
                      :value="supplier.id"
                      v-bind:key="supplier.id"
                    >
                      {{ supplier.name }}
                    </option>
                  </select>
                </div>
                <button
                  class="btn btn-info supplier-create-btn"
                  @click="showSupplierModal = true"
                  data-toggle="tooltip"
                  title="Добавить поставщика"
                >
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
            <div style="margin-bottom: 20px; font-size: 18px">
              Итого к оплате поставщику: <b>{{ total }} KZT</b>
            </div>
            <div class="form-group">
              <input
                id="is-init-checkbox"
                type="checkbox"
                v-model="isInit"
                value="1"
                @click="setInit"
              />
              <label class="form-check-label" for="is-init-checkbox"
                >Первый запуск</label
              >
            </div>
            <div class="form-group">
              <input
                id="is-debt-checkbox"
                type="checkbox"
                v-model="isDebt"
                @click="setDebt"
              />
              <label class="form-check-label" for="is-debt-checkbox"
                >В долг</label
              >
            </div>
            <div class="form-group" v-show="isDebt">
              <label for="is-debt-sum"
                >Введите сумму, которую Вы можете оплатить в данный
                момент</label
              >
              <input
                id="is-debt-sum"
                type="number"
                v-model="debtSum"
                class="form-control"
                style="margin-bottom: 20px;"
                min="0"
              />
            </div>
            <button
              class="invoice-submit-btn btn btn-success"
              @click="save"
            >
              Сохранить накладную
            </button>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label for="product-barcode">Штрихкод</label>
                  <autocomplete
                    id="product-barcode"
                    :class="isProductBarcodeDisabled ? 'block-disabled' : ''"
                    :search="searchProductByBarcode"
                    :get-result-value="getResultValueBarcode"
                    @submit="searchProductByBarcodeSubmitHandler"
                    :aria-label="product.barcode"
                    :debounce-time="500"
                    ref="autocompleteProductBarcode"
                    :disabled="isProductBarcodeDisabled"
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
                    :class="isProductNameDisabled ? 'block-disabled' : ''"
                    :search="searchProductByName"
                    :get-result-value="getResultValueName"
                    @submit="searchProductByNameSubmitHandler"
                    :aria-label="product.name"
                    :debounce-time="500"
                    ref="autocompleteProductName"
                    :disabled="isProductNameDisabled"
                  >
                  </autocomplete>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label style="display: block;">
                    Количество ({{ isQtyPartial ? "Делимый" : "Цельный" }})
                  </label>
                  <number-input
                    ref="product.qty"
                    class="number-input"
                    v-model="product.qty"
                    :min="isQtyPartial ? 0.1 : 1"
                    :max="9999"
                    :step="isQtyPartial ? 0.1 : 1"
                    inline
                    controls
                  ></number-input>
                  <input
                    type="text"
                    v-model="partialQty"
                    class="form-control"
                    v-if="isQtyPiece"
                    placeholder="Введите количество штучного товара"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label for="product-price">Закупочная цена</label>
                  <input
                    id="product-price"
                    type="number"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="invoice-btn-group">
                  <button
                    type="submit"
                    class="invoice-create-btn btn btn-info"
                    @click="setProduct"
                    data-target="tooltip"
                    title="Добавить товар в накладную"
                    tabindex="-1"
                    :disabled="addBtnDisabled"
                  >
                    <i class="fas fa-arrow-right"></i>
                  </button>
                  <button
                    class="invoice-create-btn btn btn-info"
                    @click="resetForm"
                    data-target="tooltip"
                    title="Обновить список"
                    tabindex="-1"
                  >
                    <i class="fas fa-sync"></i>
                  </button>
                  <button
                    class="invoice-create-btn btn btn-success"
                    @click="showProductModal = true"
                    data-target="tooltip"
                    title="Добавить новый товар на склад"
                    tabindex="-1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>Штрихкод</th>
                    <th>Наименование товара</th>
                    <th>Количество</th>
                    <th>Закупочная цена</th>
                    <th>Сумма</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in products"
                    v-bind:key="product.id"
                  >
                    <td>{{ product.barcode }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.qty }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.price * product.qty }}</td>
                    <td
                      @click="deleteProduct(index)"
                      class="product-delete"
                      data-target="tooltip"
                      title="Удалить товар из накладной"
                    >
                      <i class="fas fa-minus"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductModal v-if="showProductModal" @close="showProductModal = false" />
    <SupplierModal
      v-if="showSupplierModal"
      @close="showSupplierModal = false"
    />
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import SupplierModal from "../components/SupplierModal";
import ProductModal from "../components/ProductModal";

export default {
  name: "InvoiceCreate",
  computed: {
    total() {
      return this.products.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    },
    suppliers() {
      return this.$store.state.supplier.list;
    }
  },
  components: {
    SupplierModal,
    ProductModal,
    Autocomplete
  },
  data: () => ({
    loading: true,
    number: null,
    selectedSupplier: null,
    isDebt: false,
    isInit: false,
    debtSum: 0,
    products: [],
    suggestProducts: [],
    product: {
      id: null,
      name: null,
      barcode: null,
      is_piece: null,
      pieceQuantity: null,
      qty: null,
      price: null,
      unit: null,
      type: null
    },
    isProductNameDisabled: false,
    isProductBarcodeDisabled: false,
    isQtyPartial: false,
    isQtyPiece: false,
    partialQty: 0,
    showSupplierModal: false,
    showProductModal: false,
    addBtnDisabled: false
  }),
  methods: {
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
    },
    resetForm() {
      this.product = {
        id: null,
        name: null,
        barcode: null,
        piece_quantity: null,
        qty: null,
        price: null,
        unit: null
      };

      this.isProductNameDisabled = false;
      this.isProductBarcodeDisabled = false;
      this.isQtyPartial = false;
      this.isQtyPiece = false;

      this.$refs.autocompleteProductName.value = "";
      this.$refs.autocompleteProductBarcode.value = "";
    },
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
    searchProductByBarcodeSubmitHandler(result) {
      this.selectFoundProduct(result);
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
    searchProductByNameSubmitHandler(result) {
      this.selectFoundProduct(result);
    },
    selectFoundProduct(product) {
      this.product.id = product.id;
      this.product.name = product.name;
      this.product.barcode = product.barcode;
      this.product.type = product.type;
      this.product.isPiece = product.is_piece;
      this.product.pieceQuantity = product.piece_quantity;

      this.$refs.autocompleteProductName.value = this.product.name;
      this.$refs.autocompleteProductBarcode.value = this.product.barcode;

      this.isQtyPartial = parseInt(this.product.type) === 1;

      this.isQtyPiece = parseInt(this.product.isPiece) === 1;

      this.isProductNameDisabled = true;
      this.isProductBarcodeDisabled = true;
    },
    setProduct() {
      let flag = false;

      if (!this.product.price || !this.product.name || !this.product.barcode) {
        this.$toast.warning("Заполните все поля");
        flag = true;
      }

      this.products.forEach(item => {
        if (item.id === this.product.id) {
          this.$toast.warning("Данный товар уже существует");
          flag = true;
        }
      });

      if (flag) {
        return;
      }

      if (this.isQtyPiece) {
        this.product.qty =
          this.product.qty +
          Math.floor(this.partialQty / this.product.pieceQuantity) +
          (this.partialQty % this.product.pieceQuantity) / 1000;
      }

      this.products.push({
        id: this.product.id,
        name: this.product.name,
        barcode: this.product.barcode,
        qty: this.product.qty,
        price: this.product.price
      });

      this.products = this.products.slice().reverse();

      this.resetForm();
    },
    save() {
      if (!this.number) {
        this.$toast.warning("Необходимо заполнить номер накладной!");
        return;
      }

      if (!this.products) {
        this.$toast.warning("Отсутствуют товары! Добавьте товары в накладную!");
        return;
      }

      if (!this.isInit && !this.selectedSupplier) {
        this.$toast.warning("Необходимо выбрать поставщика");
        return;
      }

      if (this.isDebt && parseFloat(this.debtSum) > this.total) {
        this.$toast.warning(
          "Сумма оплаты указана неверно! Введенная сумма не должна быть больше общей суммы накладной"
        );
        return;
      }

      this.addBtnDisabled = false;

      let invoiceItems = this.products.map(function (item) {
        return {
          barcode: item.barcode,
          name: item.name,
          price_in: item.price,
          quantity: item.qty
        };
      });

      this.$store.dispatch("createInvoice", {
        invoice: {
          number_in: this.number,
          is_debt: this.is_debt,
          supplier_id: this.selectedSupplier,
          cost: this.total
        },
        invoiceItems: invoiceItems
      });

      this.addBtnDisabled = false;
      this.isDebt = false;
      this.debtSum = null;
      this.products = [];
      this.number = null;
      this.selectedSupplier = null;
      this.isInit = false;
    },
    setDebt() {
      this.addBtnDisabled = !this.isDebt;
      this.debtSum = 0;
    },
    setInit() {
      if (!this.isInit) {
        this.selectedSupplier = null;
        this.number = "Первый запуск";
      } else {
        this.selectedSupplier = null;
        this.number = null;
      }
    },
    deleteProduct(i) {
      this.products.splice(i, 1);
    }
  },
  async mounted() {
    await this.$store.dispatch("getSuppliers");

    this.loading = false;
  }
};
</script>

<style scoped>
table {
  color: #fff;
}

.invoice-create-btn__block {
  display: flex;
  margin-top: 22px;
  margin-bottom: 20px;
  width: 100%;
}
.invoice-create-btn {
  margin-right: 10px;
  font-size: 17px;
}

.invoice-submit-btn {
  margin-top: 20px;
  width: 100%;
}

.invoice-btn-group {
  padding-top: 32px;
}

.supplier-create-btn {
  position: absolute;
  right: 18px;
  top: 34px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}
</style>

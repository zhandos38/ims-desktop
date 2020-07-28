<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-info" to="/invoice">Назад</router-link>
      </div>
      <div class="invoice-create__item">
        <h2>Добавить накладную</h2>

        <div class="row">
          <div class="col-md-3">
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
            <div style="display: flex;">
              <div class="form-group" style="width: 100%">
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
                class="btn btn-info"
                style="margin-top: 30px; height: fit-content; padding: 10px 15px;"
                @click="showSupplierModal = true"
                data-toggle="tooltip"
                title="Добавить поставщика"
              >
                <i class="fa fa-plus"></i>
              </button>
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
              :disabled="submitBtnDisabled"
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
                    :debounce-time="500"
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
                    :debounce-time="500"
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
                    :min="isQtyPartial ? 1 : 0.1"
                    :max="9999"
                    :step="isQtyPartial ? 1 : 0.1"
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
                    :class="isSaveBtnDisabled ? 'block-disabled' : ''"
                    data-target="tooltip"
                    title="Добавить товар в накладную"
                    tabindex="-1"
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
                    @click="productCreateModalShow = true"
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
      <!-- Create product modal start -->
      <div
        class="create-product-modal__wrapper"
        v-show="productCreateModalShow"
      >
        <div
          class="invoice-modal__close"
          @click="productCreateModalShow = false"
        ></div>
        <div class="create-product-modal">
          <div
            class="create-invoice-modal__close pull-right"
            @click="productCreateModalShow = false"
          >
            <i class="fas fa-times"></i>
          </div>
          <div class="create-product-modal__container">
            <h1>Добавление товара</h1>
            <div class="row">
              <div class="col-md-3" style="display: flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Введите штрихкод"
                  v-model="productCreateBarcode"
                  :class="productCreateBarcodeDisabled ? 'block-disabled' : ''"
                />
                <button
                  class="btn btn-info invoice-create__button"
                  @click="searchProduct"
                >
                  <i class="fa fa-search"></i>
                </button>
              </div>
              <div class="col-md-5" style="display: flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Введите название"
                  v-model="productCreateName"
                />
                <button
                  class="btn btn-info invoice-create__button"
                  @click="generateBarcode"
                  :class="barcodeGeneratorDisabled ? 'block-disabled' : ''"
                >
                  <i class="fa fa-barcode"></i>
                </button>
              </div>
              <div class="col-md-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ед/изм."
                  v-model="productCreateUnit"
                />
              </div>
              <div class="col-md-2">
                <select class="form-control" v-model="productCreateIsPartial">
                  <option value="0">Цельный</option>
                  <option value="1">Весовой</option>
                  <option value="2">Разливной</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label></label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="productCreatePriceRetail"
                    placeholder="Введите розничкую цену"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label></label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="productCreatePriceWholesale"
                    placeholder="Введите оптовую цену"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label></label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="productCreateQuantityWholesale"
                    placeholder="Введите оптовое количество"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" id="invoice-piece">
                  <input
                    id="is-piece"
                    type="checkbox"
                    v-model="productCreateIsPiece"
                    @click="productCreatePieceBoxShow"
                  />
                  <label for="is-piece"
                    >Данный товар возможно продавать поштучно</label
                  >
                </div>
                <transition name="fade">
                  <div v-if="productCreatePieceBoxActive">
                    <div class="col-md-6">
                      <input
                        type="number"
                        v-model="productCreatePiecePrice"
                        class="form-control"
                        placeholder="Введите цену за единицу"
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        type="number"
                        v-model="productCreatePieceQuantity"
                        class="form-control"
                        placeholder="Введите количество в упаковке"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div class="row">
              <div class="create-product__buttons">
                <div class="col-md-6">
                  <button
                    class="btn btn-info create-product__button"
                    @click="reloadCreateProduct"
                    style="margin-right: 10px"
                    data-target="tooltip"
                    title="Обновить список"
                  >
                    <i class="fa fa-sync"></i> Обновить список
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    class="btn btn-success create-product__button"
                    @click="createProduct"
                    data-target="tooltip"
                    title="Добавить товар на склад"
                  >
                    <i class="fa fa-save"></i> Добавить товар на склад
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Create product modal end -->
    </div>
    <SupplierModal v-if="showSupplierModal" @close="showSupplierModal = false" />
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import SupplierModal from "@/components/SupplierModal";

export default {
  name: "InvoiceCreate",
  computed: {
    total() {
      return this.products.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    }
  },
  components: {
    SupplierModal,
    Autocomplete
  },
  data: () => ({
    loading: true,
    number: null,
    selectedSupplier: null,
    suppliers: [
      {
        id: null,
        name: null
      }
    ],
    isDebt: false,
    isInit: false,
    debtSum: 0,
    products: [],
    suggestProducts: [],
    product: {
      id: null,
      name: null,
      barcode: null,
      piece_quantity: null,
      qty: null,
      price: null,
      unit: null
    },
    isProductNameDisabled: false,
    isProductBarcodeDisabled: false,
    isQtyPartial: false,
    isQtyPiece: false,
    partialQty: 0,
    showSuggestProductName: false,
    showSuggestProductBarcode: false,
    isSaveBtnDisabled: false,
    showSupplierModal: false,
    productCreateModalShow: false,
    productCreateName: null,
    productCreateBarcode: null,
    productCreateUnit: null,
    productCreateIsPartial: false,
    productCreateNameDisabled: false,
    productCreateBarcodeDisabled: false,
    productCreateUnitDisabled: false,
    productCreateIsNew: true,
    productCreatePriceRetail: null,
    productCreatePriceWholesale: null,
    productCreateQuantityWholesale: null,
    productCreateIsPiece: null,
    productCreatePiecePrice: null,
    productCreatePieceQuantity: null,
    productCreatePieceBoxActive: false,
    barcodeGeneratorDisabled: false,
    showCreateProductAlert: false,
    createProductAlertMessage: null,
    submitBtnDisabled: false
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
    async getSuppliers() {
      await this.$store.dispatch("getSuppliers");
      this.suppliers = this.$store.state.supplier.list;
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
      }

      this.isProductNameDisabled = false;
      this.isProductBarcodeDisabled = false;
      this.isQtyPartial = false;
      this.isQtyPiece = false;
    },
    async searchProductByBarcode(term) {
      if (term.length < 1) { return [] }

      await this.$store.dispatch('getProductsByBarcode', {term: term});
      return this.suggestProducts = this.$store.state.product.suggestByBarcode;
    },
    getResultValueBarcode(result) {
      return result.barcode;
    },
    searchProductByBarcodeSubmitHandler(result) {
      this.selectFoundProduct(result);
    },
    async searchProductByName(term) {
      if (term.length < 1) { return [] }

      await this.$store.dispatch('getProductsByName', {term: term});
      return this.suggestProducts = this.$store.state.product.suggestByBarcode;
    },
    getResultValueName(result) {
      return result.name;
    },
    searchProductByNameSubmitHandler(result) {
      this.selectFoundProduct(result);
    },
    selectFoundProduct(product) {
      this.product.id = product.id;
      this.product.barcode = product.barcode;
      this.product.name = product.name;
      this.product.piece_quantity = parseInt(product.piece_quantity);

      this.isProductNameDisabled = true;
      this.isProductBarcodeDisabled = true;

      if (parseInt(product.type) === 1) {
        this.isQtyPartial = true;
      }

      if (parseInt(product.is_piece) === 1) {
        this.isQtyPiece = true;
      }
    },

    setProduct() {
      let flag = true;

      console.log(this.product.id);
      this.products.forEach(item => {
        console.log(item.id);
        if (item.id === this.product.id) {
          // callAjaxAlert(false, "Данный товар уже существует!");
          flag = false;
        }
      });

      if (!flag) {
        return;
      }

      // if (this.isQtyPartial) {
      //   this.partial.qty = parseInt(this.partial.qty);
      //   this.product.qty =
      //     this.product.qty +
      //     Math.floor(this.partialQty / this.product.partial_quantity) +
      //     (this.partialQty % this.product.partial_quantity) / 1000;
      // }

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
      this.errors = [];
      // if (this.products.length <= 0)
      // callAjaxAlert(
      //   false,
      //   "Отсутствуют товары! Добавьте товары в накладную!"
      // );

      // if (!this.number)
      //   this.errors.push({
      //     message: "Необходимо заполнить номер накладной!"
      //   });

      // if (!this.selectedSupplier)
      //   this.errors.push({
      //     message: "Необходимо выбрать поставщика"
      //   });

      // if (this.isDebt && parseFloat(this.debtSum) > this.total)
      //   this.errors.push({
      //     message:
      //       "Сумма оплаты указана неверно! Введенная сумма не должна быть больше общей суммы накладной"
      //   });

      // if (this.errors.length > 0) {
      //   let errorsList = '<ul style="list-style: none">';
      //   this.errors.forEach(function(item) {
      //     errorsList += "<li>" + item.message + "</li>";
      //   });
      //   errorsList += "</ul>";
      //   callAjaxAlert(false, errorsList);
      // }

      this.submitBtnDisabled = true;

      // $.post({
      //   url: "/invoice/create",
      //   format: "JSON",
      //   data: {
      //     number: this.number,
      //     supplierId: this.selectedSupplier,
      //     products: this.products,
      //     totalCost: this.total,
      //     isDebt: this.isDebt,
      //     isInit: this.isInit,
      //     debtSum: this.debtSum,
      //     isShopMode: new URLSearchParams(window.location.search).get(
      //       "is_shop_mode"
      //     )
      //   },
      //   success: result => {
      //     this.submitBtnDisabled = false;
      //
      //     this.isDebt = false;
      //     this.debtSum = null;
      //
      //     if (result === "not_enough") {
      //       callAjaxAlert(false, "Недостаточно средств в кассе!");
      //       return;
      //     }
      //
      //     this.products = [];
      //     this.number = null;
      //     this.selectedSupplier = null;
      //
      //     $("#is-init-checkbox").prop("checked", false);
      //     callAjaxAlert(true, "Накладная успешно сохранена!");
      //   },
      //   error: function() {
      //     console.log("Create invoice error!");
      //   }
      // });
    },
    setDebt() {
      this.isSaveBtnDisabled = !this.isDebt;
    },
    setInit() {
      if (!this.isInit) {
        this.selectedSupplier = "init";
        this.number = "Первый запуск";
        // $("#invoice-supplier").prop("disabled", true);
      } else {
        this.selectedSupplier = null;
        // $("#invoice-supplier").prop("disabled", false);
      }
    },
    closeAllSuggestList() {
      this.suggestProductsName = [];
      this.suggestProductsBarcode = [];
    },
    generateBarcode() {
      // $.post({
      //   url: "/invoice/get-checked-random-barcode",
      //   success: result => {
      //     this.productCreateBarcode = result;
      //   },
      //   error: function() {
      //     console.log("Error!");
      //   }
      // });
    },
    searchProduct() {
      if (
        this.productCreateBarcode == null ||
        this.productCreateBarcode === ""
      ) {
        this.productCreateAlertShow("Штрихкод товара не должен быть пустым");
        return;
      }

      // $.get({
      //   url: "/product/get-product-from-barcode-by-barcode",
      //   data: { barcode: this.productCreateBarcode },
      //   dataType: "JSON",
      //   success: result => {
      //     console.log(result);
      //     if (result !== "not_found") {
      //       this.setProductCreate(result);
      //     } else {
      //       this.productCreateName = null;
      //       // this.productCreateBarcode = null;
      //       this.productCreateUnit = null;
      //       this.productCreateAlertShow("Товар в базе не найден!");
      //     }
      //   },
      //   error: function() {
      //     console.log("Ошибка!");
      //   }
      // });

      this.barcodeGeneratorDisabled = true;
    },
    getProductCreateByBarcode(barcode) {
      console.log(barcode);
      // $.get({
      //   url: "/product/get-product-from-barcode-by-barcode",
      //   form: "JSON",
      //   data: { barcode: barcode },
      //   success: result => {
      //     console.log(result);
      //     if (result === "not_found") {
      //       this.productCreateAlertShow("Товар в базе не найден!");
      //       this.productCreateBarcode = barcode;
      //       return;
      //     }
      //
      //     this.createProduct(result);
      //   },
      //   error: function() {
      //     console.log("Get product error!");
      //   }
      // });
    },
    setProductCreate(product) {
      this.productCreateName = product["name"];
      this.productCreateUnit = product["unit"];
      // this.productCreateNameDisabled = true;
      this.productCreateBarcodeDisabled = true;
      // this.productCreateUnitDisabled = true;
      this.productCreateIsNew = false;
      this.showCreateProductAlert = false;
    },

    createProduct() {
      console.log(this.productCreateIsPiece);
      if (
        !this.productCreateName ||
        !this.productCreateBarcode ||
        !this.productCreateUnit ||
        !this.productCreatePriceRetail
      ) {
        this.productCreateAlertShow("Заполните все поля!");
        return;
      }

      // $.post({
      //   url: "/product/create",
      //   data: {
      //     barcode: this.productCreateBarcode,
      //     name: this.productCreateName,
      //     unit: this.productCreateUnit,
      //     isPartial: this.productCreateIsPartial,
      //     isNew: this.productCreateIsNew,
      //     priceRetail: this.productCreatePriceRetail,
      //     priceWholesale: this.productCreatePriceWholesale,
      //     quantityWholesale: this.productCreateQuantityWholesale,
      //     isPiece: this.productCreateIsPiece,
      //     piecePrice: this.productCreatePiecePrice,
      //     pieceQuantity: this.productCreatePieceQuantity
      //   },
      //   success: result => {
      //     console.log(result);
      //     if (result === "exists") {
      //       this.productCreateAlertShow("Данный товар уже существует");
      //       return;
      //     }
      //
      //     this.reloadCreateProduct();
      //     callAjaxAlert(true, "Товар успешно создан!");
      //     this.productCreateModalShow = false;
      //   },
      //   error: function() {
      //     console.log("Product create error!");
      //   }
      // });
    },
    deleteProduct(i) {
      this.products.splice(i, 1);
    },

    productCreateAlertShow(message) {
      this.createProductAlertMessage = message;
      this.showCreateProductAlert = true;
    },
    productCreatePieceBoxShow() {
      if (this.productCreateIsPiece) {
        this.productCreateIsPiece = 0;
        this.productCreatePiecePrice = null;
        this.productCreatePieceQuantity = null;
      } else {
        this.productCreateIsPiece = 1;
      }
      this.productCreatePieceBoxActive = this.productCreateIsPiece;
    },

    reloadCreateProduct() {
      this.productCreateBarcode = null;
      this.productCreateName = null;
      this.productCreateUnit = null;
      this.productCreateIsPartial = false;
      this.barcodeGeneratorDisabled = false;
      this.productCreateBarcodeDisabled = false;
      this.productCreateNameDisabled = false;
      this.productCreateUnitDisabled = false;
      this.productCreateIsNew = true;
      this.productCreatePriceRetail = null;
      this.productCreatePriceWholesale = null;
      this.productCreateQuantityWholesale = null;
      this.showCreateProductAlert = false;
      this.createProductAlertMessage = null;
      this.productCreateIsPiece = 0;
      this.productCreatePieceBoxActive = 0;
    }
  },
  async mounted() {
    await this.getSuppliers();

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
</style>

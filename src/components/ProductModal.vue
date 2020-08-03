<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <h2>Добавление товара</h2>
      <div class="row">
        <div class="col-md-5">
          <div class="form-group">
            <label for="barcode">
              Штрихкод
            </label>
            <input
              id="barcode"
              type="text"
              class="form-control product-create-input"
              placeholder="Введите штрихкод"
              v-model="barcode"
              :class="isBarcodeDisabled ? 'block-disabled' : ''"
            />
          </div>
          <button
            class="btn btn-info product-create-btn"
            @click="searchProduct"
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
        <div class="col-md-7">
          <div class="form-group">
            <label for="name">
              Наименование
            </label>
            <input
              id="name"
              type="text"
              class="form-control product-create-input"
              placeholder="Введите наименование"
              v-model="name"
            />
          </div>
          <button
            class="btn btn-info product-create-btn"
            @click="generateBarcode"
            :class="isBarcodeGeneratorDisabled ? 'block-disabled' : ''"
          >
            <i class="fa fa-barcode"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label for="unit">
              Ед/изм.
            </label>
            <input
              id="unit"
              type="text"
              class="form-control"
              placeholder="Введите ед/изм."
              v-model="unit"
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="type">
              Тип.
            </label>
            <select id="type" class="form-control" v-model="isPartial">
              <option value="false">Выберите тип</option>
              <option value="0">Цельный</option>
              <option value="1">Весовой</option>
              <option value="2">Разливной</option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="price">
              Розничная цена
            </label>
            <input
              id="price"
              type="number"
              class="form-control"
              v-model="priceRetail"
              placeholder="Введите розничкую цену"
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="price-wholesale">
              Оптовая цена
            </label>
            <input
              id="price-wholesale"
              type="number"
              class="form-control"
              v-model="priceWholesale"
              placeholder="Введите оптовую цену"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="quantity-wholesale">
              Оптовое количество
            </label>
            <input
              id="quantity-wholesale"
              type="number"
              class="form-control"
              v-model="wholesaleQuantity"
              placeholder="Введите оптовое количество"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="invoice-piece" class="form-group">
            <input
              id="is-piece"
              type="checkbox"
              v-model="isPiece"
              @click="isPieceBoxActive = !isPieceBoxActive"
            />
            <label for="is-piece"
              >Данный товар возможно продавать поштучно</label
            >
          </div>
          <div class="row" v-if="isPieceBoxActive">
            <div class="col-md-6">
              <div class="form-group">
                <label for="piece-price">
                  Цена за единицу
                </label>
                <input
                  id="piece-price"
                  type="number"
                  v-model="piecePrice"
                  class="form-control"
                  placeholder="Введите цену за единицу"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="piece-quantity">
                  Количество в упаковке
                </label>
                <input
                  id="piece-quantity"
                  type="number"
                  v-model="pieceQuantity"
                  class="form-control"
                  placeholder="Введите количество в упаковке"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="padding-top: 20px">
        <div class="col-md-4">
          <button
            class="btn btn-info w-100"
            @click="resetForm"
            data-target="tooltip"
            title="Обновить список"
          >
            <i class="fa fa-sync"></i> Сбросить
          </button>
        </div>
        <div class="col-md-8">
          <button
            class="btn btn-success w-100"
            @click="createProduct"
            data-target="tooltip"
            title="Добавить товар на склад"
          >
            <i class="fa fa-save"></i> Добавить товар на склад
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";

export default {
  name: "ProductModal",
  components: {
    Modal,
    Loader
  },
  data: () => ({
    showLoader: false,
    name: null,
    barcode: null,
    unit: null,
    isPartial: false,
    isNameDisabled: false,
    isBarcodeDisabled: false,
    isUnitDisabled: false,
    isNew: true,
    priceRetail: null,
    priceWholesale: null,
    wholesaleQuantity: null,
    isPiece: null,
    piecePrice: null,
    pieceQuantity: null,
    isPieceBoxActive: false,
    isBarcodeGeneratorDisabled: false
  }),
  methods: {
    async generateBarcode() {
      let length = 11;
      let timestamp = +new Date();

      let _getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      let generate = function() {
        let ts = timestamp.toString();
        let parts = ts.split("").reverse();
        let id = "";

        for (let i = 0; i < length; ++i) {
          let index = _getRandomInt(0, parts.length - 1);
          id += parts[index];
        }

        return id;
      };

      this.barcode = "999" + generate();

      // this.barcode = await (
      //     await fetch(
      //         `http://localhost:4040/product/get-product-by-barcode?barcode=${'999' + generate()}`
      //     )
      // ).json();
    },
    async searchProduct() {
      if (this.barcode == null || this.barcode === "") {
        this.$toast.warning("Штрихкод товара не должен быть пустым");
        return;
      }

      this.showLoader = true;

      const data = await (
        await fetch(
          `http://localhost:4040/barcode/search-by-barcode?barcode=${this.barcode}`
        )
      ).json();

      this.name = null;
      this.unit = null;

      this.showLoader = false;

      if (!data) {
        this.$toast.error("Товар в базе не найден");
        return;
      }

      this.barcode = data.number;
      this.name = data.name;
      this.unit = data.unit;

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

      this.isBarcodeGeneratorDisabled = true;
    },
    getProductByBarcode(barcode) {
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
      this.name = product["name"];
      this.unit = product["unit"];
      // this.isNameDisabled = true;
      this.isBarcodeDisabled = true;
      // this.isUnitDisabled = true;
      this.isNew = false;
    },

    createProduct() {
      if (!this.name || !this.barcode || !this.unit || !this.priceRetail) {
        this.$toast.warning("Заполните все поля!");
      }

      this.$store.dispatch("createProduct", {
        barcode: this.barcode,
        name: this.name,
        unit: this.unit,
        type: this.type,
        price_retail: this.priceRetail,
        priceWholesale: this.priceWholesale,
        wholesale_quantity: this.wholesaleQuantity,
        is_piece: this.isPiece,
        piece_price: this.piecePrice,
        piece_quantity: this.pieceQuantity
      });
    },
    showPieceBox() {
      if (this.isPiece) {
        this.isPiece = 0;
        this.piecePrice = null;
        this.pieceQuantity = null;
      } else {
        this.isPiece = 1;
      }

      this.isPieceBoxActive = this.isPiece;
    },
    resetForm() {
      this.barcode = null;
      this.name = null;
      this.unit = null;
      this.isPartial = false;
      this.isBarcodeGeneratorDisabled = false;
      this.isBarcodeDisabled = false;
      this.isNameDisabled = false;
      this.isUnitDisabled = false;
      this.isNew = true;
      this.priceRetail = null;
      this.priceWholesale = null;
      this.wholesaleQuantity = null;
      this.isPiece = 0;
      this.isPieceBoxActive = 0;
    },
    close() {
      this.resetForm();

      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.product-create-btn {
  position: absolute;
  top: 34px;
  right: 18px;
}
.product-create-input {
  padding-right: 46px;
}
</style>

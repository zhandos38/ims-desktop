<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
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
              v-model="product.barcode"
              :disabled="isBarcodeDisabled || id"
            />
          </div>
          <button
            class="btn btn-info product-create-btn"
            @click="searchProduct"
            :disabled="id"
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
              v-model="product.name"
            />
          </div>
          <button
            class="btn btn-info product-create-btn"
            @click="generateBarcode"
            :disabled="isBarcodeGeneratorDisabled || id"
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
              v-model="product.unit"
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="type">
              Тип.
            </label>
            <select id="type" class="form-control" v-model="product.type">
              <option value="null">Выберите тип</option>
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
              v-model="product.price_retail"
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
              v-model="product.price_wholesale"
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
              v-model="product.wholesale_value"
              placeholder="Введите оптовое количество"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="invoice-piece" class="form-group">
            <input id="is-piece" type="checkbox" v-model="product.is_piece" />
            <label for="is-piece"
              >Данный товар возможно продавать поштучно</label
            >
          </div>
          <div class="row" v-if="product.is_piece">
            <div class="col-md-6">
              <div class="form-group">
                <label for="piece-price">
                  Цена за единицу
                </label>
                <input
                  id="piece-price"
                  type="number"
                  v-model="product.piece_price"
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
                  v-model="product.piece_quantity"
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
            :disabled="id"
          >
            <i class="fa fa-sync"></i> Сбросить
          </button>
        </div>
        <div class="col-md-8">
          <button
            class="btn btn-success w-100"
            @click="save"
            data-target="tooltip"
            title="Добавить товар на склад"
          >
            <i class="fa fa-save"></i> Сохранить
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
import ScannerDetector from "js-scanner-detection";

export default {
  name: "ProductCreateModal",
  components: {
    Modal,
    Loader
  },
  props: {
    id: {
      type: Number,
      default: null,
      required: false
    }
  },
  data: () => ({
    showLoader: false,
    product: {
      name: null,
      barcode: null,
      unit: null,
      type: null,
      isNew: true,
      price_retail: null,
      price_wholesale: null,
      wholesale_value: null,
      is_piece: null,
      piece_price: null,
      piece_quantity: null
    },
    isNameDisabled: false,
    isBarcodeDisabled: false,
    isUnitDisabled: false,
    isPieceBoxActive: false,
    isBarcodeGeneratorDisabled: false
  }),
  methods: {
    async setForm() {
      this.product = await (
        await fetch(`http://localhost:4040/product/get-by-id?id=${this.id}`)
      ).json();

      this.types = Product.types;
      this.statuses = Product.statuses;
    },
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

      this.product.barcode = "999" + generate();

      // this.barcode = await (
      //     await fetch(
      //         `http://localhost:4040/product/get-product-by-barcode?barcode=${'999' + generate()}`
      //     )
      // ).json();
    },
    async searchProduct() {
      if (this.product.barcode == null || this.product.barcode === "") {
        this.$toast.warning("Штрихкод товара не должен быть пустым");
        return;
      }

      this.showLoader = true;

      const data = await (
        await fetch(
          `http://localhost:4040/barcode/search-by-barcode?barcode=${this.barcode}`
        )
      ).json();

      this.product.name = null;
      this.product.unit = null;

      this.showLoader = false;

      if (!data) {
        this.$toast.error("Товар в базе не найден");
        return;
      }

      this.product.barcode = data.number;
      this.product.name = data.name;
      this.product.unit = data.unit;

      this.isBarcodeGeneratorDisabled = true;
    },
    setProductCreate(product) {
      this.product.name = product["name"];
      this.product.unit = product["unit"];
      // this.isNameDisabled = true;
      this.isBarcodeDisabled = true;
      // this.isUnitDisabled = true;
      this.isNew = false;
    },
    save() {
      if (
        !this.product.name ||
        !this.product.barcode ||
        !this.product.unit ||
        !this.product.type ||
        !this.product.price_retail
      ) {
        this.$toast.warning("Заполните все поля!");
        return;
      }

      if (this.id) {
        this.$store.dispatch("updateProduct", this.product);
      } else {
        this.$store.dispatch("createProduct", this.product);
      }

      this.resetForm();
    },
    showPieceBox() {
      if (this.isPiece) {
        this.product.is_piece = 0;
        this.product.piece_price = null;
        this.product.piece_quantity = null;
      } else {
        this.product.is_piece = 1;
      }

      this.isPieceBoxActive = this.product.is_piece;
    },
    resetForm() {
      this.product.barcode = null;
      this.product.name = null;
      this.product.unit = null;
      this.product.type = null;
      this.product.price_retail = null;
      this.product.price_wholesale = null;
      this.product.wholesale_value = null;
      this.isBarcodeGeneratorDisabled = false;
      this.isBarcodeDisabled = false;
      this.isNameDisabled = false;
      this.isUnitDisabled = false;
      this.isNew = true;
      this.isPiece = 0;
      this.isPieceBoxActive = 0;
    },
    close() {
      this.resetForm();

      this.$emit("close");
    }
  },
  async mounted() {
    if (this.id) {
      await this.setForm();
    }

    const scannerDetector = new ScannerDetector({
      onComplete: barcode => {
        this.product.barcode = barcode;
      },
      stopPropagation: false, // Stop immediate propagation on keypress event
      preventDefault: false,
      ignoreIfFocusOn: "input"
    });
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

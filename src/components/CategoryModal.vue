<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div class="row" v-else>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.name.$dirty && !$v.name.required }"
        >
          <label for="supplier-name">Наименвание</label>
          <input
            id="supplier-name"
            class="form-control"
            type="text"
            placeholder="Введите наименование"
            v-model="name"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="category-color">Цвет</label>
          <VSwatches
            id="category-color"
            class="color-picker"
            v-model="color"
            show-fallback
            fallback-input-type="color"
            popover-x="left"
          />
        </div>
      </div>
      <div class="col-md-12">
        <button
          class="btn btn-success w-100"
          @click="save"
          data-target="tooltip"
          title="Создать категорию"
        >
          Сохранить
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";
import { required } from "vuelidate/lib/validators";
import VSwatches from "vue-swatches";
import 'vue-swatches/dist/vue-swatches.css'

export default {
  name: "CategoryModal",
  components: {
    Modal,
    Loader,
    VSwatches
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    showLoader: true,
    name: null,
    color: null
  }),
  validations: {
    name: { required }
  },
  methods: {
    async setForm() {
      const category = await (
        await fetch(`http://localhost:4040/category/get-by-id?id=${this.id}`)
      ).json();

      this.name = category.name;
      this.color =
        typeof category.color !== "undefined" ? category.color : "Не указано";
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.id) {
        await this.$store.dispatch("updateCategory", {
          id: this.id,
          name: this.name,
          color: this.color
        });
      } else {
        await this.$store.dispatch("createCategory", {
          name: this.name,
          color: this.color
        });
      }

      this.close();
    },
    close() {
      this.name = null;
      this.color = null;

      this.$emit("close");
    }
  },
  async mounted() {
    if (this.id) {
      await this.setForm();
    }

    this.showLoader = false;
  }
};
</script>

<style scoped>
.color-picker {
  display: block;
}
</style>

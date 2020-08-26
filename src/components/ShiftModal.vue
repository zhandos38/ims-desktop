<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div class="row" v-else>
      <div class="col-md-12">
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

export default {
  name: "CashboxModal",
  components: {
    Modal,
    Loader
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    showLoader: true,
    name: null
  }),
  validations: {
    name: { required }
  },
  methods: {
    async setForm() {
      const cashbox = await (
        await fetch(`http://localhost:4040/cashbox/get?id=${this.id}`)
      ).json();

      this.name = cashbox.name;
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.id) {
        await this.$store.dispatch("updateCashbox", {
          id: this.id,
          name: this.name
        });
      } else {
        await this.$store.dispatch("createCashbox", {
          name: this.name
        });
      }

      this.close();
    },
    close() {
      this.name = null;

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

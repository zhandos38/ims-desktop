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
        <div
          class="form-group"
          :class="{ 'has-error': $v.phone.$dirty && !$v.name.required }"
        >
          <label for="supplier-phone">Номер телефона</label>
          <input
            id="supplier-phone"
            class="form-control"
            type="text"
            placeholder="Введите номер телефона"
            v-model="phone"
            v-mask="'7(###)###-##-##'"
          />
        </div>
      </div>
      <div class="col-md-12">
        <button
          class="btn btn-success w-100"
          @click="save"
          data-target="tooltip"
          title="Создать поставщика"
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
  name: "SupplierModal",
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
    name: null,
    phone: null
  }),
  validations: {
    name: { required },
    phone: { required }
  },
  methods: {
    async setForm() {
      this.supplier = await (
        await fetch(`http://localhost:4040/supplier/get-by-id?id=${this.id}`)
      ).json();

      this.name = this.supplier.name;
      this.phone = this.supplier.phone;
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.id) {
        await this.$store.dispatch("updateSupplier", {
          id: this.id,
          name: this.name,
          phone: this.phone
        });
      } else {
        await this.$store.dispatch("createSupplier", {
          name: this.name,
          phone: this.phone
        });
      }

      this.close();
    },
    close() {
      this.name = null;
      this.phone = null;

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

<style scoped></style>

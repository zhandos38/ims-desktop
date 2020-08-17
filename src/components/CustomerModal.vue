<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div class="row" v-else>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.full_name.$dirty && !$v.phone.required }"
        >
          <label for="customer-name">Ф.И.О</label>
          <input
            id="customer-name"
            class="form-control"
            type="text"
            placeholder="Введите полное имя"
            v-model="full_name"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.phone.$dirty && !$v.phone.required }"
        >
          <label for="customer-phone">Номер телефона</label>
          <input
            id="customer-phone"
            class="form-control"
            type="text"
            placeholder="Введите номер телефона"
            v-model="phone"
            v-mask="'7(###)###-##-##'"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="customer-birthday">Дата рождения</label>
          <VueDatePicker id="customer-birthday" v-model="birthday_date" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="customer-status">Статус</label>
          <select id="customer-status" class="form-control" v-model="status">
            <option value="null">Укажите статус</option>
            <option value="true">Отключен</option>
            <option value="false">Включен</option>
          </select>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label for="customer-description">Описание</label>
          <textarea
            id="customer-description"
            class="form-control"
            placeholder="Введите номер телефона"
            v-model="description"
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
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";

export default {
  name: "CustomerModal",
  components: {
    Modal,
    Loader,
    VueDatePicker
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    showLoader: true,
    full_name: null,
    phone: null,
    birthday_date: "12-01-1990",
    description: null,
    status: null
  }),
  validations: {
    full_name: { required },
    phone: { required }
  },
  methods: {
    async setForm() {
      const customer = await (
        await fetch(`http://localhost:4040/customer/get-by-id?id=${this.id}`)
      ).json();

      this.full_name = customer.full_name;
      this.phone = customer.phone;
      this.birthday_date = customer.birthday_date;
      this.description = customer.description;
      this.status = customer.status;
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const dataForm = {
        id: this.id,
        full_name: this.full_name,
        phone: this.phone,
        birthday_date: this.birthday_date,
        description: this.description,
        status: this.status
      };

      if (this.id) {
        await this.$store.dispatch("updateCustomer", dataForm);
      } else {
        await this.$store.dispatch("createCustomer", dataForm);
      }

      this.close();
    },
    close() {
      this.full_name = null;
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

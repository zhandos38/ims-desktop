<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div class="row" v-else>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.username.$dirty && !$v.username.required }"
        >
          <label for="supplier-login">Наименвание</label>
          <input
            id="supplier-login"
            class="form-control"
            type="text"
            placeholder="Введите логин"
            v-model="username"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.full_name.$dirty && !$v.full_name.required }"
        >
          <label for="supplier-name">Ф.И.О</label>
          <input
            id="supplier-name"
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
          :class="{ 'has-error': $v.role.$dirty && !$v.role.required }"
        >
          <label for="supplier-role">Роль</label>
          <select id="supplier-role" class="form-control" v-model="role">
            <option value="null">Выбрать роль</option>
            <option v-for="(role, index) of roles" v-bind:key="index" :value="role"></option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="form-group"
          :class="{ 'has-error': $v.status.$dirty && !$v.status.required }"
        >
          <label for="supplier-status">Статус</label>
          <select id="supplier-status" class="form-control" v-model="status">
            <option value="null">Выбрать статус</option>
            <option v-for="(status, index) of statuses" v-bind:key="index" :value="status"></option>
          </select>
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
import User from "../utils/user";

export default {
  name: "StaffModal",
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
    username: null,
    full_name: null,
    status: null,
    role: null,
    roles: [],
    statuses: []
  }),
  validations: {
    username: { required },
    full_name: { required },
    status: { required },
    role: { required }
  },
  methods: {
    async setForm() {
      const user = await (
        await fetch(`http://localhost:4040/user/get-by-id?id=${this.id}`)
      ).json();

      this.username = user.username;
      this.full_name = user.full_name;
      this.status = user.status;
      this.role = user.role;
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.id) {
        await this.$store.dispatch("updateStaff", {
          id: this.id,
          username: this.username,
          full_name: this.full_name,
          status: this.status,
          role: this.role
        });
      } else {
        await this.$store.dispatch("createStaff", {
          username: this.username,
          full_name: this.full_name,
          status: this.status,
          role: this.role
        });
      }

      this.close();
    },
    close() {
      this.username = null;
      this.full_name = null;
      this.status = null;
      this.role = null;

      this.$emit("close");
    }
  },
  async mounted() {
    if (this.id) {
      await this.setForm();
    }

    this.roles = User.roles;
    this.statuses = User.statuses;

    console.log(User);

    this.showLoader = false;
  }
};
</script>

<style scoped></style>

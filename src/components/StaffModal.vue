<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <h4>Добавить сотрудника</h4>
      <div class="row">
        <div class="col-md-6">
          <div
            class="form-group"
            :class="{
              'has-error': $v.full_name.$dirty && !$v.full_name.required
            }"
          >
            <label for="staff-name">Ф.И.О</label>
            <input
              id="staff-name"
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
            :class="{
              'has-error': $v.username.$dirty && !$v.username.required
            }"
          >
            <label for="staff-login">Логин</label>
            <input
              id="staff-login"
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
            :class="{
              'has-error': $v.password.$dirty && !$v.password.required
            }"
          >
            <label for="staff-password">Пароль</label>
            <input
              id="staff-password"
              class="form-control"
              type="password"
              placeholder="Введите пароль"
              v-model="password"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-group"
            :class="{ 'has-error': $v.role.$dirty && !$v.role.required }"
          >
            <label for="staff-role">Роль</label>
            <select id="staff-role" class="form-control" v-model="role">
              <option value="null">Выбрать роль</option>
              <option
                v-for="(role, name, index) of roles"
                v-bind:key="index"
                :value="name"
                >{{ role }}</option
              >
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-group"
            :class="{ 'has-error': $v.cashbox_id.$dirty && !$v.cashbox_id.required }"
          >
            <label for="staff-cashbox">Касса</label>
            <select id="staff-cashbox" class="form-control" v-model="cashbox_id">
              <option value="null">Выбрать кассу</option>
              <option
                v-for="(cashbox, name, index) of cashboxes"
                v-bind:key="index"
                :value="cashbox.id"
              >{{ cashbox.name }}</option
              >
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
              <option
                v-for="(status, name, index) of statuses"
                v-bind:key="index"
                :value="name"
                >{{ status }}</option
              >
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <button
            class="btn btn-success w-100"
            @click="save"
            data-target="tooltip"
            title="Создать сотрудника"
          >
            Сохранить
          </button>
        </div>
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
    password: null,
    cashbox_id: null,
    status: null,
    role: null,
    roles: [],
    statuses: [],
    cashboxes: []
  }),
  validations: {
    username: { required },
    full_name: { required },
    password: { required },
    cashbox_id: { required },
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
      this.password = "no-pass";
      this.cashbox_id = user.cashbox_id;
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
          cashbox_id: this.cashbox_id,
          password: this.password !== "no-pass" ? this.password : null,
          status: this.status,
          role: this.role
        });
      } else {
        await this.$store.dispatch("createStaff", {
          username: this.username,
          full_name: this.full_name,
          password: this.password,
          cashbox_id: this.cashbox_id,
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
      this.cashbox_id = null;
      this.role = null;

      this.$emit("close");
    }
  },
  async mounted() {
    this.showLoader = false;
    if (this.id) {
      await this.setForm();
    }

    this.cashboxes = await (
      await fetch(
        `http://localhost:4040/cashbox/list`
      )
    ).json();

    this.roles = User.roles;
    this.statuses = User.statuses;
  }
};
</script>

<style scoped></style>

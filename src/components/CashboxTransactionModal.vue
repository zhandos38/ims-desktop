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
  name: "CashboxTransactionsModal",
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
      const transaction = await (
        await fetch(`http://localhost:4040/cashbox-transaction/get?id=${this.id}`)
      ).json();

      this.cashbox = {
        cashbox_id: transaction.cashbox_id,
        type: transaction.type,
        amount: transaction.amount,
        method: transaction.method,
        shift_id: transaction.shift_id,
        comment: transaction.amount,
        created_at: transaction.created_at
      };
    },
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.$store.dispatch("createCashboxTransaction", {
        name: this.name
      });

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

<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <h2>Смена</h2>
      <div class="row" v-if="shift">
        <div class="col-md-4">
          <div class="form-group">
            <label for="username">Кассир</label>
            <input id="username" class="form-control" type="text" :value="shift.User.full_name" disabled>
          </div>
        </div>
        <div class="col-md-4">
          <label for="cashbox-name">Касса</label>
          <input id="cashbox-name" class="form-control" type="text" :value="shift.Cashbox.name" disabled>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="status">Статус</label>
            <input id="status" class="form-control" type="text" :value="shift.status ? 'Включен' : 'Отключен'" disabled>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="sum-open">Сумма при открытии</label>
            <input id="sum-open" class="form-control" type="text" :value="shift.sum_at_open" disabled>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="close-sum">Сумма при закрытии</label>
            <input id="close-sum" class="form-control" type="text" :value="shift.sum_at_close" disabled>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="open-time">Время открытия</label>
            <input id="open-time" class="form-control" type="text" :value="new Date(shift.opened_at * 1000).toLocaleString()" disabled>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="close-time">Время открытия</label>
            <input id="close-time" class="form-control" type="text" :value="new Date(shift.closed_at * 1000).toLocaleString()" disabled>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";

export default {
  name: "ShiftModal",
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
    shift: {
      User: null,
      Cashbox: null,
      status: null,
      sum_at_open: null,
      sum_at_close: null,
      opened_at: null,
      closed_at: null
    }
  }),
  methods: {
    async setForm() {
      this.shift = await (
        await fetch(`http://localhost:4040/shift/get?id=${this.id}`)
      ).json();
    },
    close() {
      this.shift = null;

      this.$emit("close");
    }
  },
  async mounted() {
    await this.setForm();
    this.showLoader = false;
  }
};
</script>

<style scoped>
.color-picker {
  display: block;
}
input:disabled {
  background-color: #2A303B;
}
</style>

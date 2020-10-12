<template>
  <Modal @close="$emit('close')">
    <Loader v-if="loading" />
    <div class="row" v-else>
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
          <tr>
            <td>Номер заказа:</td>
            <td>{{ orderReturn.Order.number }}</td>
          </tr>
          <tr>
            <td>Пользователь</td>
            <td>{{ orderReturn.User.full_name }}</td>
          </tr>
          <tr>
            <td>Время проведение операции</td>
            <td>{{ $formatter.date(orderReturn.created_at * 1000) }}</td>
          </tr>
          <tr>
            <td>Комментарий:</td>
            <td>{{ orderReturn.comment }}</td>
          </tr>
          </tbody>
        </table>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Наименование</th>
            <th>Колчество</th>
            <th>Цена</th>
            <th>Сумма</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item of orderReturn.OrderReturnItems" v-bind:key="item.id">
            <td>{{ item.product_name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity * item.price }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";

export default {
  name: "OrderReturnModal",
  components: {
    Modal
  },
  data: () => ({
    loading: true,
    orderReturn: null
  }),
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    async setData() {
      const data = await (
              await fetch(`http://localhost:4040/order-return/get?id=${this.id}`)
      ).json();

      console.log(data);

      this.orderReturn = data;
    }
  },
  async mounted() {
    await this.setData();
    this.loading = false;
  }
};
</script>

<style scoped></style>

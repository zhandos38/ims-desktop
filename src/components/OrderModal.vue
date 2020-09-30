<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div v-else>
      <h4>Номер чека #{{ order.number }}</h4>
      <button class="btn btn-success" @click="printBill">
        <i class="fa fa-print pr-1"></i> Распечатать чек
      </button>
      <div class="row">
        <div class="col-md-6">Итого по чеку:</div>
        <div class="col-md-6 text-right">{{ order.cost }}</div>
      </div>
      <div class="row">
        <div class="col-md-6">Сумма скидки:</div>
        <div class="col-md-6 text-right">{{ order.discount_amount }}</div>
      </div>
      <div class="row">
        <div class="col-md-6">Итого к оплате:</div>
        <div class="col-md-6 text-right">{{ order.cost_total }}</div>
      </div>
      <div class="row">
        <div class="col-md-6">Нал:</div>
        <div class="col-md-6 text-right">{{ order.cash_amount }}</div>
      </div>
      <div class="row">
        <div class="col-md-6">Без/Нал.:</div>
        <div class="col-md-6 text-right">{{ order.card_amount }}</div>
      </div>
      <div class="row">
        <div class="col-md-6">Кассир:</div>
        <div class="col-md-6 text-right">{{ order.User.full_name }}</div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped" v-if="order">
            <thead>
              <tr>
                <th class="text-center">Штрихкод</th>
                <th class="text-center">Наименование</th>
                <th class="text-center">Кол-во</th>
                <th class="text-center">Цена</th>
                <th class="text-center">Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of order.OrderItems" v-bind:key="item.id">
                <td class="text-center">{{ item.barcode }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-center">{{ item.price }}</td>
                <td class="text-center">
                  {{
                    (
                      parseFloat(item.quantity) * parseFloat(item.price)
                    ).toFixed(2)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";

export default {
  name: "OrderModal",
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
    order: null
  }),
  methods: {
    async setForm() {
      this.order = await (
        await fetch(`http://localhost:4040/order/get?id=${this.id}`)
      ).json();
    },
    close() {
      this.name = null;

      this.$emit("close");
    },
    async printBill() {
      await this.$printer.startConnection();

      let order = this.order;
      let products = "";
      for (const product of order.OrderItems) {
        products += `<div>${product.name}</div><div>${product.quantity} X ${
          product.price
        } = ${parseFloat(product.quantity) * parseFloat(product.price)}</div>`;
      }

      const orderText = `
        <div style="font-family: 'Arial'; font-size:12px;">
          <div style="font-size: 10px">
              ЮЛ: ${this.$store.getters.objectName} <br>
              ИИН/БИН: ${this.$store.getters.objectIIN} <br>
              Тел.: ${this.$store.getters.objectPhone} <br>
              Адрес:  ${this.$store.getters.objectAddress} <br>
              <hr>
              Продажа: #${order.number} <br>
              Смена: #${order.shift_id} <br>
              Откр: ${this.$formatter.date(Date.now())} <br>
              Кассир: ${this.$store.getters.user.full_name} <br>
          </div>
          <hr>
              ${products}
          <hr>
          Сумма:  ${order.cost} <br>
          Скидка:  ${order.discount_amount} <br>
          Итоговая сумма: ${order.cost_total} <br>
          <hr>
          Оплата:  <br>
              Наличными: ${order.cash_amount} <br>
              Безналичными: ${order.card_amount} <br>
          <hr>
          <b>ИТОГО: ${order.cost_total}</b>
          <hr>
          <div style="text-align: center;">
              <div>
                  <b>ДУБЛИКАТ</b>
              </div>
              <div>
                  <b>Автоматизировано IMS</b>
              </div>
              <div style="font-size: 10px">
                  www.ims-tmt.kz
              </div>
          </div>
      </div>`;

      await this.$printer.print(orderText);

      await this.$printer.closeConnection();

      this.$toast.open("Чек успешно распечатан");
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
table {
  color: #fff;
}
</style>

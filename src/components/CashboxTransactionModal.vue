<template>
  <Modal @close="$emit('close')">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
          <tr>
            <td>Касса:</td>
            <td>{{ record.Cashbox.name }}</td>
          </tr>
          <tr>
            <td>Пользователь</td>
            <td>{{ record.User.full_name }}</td>
          </tr>
          <tr>
            <td>Действия</td>
            <td>{{ record.type ? "Внесение" : "Изъятие" }}</td>
          </tr>
          <tr>
            <td>Сумма</td>
            <td>{{ record.amount }}</td>
          </tr>
          <tr>
            <td>Смена</td>
            <td>{{ record.shift_id }}</td>
          </tr>
          <tr>
            <td>Время проведение операции</td>
            <td>{{ $formatter.date(record.created_at * 1000) }}</td>
          </tr>
          <tr>
            <td>Комментарий:</td>
            <td>{{ record.comment }}</td>
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
  name: "CashboxTransactionsModal",
  components: {
    Modal
  },
  props: {
    record: {
      type: Object
    }
  }
};
</script>

<style scoped></style>

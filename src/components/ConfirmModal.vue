<template>
  <Modal @close="close">
    <Loader v-if="showLoader" />
    <div class="modal-container" v-else>
      <p>
        Подтвердите действия
      </p>
      <div class="modal-footer">
        <button class="btn btn-success" @click="$emit('confirm')">
          OK
        </button>
        <button class="btn btn-danger" @click="$emit('close')">
          Отменить
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import Loader from "./app/Loader";

export default {
  name: "ConfirmModal",
  components: {
    Modal,
    Loader
  },
  data: () => ({
    showLoader: false
  })
};
</script>

<style scoped>
.modal-container {
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}
</style>

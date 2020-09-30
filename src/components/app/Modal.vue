<template>
  <div class="app-modal__wrapper">
    <div class="app-modal">
      <div class="app-modal__close pull-right" @click="$emit('close')">
        <i class="fa fa-times"></i>
      </div>
      <div class="app-modal__container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal"
};
</script>

<style scoped>
.app-modal__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 80;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.app-modal {
  background: #323944;
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 46%;
  padding: 30px;
}
.app-modal__close {
  cursor: pointer;
  position: absolute;
  right: 3%;
  top: 7.5%;
  z-index: 2;
}
.app-modal__close:hover {
  color: #5a6268;
}
</style>

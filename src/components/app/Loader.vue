<template>
  <div class="app-loader">
    <div class="spinner-border" :class="color" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    computed: {
      color() {
        const colors = ['text-primary', 'text-secondary', 'text-success', 'text-danger', 'text-warning', 'text-light','text-info']
        return colors[Math.floor(Math.random() * 3)]
      }
    }
  }
</script>

<style scoped>
.app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

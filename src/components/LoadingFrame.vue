<template>
  <div class="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only spinner"></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingFrame",
};
</script>

<style lang="scss">
.loading {
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  color: #333;
}
.spinner {
  top: 50%;
  left: 50%;
}
</style>

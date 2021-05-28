<template>
  <div class="header">
    <h1><i class="pi pi-print"></i>Printfully</h1>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',
  setup: () => {}
});
</script>

<style lang="scss" scoped>
.header {
  .pi {
    height: 100%;
    font-size: 2rem;
    display: inline-block;
    margin: 0 5px 0 0;
  }
}
</style>

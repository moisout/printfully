<template>
  <div class="payment">
    <Card>
      <template v-slot:title>Payment</template>
      <template v-slot:subtitle>Choose a payment method</template>
      <template v-slot:content></template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Payment',
  setup(_, { emit }) {
    const nextPage = () => {
      emit('next-page', {
        pageIndex: 2
      });
    };
    const prevPage = () => {
      emit('prev-page', { pageIndex: 2 });
    };

    return {
      nextPage,
      prevPage
    };
  }
});
</script>

<style lang="scss"></style>

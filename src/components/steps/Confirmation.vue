<template>
  <div class="confirmation">
    <Card>
      <template v-slot:title>Confirmation</template>
      <template v-slot:subtitle>Submit your order</template>
      <template v-slot:content></template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Complete"
            @click="complete()"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Confirmation',
  setup(_, { emit }) {
    const complete = () => {
      emit('complete');
    };
    const prevPage = () => {
      emit('prev-page', { pageIndex: 3 });
    };

    return {
      complete,
      prevPage
    };
  }
});
</script>

<style lang="scss"></style>

<template>
  <div class="confirmation">
    <Card>
      <template v-slot:title>Confirmation</template>
      <template v-slot:subtitle>Thank you for your order!</template>
      <template v-slot:content></template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="New order"
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Confirmation',
  props: {
    formData: Object
  },
  setup(props, { emit }) {
    const router = useRouter();
    if (!(props.formData && props.formData.file && props.formData.modelConfiguration)) {
      router.push('/');
    }
    const complete = () => {
      window.location.reload();
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

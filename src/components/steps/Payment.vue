<template>
  <div class="payment">
    <Card>
      <template v-slot:title>Payment</template>
      <template v-slot:subtitle>Overview</template>
      <template v-slot:content>
        <div class="summary" v-if="formData && formData.file && formData.modelConfiguration">
          <div class="summary-entry" v-if="formData">Name: {{ formData.file.name }} CHF</div>
          <div class="summary-entry" v-if="formData">Price: {{ price }} CHF</div>
          <div class="summary-entry" v-if="formData">Price: {{ price }} CHF</div>
          <div class="summary-entry" v-if="formData">Price: {{ price }} CHF</div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <button
            v-if="formData"
            class="snipcart-add-item p-button p-component"
            data-item-id="printed-model"
            data-item-price="20"
            data-item-url="/fake.html"
            data-item-description="High-quality 3D printed model."
            data-item-image="/logo.png"
            data-item-name="3D Print"
            @click="nextPage()"
          >
            Next <span class="pi pi-angle-right p-button-icon p-button-icon-right"></span>
          </button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Payment',
  props: {
    formData: Object
  },
  setup(props, { emit }) {
    const router = useRouter();
    if (!(props.formData && props.formData.file && props.formData.modelConfiguration)) {
      router.push('/');
    }

    const nextPage = () => {
      emit('next-page', {
        pageIndex: 2
      });
    };
    const prevPage = () => {
      emit('prev-page', { pageIndex: 2 });
    };

    const price = computed(() => {
      if (props.formData && props.formData.file && props.formData.modelConfiguration) {
        return (
          Math.round(
            (props.formData.modelConfiguration.height * props.formData.file.size) / 500000
          ) * 2
        );
      }
      return 0;
    });

    return {
      nextPage,
      prevPage,
      price
    };
  }
});
</script>

<style lang="scss"></style>

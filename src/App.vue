<template>
  <Header />
  <div class="content">
    <Steps :model="items" />

    <router-view
      v-slot="{ Component }"
      :formData="formObject"
      @prevPage="prevPage($event)"
      @nextPage="nextPage($event)"
      @complete="complete"
    >
      <keep-alive>
        <component :is="Component" ref="pageComponentRef" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const router = useRouter();
    const items = ref([
      {
        label: 'Upload',
        to: '/'
      },
      {
        label: 'Configuration',
        to: '/configurator'
      },
      {
        label: 'Payment',
        to: '/payment'
      },
      {
        label: 'Confirmation',
        to: '/confirmation'
      }
    ]);
    const formObject: Ref<any> = ref({});

    const pageComponentRef = ref(null);

    const nextPage = async (event: any) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
      }

      await router.push(items.value[event.pageIndex + 1].to);

      if (pageComponentRef.value && (pageComponentRef.value as any).updateRenderer) {
        (pageComponentRef.value as any).updateRenderer();
      }
    };

    const prevPage = (event: any) => {
      router.push(items.value[event.pageIndex - 1].to);
    };
    const complete = () => {
      console.log('done');
    };

    return { items, formObject, nextPage, prevPage, complete, pageComponentRef };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body {
  margin: 0;
}
.content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>

<template>
  <div class="configurator">
    <Card>
      <template v-slot:title>Configurator</template>
      <template v-slot:subtitle>Configure your Model</template>
      <template v-slot:content>
        <div class="configure-container">
          <div class="canvas-container">
            <div id="model" ref="modelRef"></div>
          </div>
          <div class="configuration-panel">
            <span class="p-float-label">
              <InputText id="color" type="text" v-model="modelConfiguration.color" />
              <label for="color">Color</label>
            </span>
            <ColorPicker v-model="modelConfiguration.color" :inline="true" />
            <span class="p-float-label">
              <InputNumber id="size" v-model="modelConfiguration.height" />
              <label for="size">Size (cm)</label>
            </span>
          </div>
        </div>
      </template>
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
import { defineComponent, onMounted, reactive, Ref, ref, watch } from 'vue';
import * as THREE from 'three/build/three.module';
import { OrbitControls } from '../../bin/OrbitControls';
import { STLLoader } from '../../bin/STLLoader';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Configurator',
  props: {
    formData: Object
  },
  setup(props, { emit }) {
    const router = useRouter();
    if (!(props.formData && props.formData.file)) {
      router.push('/');
    }

    const nextPage = () => {
      emit('next-page', {
        formData: {
          modelConfiguration
        },
        pageIndex: 1
      });
    };
    const prevPage = () => {
      emit('prev-page', { pageIndex: 1 });
    };
    const modelUrl: Ref<string | null> = ref(null);

    const modelRef = ref(null);

    const modelConfiguration = reactive({
      color: 'ff5533',
      height: 10
    });

    const STLViewer = (model: string) => {
      const elem: any = modelRef.value;
      elem.innerHTML = '';
      if (elem) {
        const camera = new THREE.PerspectiveCamera(
          70,
          elem.clientWidth / elem.clientHeight,
          1,
          1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        elem.appendChild(renderer.domElement);

        window.addEventListener(
          'resize',
          function () {
            renderer.setSize(elem.clientWidth, elem.clientHeight);
            camera.aspect = elem.clientWidth / elem.clientHeight;
            camera.updateProjectionMatrix();
          },
          false
        );

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.rotateSpeed = 0.5;
        controls.dampingFactor = 0.1;
        controls.enableZoom = true;
        controls.autoRotate = false;

        const scene = new THREE.Scene();
        scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

        const STLLoaderInstance = new STLLoader();
        STLLoaderInstance.load(model, (geometry: any) => {
          const material = new THREE.MeshPhongMaterial({
            color: `#${modelConfiguration.color}`,
            specular: 100,
            shininess: 100
          });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          const middle = new THREE.Vector3();
          geometry.computeBoundingBox();
          geometry.boundingBox.getCenter(middle);
          mesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
          );

          const largestDimension = Math.max(
            geometry.boundingBox.max.x,
            geometry.boundingBox.max.y,
            geometry.boundingBox.max.z
          );
          camera.position.z = largestDimension * 1.7;

          const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          };

          animate();
        });
      }
    };

    const updateRenderer = () => {
      if (props.formData && props.formData.file) {
        modelUrl.value = URL.createObjectURL(props.formData.file);
        STLViewer(modelUrl.value);
      }
    };

    onMounted(() => {
      updateRenderer();
    });

    const changeTimeout: Ref<number> = ref(0);

    watch(
      () => modelConfiguration.color,
      () => {
        if (changeTimeout.value) {
          clearTimeout(changeTimeout.value);
        }
        changeTimeout.value = setTimeout(() => {
          console.log('update');
          updateRenderer();
        }, 300);
      }
    );

    return {
      nextPage,
      prevPage,
      modelUrl,
      modelRef,
      updateRenderer,
      modelConfiguration
    };
  }
});
</script>

<style lang="scss">
.configure-container {
  display: flex;
  height: 500px;
  width: 100%;

  .canvas-container {
    width: 50%;

    #model {
      width: 100%;
      height: 100%;

      canvas {
        height: 100%;
      }
    }
  }

  .configuration-panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;

    text-align: left;

    .p-colorpicker {
      margin: 10px 0 20px 0;
    }
  }
}
</style>

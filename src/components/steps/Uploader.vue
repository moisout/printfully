<template>
  <div class="uploader">
    <Card>
      <template v-slot:title>Upload</template>
      <template v-slot:subtitle>Upload your model</template>
      <template v-slot:content>
        <FileUpload
          name="demo[]"
          :customUpload="true"
          @uploader="handleUpload"
          @error="onUploadError"
          :auto="true"
          :mode="'basic'"
          :multiple="false"
          accept="model/stl"
          :maxFileSize="1000000000"
        >
        </FileUpload>
        <div v-if="uploadedFile" class="uploaded-file">
          <i class="pi pi-file"></i>
          <p>{{ uploadedFile.name }}</p>
          <p>{{ fileSize }}</p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <i></i>
          <Button
            :disabled="!uploadedFile"
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import PrettyBytes from 'pretty-bytes';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Uploader',
  emits: ['update:config', 'next-page'],
  setup(_, { emit }) {
    const uploadedFile = ref(null);
    const nextPage = () => {
      if (uploadedFile.value) {
        emit('next-page', {
          formData: {
            file: uploadedFile.value
          },
          pageIndex: 0
        });
      }
    };

    const onUpload = () => {
      console.log('uploaded');
    };

    const handleUpload = (e: any) => {
      if (e.files && e.files.length > 0) {
        const file = e.files[0];
        uploadedFile.value = file;
      }
    };

    const onUploadError = (e: any) => {
      console.log(e);
    };

    const fileSize = computed(() => {
      if (uploadedFile.value) {
        return PrettyBytes((uploadedFile.value as any).size);
      }
    });

    return {
      nextPage,
      uploadedFile,
      onUpload,
      handleUpload,
      onUploadError,
      fileSize
    };
  }
});
</script>

<style lang="scss">
.uploaded-file {
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0 0 0;

  i {
    margin: auto 0;
  }
}
</style>

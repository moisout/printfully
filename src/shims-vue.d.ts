declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-3d-model' {
  export const ModelObj: any;
}

declare module 'three/build/three.module' {
  const three: any;
  export default three;
  export const PerspectiveCamera: any;
  export const MeshPhongMaterial: any;
  export const Scene: any;
  export const HemisphereLight: any;
  export const WebGLRenderer: any;
  export const Mesh: any;
  export const Vector3: any;
  export const Matrix4: any;
  export const PointLight: any;
}

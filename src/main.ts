import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { router } from './router';

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Steps from 'primevue/steps';
import Panel from 'primevue/panel';
import Card from 'primevue/card';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import ColorPicker from 'primevue/colorpicker';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);

app.component('Steps', Steps);
app.component('Panel', Panel);
app.component('Card', Card);
app.component('Button', Button);
app.component('FileUpload', FileUpload);
app.component('ColorPicker', ColorPicker);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);

app.mount('#app');

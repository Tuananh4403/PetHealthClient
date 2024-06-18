import './assets/main.css'
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/modal.css'


const app = createApp(App)

app.use(router)

app.mount('#app')

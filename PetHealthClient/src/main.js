import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/store'; // Import the Vuex store
import router from '@/router/router';
import './assets/multivue.css'
import 'toastr/build/toastr.min.css';

const app = createApp(App)

app.use(router);
app.use(store)

app.mount('#app')

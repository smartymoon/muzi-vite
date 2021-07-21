import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import './index.css'
import 'vant/lib/index.css';
import { Button } from 'vant'

createApp(App).use(router).use(Button).mount('#app')

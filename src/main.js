import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import './index.css'
import 'vant/lib/index.css';
import { Button,Image as VanImage,Lazyload,Tab, Tabs } from 'vant'

createApp(App).use(router).use(Button).use(VanImage).use(Lazyload).use(Tab).use(Tabs).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import './index.css'
import 'vant/lib/index.css';

const app = createApp(App)


// 全局组件
import BaseSquare from './components/global/BaseSquare.vue'
import BasePagination from './components/global/BasePagination.vue'

app.component('BaseSquare', BaseSquare)
app.component('BasePagination', BasePagination)


// vant插件
import {
  Icon,
  Button,
  Dialog,
  Image as VanImage,
  Lazyload,
  Sticky,
  Loading,
  Field,
} from 'vant'

app
  .use(router)
  .use(Icon)
  .use(Button)
  .use(Dialog)
  .use(VanImage)
  .use(Lazyload)
  .use(Sticky)
  .use(Loading)
  .use(Field)
  .mount("#app");
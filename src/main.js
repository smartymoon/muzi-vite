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
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Sticky,
  Loading,
  List,
  Empty,
  Search,
  Field,
  CellGroup,
  Rate,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  SubmitBar,
  Checkbox, 
  CheckboxGroup,
  Stepper,
  NumberKeyboard,
  AddressList,
  AddressEdit,
  Area 
} from 'vant'

app
  .use(Icon)
  .use(router)
  .use(Button)
  .use(Dialog)
  .use(VanImage)
  .use(Lazyload)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Sticky)
  .use(Loading)
  .use(List)
  .use(Empty)
  .use(Search)
  .use(Field)
  .use(CellGroup)
  .use(Rate)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(NumberKeyboard)
  .use(AddressList)
  .use(AddressEdit)
  .use(Area)
  .mount("#app");
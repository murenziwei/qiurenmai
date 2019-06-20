import Vue from 'vue'
import ElementUI from 'element-ui';
import {WOW} from 'wowjs';
import 'wowjs/css/libs/animate.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import App from './App.vue'
import router from './router'
import store from './store'

import api from './api';//封装接口

//将api挂载在Vue原型上
Vue.prototype.$api=api;

//复制功能
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

//滚动出现效果，依赖animation.js
new WOW({live:false}).init();

Vue.use(ElementUI);


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

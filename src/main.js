import Vue from 'vue'
import App from './App.vue'
import './quasar'
import router from './router'

import api from './_services/api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

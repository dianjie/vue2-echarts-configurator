import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.prototype._ = _

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

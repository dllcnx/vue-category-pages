import Vue from 'vue'
import App from './index2.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

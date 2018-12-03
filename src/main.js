import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import './registerServiceWorker'
import 'leaflet/dist/leaflet.css'

import vmodal from 'vue-js-modal'
Vue.use(vmodal)
Vue.use(VueRouter)
Vue.config.productionTip = false

import index from './components/welcome.vue'
import VueLeaflet from "./components/vueLeaflet.vue";
const router = new VueRouter({
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/map',
    component: VueLeaflet
  }]
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App'
import Goods from 'components/goods/goods'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const CODE_OK = 0

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/goods', component: Goods},
    {path: '/ratings', component: Goods},
    {path: '/seller', component: Goods}
  ]
})
router.replace('/goods')
new Vue({
  router,
  template: '<app/>',
  components: {App}
}).$mount('#app')

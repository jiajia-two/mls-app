// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './components/commons/component'

//全局的配置
import './modules/config'
import router from './router'
import store from './store'

import jsonp from 'vue-jsonp'
Vue.use(jsonp)
//使用mint-ui

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import { Button, Cell } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  jsonp,
  template: '<App/>'
})

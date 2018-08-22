import Vue from 'vue'
//swiper css
import 'swiper/dist/css/swiper.min.css'

// 全局通用样式
import '../stylesheets/main.scss'

//rem
import computed_rem from './rem'
 //计算rem
computed_rem()

//全局自定义指令

// axios
import axios from 'axios'
Vue.prototype.$http = axios
import server_config from './server_config'
Vue.prototype.config_server = server_config


//filters

//cookies
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.prototype.$cookies.clear = function () {
    let keys = Vue.prototype.$cookies.keys()
    keys.forEach(key => {
        this.remove(key)
    });
}

//md5

import md5 from 'js-md5'

Vue.prototype.md5 = md5


Vue.config.productionTip = false
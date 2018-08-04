import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../components/pages/Home/Home.vue'
import GoodsType from '../components/pages/Home/GoodsType.vue'
import GoodsPop from '../components/pages/Home/GoodsPop.vue'
import GoodsNew from '../components/pages/Home/GoodsNew.vue'
import GoodsBase from '../components/pages/Home/GoodsBase.vue'
import GoodsDetail from '../components/pages/Detail/GoodsDetail.vue'
import Login from '../components/pages/Mine/login.vue'
import Classify from '../components/pages/classify/Classify.vue'
import secClass from '../components/pages/secondclassify/secClassify.vue'



const routes = [
    {
        path:'/',
        component:Home,
        children:[
            {
                path:'',
                component:GoodsType,
                children:[
                    {
                        path: '',
                        component: GoodsPop,
                        redirect: { name: 'goodsPop' }
                    },
                    {
                        path:'/goodsPop',
                        name:'goodsPop',
                        component: GoodsPop,
                    },
                    {
                        path:'/goodsNew',
                        name:'goodsNew',
                        component: GoodsNew,
                    },
                    {
                        path:'/goodsBase',
                        name:'goodsBase',
                        component: GoodsBase,
                    }
                ]
            },
        ]
    },
    {
        path:'/goodsDetail',
        name:'goodsDetail',
        component:GoodsDetail,
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/classify',
        name:'classify',
        component:Classify
    },
    {
        path:'/sencondcla',
        name:'sencondcla',
        component:secClass
    },
    

]
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
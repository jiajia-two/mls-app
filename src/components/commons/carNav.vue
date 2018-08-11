<template>
    <footer class="car-nav">
        <router-link :to = "nav.path" v-for = " nav in navs " :key = "nav.id" class="tab-item external">
                <span :class="['fa', 'fa-' + nav.fa]"></span>
                <span class="tab-label">{{ nav.title }}</span>
        </router-link>    
    </footer>
</template>
<script>
    export default {
        name:'app-car-nav',
        data () {
            return {
                navs:[
                    { id: 1, title: '客服', fa: 'file-text-o ', path: '/home', name: 'home' },
                    { id: 2, title: '店铺', fa: 'shopping-bag', path: '/classify', name: 'Classify' },
                    { id: 3, title: '收藏', fa: 'car', path: '/car', name: 'car' },
                    { id: 4, title: '加入购物车', fa: '', path: '/car', name: 'login' },
                    { id: 5, title: '购买', fa: '', path: '/login', name: 'login' }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
    footer{
        height:0.65rem;
        width:100%;
        position: fixed;
        display:flex;
        border-top:1px solid #ccc;
        bottom:0;
        left:0;
        background:#fff;
        z-index:1000;
        a{
            flex:1;
            height:0.65rem;
            display:flex;
            flex-wrap:wrap;
            flex-direction:column;
            justify-content:center;
            align-items: center;
            font-size:14px;
            color:#aaa ; 
        } 
        a:nth-child(1) span:nth-child(1){
            color:#f69;
        }
         a:nth-child(4){
             flex:1.5;
            background: #ffe817;
            color:black;
        }
         a:nth-child(5){
             flex:1.5;
            background: #f69;
            color:#fff;
        }

        
    }
    .active{
         background:#ff1877; 
         color:#fff;  
    }
     
</style>


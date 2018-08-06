<template>
    <div class="app-car page page-top">
        <app-header style="background:#fff;"><span style="width:1.9rem;display:flex; justify-content:space-between;color:black;font-size:0.18rem;"><i>购物车</i><router-link to="/home" style="font-size:0.18rem; color:black">首页</router-link></span></app-header>
        <app-nav></app-nav>

        
    </div>
</template>
<script>
export default {
    name:'car',
}
</script>
<style lang="scss" scoped>
    @import "../../../stylesheets/_base.scss";
    .app-car{
        width:100%;
        height:6.3rem;;
        background: #ddd;
    }
</style>


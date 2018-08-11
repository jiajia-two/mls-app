<template>
    <div class="home-goods-base">
        <ul 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50">
            <li
                v-for="(goods,i) in allGoods"
                :key = "i"
                 @click="selectGoods"
                :id="goods.iid"
            >
                <img :src="goods.show.img" alt="" class="back">
                <p>{{goods.title}}</p>
                <span class="price">{{goods.price}}</span><i class="fa fa-star"></i><span class="cfav">{{goods.cfav}}</span>
            </li> 
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name:'homeGoodsBase',
    data(){
        return {
            allGoods:[],
            frame:0,
            page:0,
            callbacknum:7,
            loading:false,
        }
    },
    methods: {
        getAllGoodsBase(){
            this.$jsonp('/index2/search',{
                   frame: this.frame,
                    page: this.page,
                    cKey: 'wap-index',
                    _mgjuuid: 'cb1598d6-d81b-4532-9b7f-f8d389d2159a',
                    sort: 'pop',
                    _: '1533208780089',
                    callback: 'jsonp'+this.callbacknum,
            }).then( res=> {
                var last = res.data.list
                this.allGoods = this.allGoods.concat(last)
            })
        },
        selectGoods(event){
            var el = event.currentTarget
            var id=el.id
            this.$router.push({
                path:'/goodsDetail',
                query:{
                    goodsId:id,
                    _ajax: 1
                }
            })
        },
         loadMore() {
            this.loading = true;
            setTimeout(() => {
                let more = this.allGoods[this.allGoods.length - 1];
                this.callbacknum+=1,
                this.fram+=1
                this.page+=1
                this.getAllGoodsBase()
                this.loading = false;
            }, 1000);
        }
    },
    created(){
        this.getAllGoodsBase()
    }
}
</script>
<style lang="scss" scoped>
    .home-goods-base{
        width:100%;
        ul{
            display: flex;
            flex-wrap:wrap;

            li{
                flex:1;
                align-self: center;
                width:1.87rem;
                height:2.90rem;
                padding:0.1rem;
                img{
                    width:1.7rem;
                    height:2.40rem;
                    margin-bottom: 0.05rem;
                }
                p{
                    width:100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .price{
                    color:red;
                    margin-right:0.2rem;
                }
                .cfav{
                    color:rgb(156, 154, 154);
                }
                i{
                    width:6px;
                    height:6px;
                    margin-right: 0.1rem;
                    color: rgb(250, 165, 165);
                }
            }
        }
    }
</style>


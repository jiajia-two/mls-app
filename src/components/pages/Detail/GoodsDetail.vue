<template>
    <div class="goods-detail" v-if = "goods.itemInfo">
        <div ref ="el" class=" banner swiper-container one-con ">
            <div class="swiper-wrapper one-wra">
                <div 
                    v-for ="(topimg,i) in goods.itemInfo.topImages"
                    :key= "i"
                    class="swiper-slide one-sli">
                    <img :src="topimg" alt="" class="back">
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-fraction one-pag">
                <span class="swiper-pagination-current">1</span> 
                / <span class="swiper-pagination-total">5</span>
            </div>
        </div>
        <div class="goods">
            <p class="title">{{goods.itemInfo.title}}</p>
            <div class="price">
                <span class="nowprice">{{goods.itemInfo.price}}</span>
                <span class="oldprice" v-if="goods.itemInfo.oldPrice">{{goods.itemInfo.oldPrice}}</span>
                <span class="dis" v-if="goods.itemInfo.discountDesc">{{goods.itemInfo.discountDesc}}</span>
            </div>
            <div class="sellnum">
                <span>{{goods.columns[0]}}</span>
                <span>{{goods.columns[1]}}</span>
                <span>{{goods.itemInfo.extra.deliveryTime}}小时发货</span>
                <span>{{goods.itemInfo.extra.sendAddress}}</span>
            </div>
            <div class="service-list"> 
                <span
                v-for="(service,index) in goods.shopInfo.services"
                v-if='index<=2'
                :key= "index"
                 class="service-item"> 
                    <img class="service-icon" v-if="service.icon" :src="service.icon">
                    <span class="service-name">{{service.name}}</span> 
                </span> 
                <img class="service-arrow" src="https://s10.mogucdn.com/mlcdn/c45406/170711_701e7hcfi1j9fe76hgd560bj28d87_14x22.png" alt=""> 
               
            </div>
        </div>
        <div class="size">
            <div @click = "addsize($event,i)" 
            :class="[(index===i?'measure active':'measure')]"
             v-for ="(size,i) in goods.itemParams.rule.tables[0][0]" :key="i">
                {{size}}
            </div>
        </div>
        <div class="color">
            <div class="desColor"> 颜色：</div> 
            <div :class="[(index2===i?'colorSelect active':'colorSelect')]"
            @click="addcolor($event,i)" v-for ="(color,i) in goods.skuInfo.props[0].list" :key="i">
                {{color.name}}
            </div>
        </div>
        <div class="btns">
            购买数量：
            <span class="control_nul">
                <button @click = "num -= (num === 1 ? 0: 1)">-</button>
                <span>{{num}}</span>
                <button @click = "num++">+</button>
            </span>
               
            <button class="addbtn" @click = "addcart">加入购物车</button>
        </div>
        <div class="shop">
            <div class="shop-top"> 
                <a class="info-avatar" :href="goods.shopInfo.shopUrl">
                    <img :src="goods.shopInfo.shopLogo"> 
                </a> 
                <div class=" shop-info-container">
                    <div class="shop-title">
                        <div class="title"> {{goods.shopInfo.name }} </div> 
                    </div>
                    <div  @click="save=!save" class="shop-collect"> 
                        <span v-if="save" class="has-marked">已收藏</span> 
                        <span v-else class="not-marked"> 
                            <span class="plus">+</span>
                        收藏 </span> 
                    </div>
                </div>
            </div>
            <div class="info-content"> 
                <div class="count"> 
                    <div class="sale">
                        <span class="fz-18">{{goods.shopInfo.cSells}}</span><br>总销量
                    </div> 
                    <div class="all"><span class="fz-18">{{goods.shopInfo.cGoods}}</span><br>全部宝贝</div>
                    <div class="shop-evaluate">
                        <ul> 
                            <li 
                            v-for="(score,i) in goods.shopInfo.score"
                            :key="i"
                            > <span>{{score.name}}</span>  <em>{{score.score}}</em> <i v-if=score.isBetter>高</i><i v-else>低</i></li>
                        </ul> 
                    </div>  
                </div>
            </div>
            <div class="shop-bottom">
                <button>进店逛逛</button>
            </div>
        </div>
        <div  class="swiper-container two-con">
            <div class="swiper-wrapper two-wra">
            <div 
            v-for ="(recommend,i) in recommends"
            :key= "i"
            class="swiper-slide two-sli">
            <img :src="recommend.image" alt="" class="back">
            <p>￥{{recommend.discountPrice}}</p>
            </div>
            </div>
            <div class="swiper-pagination two-pag"></div>
        </div>
      <app-car-nav></app-car-nav>
       
    </div>
</template>
<script>
import Vue from 'vue'
import Swiper from 'swiper'
export default {
    name:'goodsDetail',
    data(){
        return {
            loading:false,
            goods:[],
            recommends:[],
            save:false,
            num:1,
            index:-1,
            index2:-1,
            size:'',
            color:''
        }
    },
    
    methods:{
        fetchData(){
            this.loading = true;
            var params= this.$route.query;
            this.$http.get(this.config_server.detail+'/detail/mls/v1/h5',{
                params:{
                    iid:params.goodsId,
                    _ajax:1,
                }
            }).then( res=>{
                console.log(res)
                this.goods=res.data.result
                    Vue.nextTick(() =>{
                        new Swiper(this.$refs.el,{
                            autoplay: {
                                delay: 2000,
                                stopOnLastSlide: false,
                                disableOnInteraction: true,
                            },
                            pagination:{
                                el:'.one-pag',
                                type: 'fraction',
                            }
                        })
                    })
            })
            this.loading = false;
        },
        recommend(){
            this.loading = true;
            var params= this.$route.query;
            this.$jsonp(this.config_server.index1+'/jsonp/recommend/4',{
                    pid: 6011,
                    iidE: params.goodsId,
                    _: 1533720530064,
                    callback: 'jsonp4'
            }).then( res=>{
                this.recommends=res.data.list
                    Vue.nextTick(() =>{
                        new Swiper('.two-con',{
                            slidesPerView: 4,
                            spaceBetween: 10,
                            slidesPerGroup: 4,
                            loop: true,
                            loopFillGroupWithBlank: true,
                            pagination: {
                                el: '.two-pag',
                                clickable: true,
                            },
                        })
                    })
            })
            this.loading = false;
        },
        addcart(){
            this.$store.dispatch('action_add_good_in_cart', {
                good_id: this.$route.query.goodsId,
                price: this.goods.itemInfo.price,
                name: this.goods.itemInfo.title,
                num: this.num,
                pic: this.goods.itemInfo.topImages[0],
                color: this.color,
                size:this.size
            })
        },
        addsize(e,i){
            this.index = i
            this.size = e.target.innerText;
            console.log(this.size)
        },
         addcolor(e,i){
            this.index2 = i
            this.color= e.target.innerText;
            console.log(this.color)
        },
    },
    created(){
        this.recommend()
        this.fetchData()
    }
}
</script>
<style lang="scss" scoped>
.goods-detail{
    width: 100%;
    height: 100%;
    margin-bottom: 1rem;
    .one-con {
        background:  #fff;
      .one-sli {
            text-align: center;
            font-size: 18px;
            background: #fff;
            img{
                width: 2.9rem; 
                height:4.30rem;
            }
        }
        .one-pag{
            position: absolute;
            left:3.14rem;
            bottom:0.18rem;
            line-height: 0.25rem;
            z-index: 2;
            width:0.5rem;
            height: 0.25rem;
            color: #fff;
            font-size: 0.14rem;
            -webkit-border-radius: .4rem;
            -moz-border-radius: .4rem;
            border-radius: .4rem;
            background: rgba(0,0,0,.3);
            span{
                color:#000;

            }
        } 
    }
    .goods{
        background:  #fff;
        padding-top:0.1rem;
        padding-left:0.15rem;
        >p{
            text-align: left;
            margin-bottom:0.12rem;
        }
        .price{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 0.12rem;
            span{
                margin-right:0.15rem;
            }
            .nowprice{
                font-size:0.20rem;
                color:#f69;
            }
            .oldprice{
                text-decoration: line-through;
                font-size:0.12rem;
                color:#999;
            }
            .dis{
                line-height: 0.2rem;
                padding:0 0.05rem;
                height: .2rem;
                color: #fff;
                font-size: .12rem;
                background: #FF6699;
                -webkit-border-radius: .4rem;
                -moz-border-radius: .4rem;
                border-radius: .4rem;
            }
        }
        .sellnum{
            display: flex;
            height:0.28rem;
            justify-content: space-between;
            font-size:0.12rem;
            color:#999;
            padding-bottom: 0.12rem;
            border-bottom:1px solid #ccc;
        }
        .service-list{
            margin-bottom: 0.12rem;
            display: flex;
            justify-content: space-around;
            padding-right:0.1rem;
            height:0.62rem;
            align-items: center;
            border-bottom: 0.05rem solid rgb(240, 237, 237);;
            span{
                color:#666;
            }
            .service-item{
                text-align: center;
                font-size: 0.12rem;

                .service-icon{
                    width:0.12rem;
                    height:0.12rem;
                }
            }
            .service-arrow{
                width:0.08rem;
                height:0.08rem;
            }
        }
    }
    .shop{
        .shop-top{
            width:100%;
            height:0.45rem;
            display: flex;
            padding:0 0.2rem;
            a img{
                width:0.45rem;
                height:0.45rem;
                border-radius: 0.45rem;
                margin-right: 0.15rem;
            }
            .shop-info-container{
                display: flex;
                width:100%;
                justify-content: space-between;
                align-items: center; 
                .shop-collect{
                        >span{
                            display: inline-block;
                            width:0.65rem;
                            line-height: 0.25rem;
                            height:0.25rem;
                            border-radius: 0.1rem;
                            background: #999;
                            color:#fff;
                            font-size: 0.12rem;
                        }
                        .not-marked{
                            background: #f69;

                        }
                } 
                
            }
            
        }
        .info-content{
            height:0.66rem;
            .count{
                display: flex;
                align-items: center; 
                justify-content: space-around;
                .shop-evaluate{
                    border-left:1px solid #ccc;
                    width:1.60rem;
                    padding-left:0.4rem;
                    ul{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        li{
                            em{
                                color:#f13e3a;
                            }
                            i{
                                color:#f13e3a;
                            }
                        }
                    }
                }
            }
        }
        .shop-bottom{
            button{
                display: inline-block;
                width:1.5rem;
                height: 0.3rem;
                line-height: 0.3rem;
                -webkit-border-radius: 1.2rem;
                -moz-border-radius: 1.2rem;
                border-radius: 1.2rem;
                color: #666;
                font-size: 0.16rem;
                background: #f2f5f8;
            }
            
        }

    }
      .two-con {
        width:100%;
        margin-top:0.4rem;
        height: auto;
      .two-sli {
           text-align: center;
           height:1.8rem;
            img{
                width: 0.85rem; 
                height:1.27rem;
                margin-bottom: 0.08rem;
            }
            p{
                color:#f69;
            }
        }
    }
    .size{
        display:flex;
        flex-wrap:nowrap;
        padding-left:0.2rem;
        margin-bottom:0.15rem;
        .measure{
            border:1px solid #ccc;
            margin-right:0.1rem;
            border-radius:3px;
            padding:0.1rem 0.15rem;
            text-align:center;
        }
        .measure:nth-of-type(1){
            border:0 none;
             padding-left:0;
        }
    }
    .color{
        display:flex;
        flex-wrap:wrap;
        margin-left:0.2rem;
        margin-bottom:0.15rem;
        .desColor{
            height:0.4rem; 
            line-height:0.4rem;
        }
        .colorSelect{
            border:1px solid #ccc;
            margin-right:0.05rem;
            border-radius:3px;
            margin-left:0.1rem;
            padding:0.1rem;
            text-align:center;
            margin-bottom:0.1rem;
        }
    }
    .btns{
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ccc;
        .control_nul{
            span{
                display: inline-block;
                line-height: 0.3rem;
                width:0.2rem;
                height:0.3rem;
                font-size:0.23rem;
            }
            button{
                font-size:0.25rem;
                width:0.3rem;
                height:0.3rem;
                background: #fff;
                color:rgb(10, 10, 10);
            }
        }
        .addbtn{
            width:1rem;
            height:0.4rem;
            background: #f69;
            margin-left:0.8rem;
        }
    }
    .active{
        color:white;
        background:#f69;
    }
}
    

    
</style>



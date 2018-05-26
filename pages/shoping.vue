<template>
  <div class="goods" >
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group v-if="goods.id != null">
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ formatExpressPrice() }}</van-col>
        <van-col span="14">剩余：{{ goods.sku.stock_num }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-loading v-else type="spinner" color="black" class="loading" />
  
    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">法弗纳小铺</span>
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>

<!--     <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group> -->

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="showBase = true">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showBase = true">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <van-sku v-if="goods.id != null"
      v-model="showBase"
      :sku="goods.sku"
      :goods="goods"
      :goods-id="goods.id"
      :close-on-click-overlay="closeOnClickOverlay"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      @buy-clicked="onBuyClicked" 
      @add-cart="onAddCart"
    />
    <van-loading v-else type="spinner" color="black" class="loading" />

    <img class="goods-img" v-for="img in goods.imageList" v-lazy="img" :key="img">
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Sku,
  Lazyload,
  Loading
} from 'vant';
import Vue from 'vue'
Vue.use(Lazyload, {})
import { mapState } from 'vuex'

export default {
  middleware: 'wechat-auth',
  data() {
    return {
      title: '法弗纳小铺',
      resetSelectedSkuOnHide: true,
      closeOnClickOverlay: true,
      showBase: false,
    };
  },
  computed: {
    ...mapState([
      'goods'
    ])
  },
  methods: {
    formatPrice() {
      return '¥' + this.goods.price;
    },
    onClickCart() {
      this.$router.push('cart');
    },
    sorry() {
      Toast('升级维护中~');
    },
    onAddCart(data){
      let cart = {}
      cart.id = this.goods.id
      cart.title = this.goods.title
      cart.price = data.selectedSkuComb.price
      cart.num = data.selectedNum
      cart.expressPrice = this.goods.expressPrice
      cart.picture = this.goods.picture
      cart.desc = this.formarSpec(data.selectedSkuComb)
      //插入一条数据到后台，更新store数据
      this.$store.dispatch('saveCart', cart).then(res => {
        if(res.status === 200 && res.data.success) {
          this.showBase = false
          Toast('已成功添加到购物车')
        }else {
          Toast('服务器繁忙！')
        }        
      })
    },
    onBuyClicked(data) {
      let cart = {}
      cart.id = data.id
      cart.title = this.goods.title
      cart.price = data.selectedSkuComb.price
      cart.number = data.selectedNum
      cart.expressPrice = this.goods.expressPrice
      cart.picture = this.goods.picture
      cart.desc = this.formarSpec(data.selectedSkuComb)
      console.log(data)
      console.log(cart)
    },
    formatExpressPrice() {
      let price = this.goods.expressPrice
      return price ? '¥' + (price / 100).toFixed(2) : '免运费'
    },
    formarSpec(selectedSkuComb) {
      var spec = ''
      const s1 = selectedSkuComb.s1
      const s2 = selectedSkuComb.s2
      const s3 = selectedSkuComb.s3
      const tree = this.goods.sku.tree
      for(let i = 0; i < tree.length; i++){
        if(tree.length >= 1){
          if(i === 0){
            let Val = tree[0].v
            Val.filter(item => {
              if(item.id === s1) {
                spec = item.name
              }
            })
          }
          if (tree.length >= 2) {
            if(i === 1){
              let Val = tree[1].v
              Val.filter(item => {
                if(item.id === s2) {
                  spec = spec + ',' + item.name
                }
              })
            }          
            if (tree.length >= 3) {
              if(i === 2){
                let Val = tree[2].v
                Val.filter(item => {
                  if(item.id === s3) {
                    spec = spec + ',' + item.name
                  }
                })
              }          
            }
          }
        }
      }
      return spec
    }
  },
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Toast.name]: Toast,
    [Sku.name]: Sku,
    [Loading.name]: Loading,
  },
  beforeCreate() {
    let goodId = this.$route.query.id
    this.$store.dispatch('fetchGoods', goodId)
  }
};

</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
			width: 100%;      
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-img {
    width: 100%;
    margin-bottom: 10px;
  }
}
.loading {
  margin: auto;
}
</style>

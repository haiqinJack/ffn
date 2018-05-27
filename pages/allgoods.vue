<template>
	<div>
		<div class="custom-title-new">
			<h2 class="title-new">全部商品</h2>
		</div>

		<card v-for="(item) in products"
			:key="item.id"
			:id="item.id"
			:picture="item.picture"
			:title="item.title"
			:price="(item.price / 100).toFixed(2)"
			@on-sku="showCart"
			@to-shoping="goShoping"
		/>

    <van-sku v-if="showBase"
      v-model="showBase"
      :sku="currentSku.sku"
      :goods="currentGoods"
      :goods-id="currentGoods.id"
      :close-on-click-overlay="closeOnClickOverlay"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      @buy-clicked="onBuyClicked" 
      @add-cart="onAddCart"
    />	
    <FooterAction />	
	</div>
</template>
<script >
import { mapState } from 'vuex'
import { Toast, Sku } from 'vant'
import card from '~/components/card.vue'
import FooterAction from '~/components/footer-action.vue'

export default {
	middleware: 'wechat-auth',
	head() {
		return {
			title: '全部商品'
		}
	},
	data() {
		return {
			showBase: false,
			resetSelectedSkuOnHide: true,
      closeOnClickOverlay: true,
      chosenGoodsId: null
		}
	},
	methods: {
		showCart(id) {
			this.chosenGoodsId = id
			if(!this.currentSku) {
				const toast = Toast.loading({
					duration: 0,
					forbidClick: true
				})
				this.$store.dispatch('fetchSkuByGoodsId', id).then((res) => {
					if(res.status === 200) {
						this.showBase = true
						Toast.clear()
					}else{
						Toast('加载失败')
					}
				})
			}else{
				this.showBase = true
			}
		},
		onBuyClicked(data) {
			console.log(data)
			console.log('购买')
		},		
		onAddCart(data) {
			console.log('添加到购物车')
      let cart = {}
      cart.id = this.currentGoods.id
      cart.title = this.currentGoods.title
      cart.price = data.selectedSkuComb.price
      cart.num = data.selectedNum
      cart.expressPrice = this.currentGoods.expressPrice
      cart.picture = this.currentGoods.picture
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
		goShoping(id) {
			this.$router.push({ path: '/shoping', query: { id: id } })
		},
    formarSpec(selectedSkuComb) {
      var spec = ''
      const s1 = selectedSkuComb.s1
      const s2 = selectedSkuComb.s2
      const s3 = selectedSkuComb.s3
      const tree = this.currentSku.sku.tree
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
	computed: {
		showSku() {
			return false
		},
		currentSku() {
			return this.sku.filter((item) => this.chosenGoodsId === item.goodsId)[0]
		},
		currentGoods() {
			return this.products.filter((item) => this.chosenGoodsId === item.id)[0]
		},
		...mapState({
			sku: 'skuBox',
			products: 'products'
		})
	},
	components: {
		[Toast.name]: Toast,
		[Sku.name]: Sku,
		card,
		FooterAction
	},
	beforeCreate() {
		this.$store.dispatch('fetchAllGoods')
	}
}
</script>
<style>
.custom-title-new {
	text-align: center;
	line-height: 45px;	
}	

.custom-title-new .title-new {
    font-size: 16px;
    line-height: 45px;
    color: #333;
    display: inline-block;
    position: relative;
}
</style>

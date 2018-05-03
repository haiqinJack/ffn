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
			@click="showCart"
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
import { Toast } from 'vant'
import card from '~/components/card.vue'
import FooterAction from '~/components/footer-action.vue'

export default {
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
				console.log(this.currentSku,'false')
				const toast = Toast.loading({
					duration: 0,
					forbidClick: true
				})
				this.$store.dispatch('fetchSkuByGoodsId', id).then((res) => {
					console.log(res.status === 200)
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
			console.log(data)
			console.log('添加到购物车')
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
		card,
		Toast,
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

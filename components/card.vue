<template>
	<van-row>
		<van-col span="8" offset="1" class="info">
			<img :src="picture" class="img" @click="goShoping">
  	</van-col>
  	<van-col span="13" offset="1" class="info">
  		<div class="title" @click="goShoping">
  			{{ title }}
  		</div>
  		<div class="price">
  			<div>{{ currency }}{{ price }}</div>
  		</div>
  		<div class="cart" @click="onClick">
  			<van-icon name="shopping-cart" class="cart-icon"/>
  		</div>
  	</van-col>
	</van-row>
</template>
<script>
import { Row, Col, Icon } from 'vant'

export default {
  components: {
    [Row.name]: Row, 
    [Col.name]: Col, 
    [Icon.name]: Icon
  },
  props: {
    id: [Number, String],
    title: String,
    picture: String,
    price: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },
  methods: {
    onClick() {
    	this.$emit('on-sku', this.id)
    },
    goShoping() {
      this.$emit('to-shoping', this.id)
    }
  }
}
</script>
<style scoped>
.img {
	position: absolute;
	right: 0;
	width: 118px;
}
.title {
  /*max-height: 40px;*/
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.info {
	height: 118px;
	position: relative;
	margin-top: 10px;
}
.price {
	position: absolute;
	left: 0;
	bottom: 10px;
	color: #f44;
}
.cart {
	position: absolute;
	right: 0;
	bottom: 10px;
	width: 26px;
	height: 26px;
	color: #f44;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: 2px #f44 solid;
}
.cart-icon {
	position: absolute;
	right: 5px;
	bottom: 5px;
}
</style>

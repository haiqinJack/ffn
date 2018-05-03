<template>
	<div class="van-contact-card" :class="[`van-contact-card--${type}`, { 'van-contact-card--uneditable': !editable }]" @click="onClick">
		<div class="van-contact-card__content">
			<template v-if="type === 'add'">
        <van-icon class="van-contact-card__icon" name="add2" />
        <div class="van-contact-card__text">{{ addText }}</div>
      </template>
      <template v-else-if="type === 'edit'">
      	<van-icon class="van-contact-card__icon" name="location" />
      	<div class="van-contact-card__text">
      		<div>收货人: {{ name }}，{{ tel }}</div>
      		<div class="address">收货地址：{{ province }} {{ city }} {{ county }} {{ address }}</div>
      	</div>
      </template>
		</div>
		<van-icon v-if="editable" class="van-contact-card__arrow" name="arrow" />
	</div>
</template>
<script>
import { Icon } from 'vant';

export default {
  props: {
    name: String,
    tel: String,
    address: String,
    province: String,
    city: String,
    county: String,
    addText: {
    	type: String,
    	default: '添加订单联系人信息'
    },
    type: String,
    editable: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    onClick(event) {
      if (this.editable) {
        this.$emit('click', event);
      }
    }
  },
  Components: {
  	Icon
  }
}
</script>
<style scoped>
.van-contact-card{
	position:relative;
	background-color:#fff
}
.van-contact-card:active{
	background-color:#e8e8e8
}
.van-contact-card--uneditable:active{
	background-color:#fff
}
.van-contact-card--add{
	line-height:40px
}
.van-contact-card--add .van-contact-card__icon{
	width:40px;
	color:#38f;
	font-size:40px
}
.van-contact-card--edit .van-contact-card__icon{
	font-size:18px;
	vertical-align:top
}
.van-contact-card__content{
	padding:15px 10px
}
.van-contact-card__icon,.van-contact-card__text{
	display:inline-block;
	vertical-align:middle
}
.van-contact-card__icon{
	margin-right:10px
}
.van-contact-card__text{
	width: 80%;	
	line-height:20px;
	font-size:14px
}
.van-contact-card__arrow{
	top:50%;
	right:10px;
	font-size:12px;
	position:absolute;
	color:#999;
	-webkit-transform:translate3d(0,-50%,0);
	transform:translate3d(0,-50%,0)
}
.van-contact-card::after{
	content:' ';
	display:block;
	width:100%;
	height:2px;
	background-image:url(data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAECAYAAAA3S5neAAAAAXNSR0IArs4c6QAAAIpJREFUOBHF0iESg1AMBNDshx4H0+EUSCxnQKBAVDIMjhnOgO8NOADTI7V/CcjU58ckq/aJQHTYto2u7bpdB3hjXWvb+Ry/jTC6e6CeQBIK6i3KJWfZbHsuDxiTeCCcc+m6SlGFhTnkHcty2J5y+lVM4NHv2D+vxxEkxsGiXHIIf99x95JJPIDcnhMVeyVty5S/SAAAAABJRU5ErkJggg==);
	background-size:34px 2px
}	
.address{
	font-size: 12px;
	color: #666;
}
</style>

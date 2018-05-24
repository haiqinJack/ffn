<template>
	<van-collapse v-model="activeNames">
	  <van-collapse-item  name="1">
	  	<div slot="title"><van-icon name="pending-orders" />&nbsp;发货管理</div>
			<van-cell title="订单查询" url="" class="bg"/>
			<van-cell title="运费模版" url="" class="bg"/>
	  </van-collapse-item>
	  <van-collapse-item name="2">
	  	<div slot="title"><van-icon name="tosend" />&nbsp;商品管理</div>
			<van-cell title="发布新商品" url="" class="bg"/>
			<van-cell title="商品列表" url="" class="bg"/>
			<van-cell title="商品数据" url="" class="bg"/>
	  </van-collapse-item>
	  <van-collapse-item name="3">
	  	<div slot="title"><van-icon name="shop" />&nbsp;店铺管理</div>
	    <van-cell title="商家/店铺信息" url="" class="bg"/>
	    <van-cell title="店铺装修" url="" class="bg"/>
	  </van-collapse-item>
	</van-collapse>	
</template>
<script>
import Vue from 'vue'
import { Collapse, CollapseItem, Icon, Cell, CellGroup } from 'vant'
import { Form, FormItem, Input, Upload, Button, Dialog} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Dialog)

export default {
  data() {
    return {
      activeNames: ['1','2','3']
    };
  },
	components: {
		[Collapse.name]: Collapse, 
		[CollapseItem.name]: CollapseItem, 
		[Icon.name]: Icon, 
		[Cell.name]: Cell,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		[Input.name]: Input,
		[Upload.name]: Upload,
		[Button.name]: Button,
		[Dialog.name]: Dialog
	},
}
</script>
<style>
.van-collapse-item__content {
  padding: 0;
}
.van-cell {
	background-color: #f4f5f9;
}
.bg {
	padding-left: 20px;
}
.bg:hover {
	border-left: 2px solid red;
	background-color: #fff;
}
</style>

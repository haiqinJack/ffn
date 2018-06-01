<template>
	<div v-if="order.length !== 0">
		<van-panel 
			v-for="(item, index) in order"
			:key="item.out_trade_no + index"
			title="法弗纳小铺" 
			:desc="'订单编号:' + item.out_trade_no" 
			:status="item.status">
		  <van-card v-for="(v, i) in order[index].goods"
		  	:key="v.title + i"
			  :title="v.title"
			  :desc="v.desc"
			  :num="v.num"
			  :price="(v.price / 100).toFixed(2)"
			  :thumb="v.picture"
			/>
	<!-- 		  <div slot="footer">
		  	<van-row>
		  		<van-col span="5" offset="19">
		    		<van-button size="small">再来一单</van-button>  			
		  		</van-col>
		  	</van-row>
		  </div> -->
		</van-panel>
	</div>				
  <div v-else class="Zero">
    <h3>订单空空如也～</h3>
    <van-button @click="gotoShoping">
      去逛逛
    </van-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Panel, Card} from 'vant'

export default {
	middleware: 'wechat-auth',
	head(){
		return {
			title: '我的订单'
		}
	},
	data() {
		return {
			// order: [
			// 	{
			// 		// title: '法弗纳小铺',
			// 		out_trade_no: 'ffn20123123123123',
			// 		status: '交易关闭',
			// 		goods: [
			// 			{
			// 				title:'【蚊子杀手】啊实打实的',
			// 				desc: '白色',
			// 				price: 200,
			// 				num: 2,
			// 				picture: 'http://p8p8yzlxl.bkt.clouddn.com/Fh25SnYGs49iAfH2tDndkHu-g3Z8'
			// 			}
			// 		]
			// 	}
			// ]
		}
	},
	computed: {
    ...mapState([
      'order'
    ])
	},
	methods: {
		gotoShoping() {
			this.$router.push({ path: '/shoping' })
		}
	},
	beforeCreate() {
		let status = this.$route.query.status
		this.$store.dispatch('fetchOrder', status=0)
	},
	compoents: {
		[Card.name]: Card,
		[Panel.name]: Panel
	}
}
</script>
<style lang="less">
.Zero {
  text-align: center;
  padding-top: 50px;
  button {
    margin-top: 30px;
  }
}	
</style>

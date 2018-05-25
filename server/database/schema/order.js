const mongoose = require('mongoose')

const Schema = mongoose.Schema
const OrderSchema = new Schema({
	unionid: String,
	goods:[
		{
			title: String, // 标题
			desc: String, // 规格
			price: Number, // 单价
			num: Number, // 数量
			expressPrice: Number, // 快递费用
			picture: String // 缩略图
		}
	],
	address: { 
		name: String, // 收件人
		tel: String,// 电话
		address: String // 地址
	},
	totalFee: Number, // 支付金额
	message: String, // 留言
	success: { // 支付成功?
		type: Boolean,
		default: false
	},
	payType: { // 支付类型
		type: String,
		enum: ['JSAPI', 'NATIVE', 'APP'],
		default: 'JSAPI'
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}	
})

OrderSchema.pre('save', function(next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

const Order = mongoose.model('Order', OrderSchema)

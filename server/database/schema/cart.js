const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CartSchema = new Schema({
	unionid: String, //用户ID
	id: Number,
	title: String,// 标题
	price: Number, // 单价 (分)
	expressPrice: Number,// 运费,
	num: Number,// 数量
	desc: String,// 已选取的规格
	picture: String,// 缩略图
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

CartSchema.pre('save', function(next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

const Cart = mongoose.model('Cart', CartSchema)

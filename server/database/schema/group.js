const mongoose = require('mongoose')

const Schema = mongoose.Schema
const GroupSchema = new Schema({
	name: String,// 分组名称
	goods_list: [ // 商品ID集合
		String
	],
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

GroupSchema.pre('save', function(next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

const Group = mongoose.model('Group', GroupSchema)

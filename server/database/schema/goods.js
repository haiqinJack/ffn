const mongoose = require('mongoose')

const Schema = mongoose.Schema
const GoodsSchema = new Schema({
	id: Number,
	title: String,// 标题
	expressPrice: Number,// 运费,
	price: Number, // 单价
	picture: String,// 缩略图
	stock_num: Number,// 商品总库存
	collection_id: Number,// 无规格商品 skuId 取 collection_id
	none_sku: {// 是否无规格商品
		type: Boolean,
		default: false
	},
	thumb: [// 轮播图
		String
	],
	imageList: [ // 详细图
		String
	],
	// 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
	sku: {
		tree: [
			{
				k: String, // 规格类目
				v: [{// 规格值
					id: String, 
					name: String, 
					imgUrl: String
				}],
				k_s: {// 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
					type: String,
					enum: ['s1', 's2', 's3']
				}
			}
		],
		// 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
		list: [{
			id: Number,// skuId，下单时后端需要
			price: Number,// 价格（单位分）
			s1: String,// 规格类目 k_s 为 s1 的对应规格值 id
			s1Name: String,
			s2: String,// 规格类目 k_s 为 s2 的对应规格值 id
			s2Name: String,
			s3: String,// 规格类目 k_s 为 s3 的对应规格值 id
			s3Name: String,
			stock_num: Number// 当前 sku 组合对应的库存
		}]
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

GoodsSchema.pre('save', function(next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

const Goods = mongoose.model('Goods', GoodsSchema)

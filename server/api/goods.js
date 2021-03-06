import mongoose from 'mongoose'

const Goods = mongoose.model('Goods')

/**
 * 获取商品卡片
 * @param { Number } limit 获取数量 
 */
export async function getGoodsCard(limit = 20) {
	const data = await Goods.find({}, 'id title picture price expressPrice').sort('-id').limit(Number(limit)).exec()

	return data
}

/**
 * 根据商品ID获取一个商品
 * @param { [String, Number] } id 商品ID
 */

export async function getGoodsOneById(id) {
	const data = await Goods.findOne({id: id}).exec()

	return data
}

/**
 * 根据商品ID获取商品SKU属性
 * @param { [String, Number] } id 商品ID
 */
export async function getGoodsByIdForSKU(id) {
	const data = await Goods.findOne({id: id}, 'sku').exec()

	return data
}

/**
 * 查找商品
 * @param { Array } arr 查找条件
 */
export async function findsGoods(arr) {
	const data = await Goods.find({_id: {$in: arr}}).exec()

	return data
}

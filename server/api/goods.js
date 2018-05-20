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
 * 保存商品
 * @param { Object } goods 商品对象
 */
export async function saveGoods(goods) {
	goods = new Goods(goods)

	goods = await goods.save()

	return goods
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


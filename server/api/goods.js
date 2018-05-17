import mongoose from 'mongoose'

const Goods = mongoose.model('Goods')

export async function getGoodsCard(limit = 20) {
	const data = await Goods.find({}, 'id title picture price').limit(Number(limit)).exec()

	return data
}

export async function saveGoods(goods) {
	goods = new Goods(goods)

	goods = await goods.save()

	return goods
}

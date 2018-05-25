import mongoose from 'mongoose'

const Order = mongoose.model('Order')

/**
 * 保存商品
 * @param { Object } order 商品对象
 */
export async function createOrder(order) {
	order = new Order(order)

	order = await order.save()

	return order
}

export async function fetchOrderByUnionid(unionid) {
	const data  = await Order.find({unionid}).sort('-id').exec()
	return data
}

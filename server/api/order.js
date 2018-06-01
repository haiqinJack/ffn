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


export async function fetchOrderByUnionid(unionid, status) {
	let data = null
	if(status == 0) {
		data  = await Order.find({unionid}, 'out_trade_no goods status').sort('-_id').exec()
	}else {
		data = await Order.find({unionid, status}).sort('-_id').exec()
	}
	return data
}

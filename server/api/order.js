import mongoose from 'mongoose'

const Order = mongoose.model('Order')

/**
 * 保存订单
 * @param { Object } order 订单对象
 */
export async function createOrder(order) {
	order = new Order(order)

	order = await order.save()

	return order
}

/**
 * 查询订单
 * @params { String } unionid 用户标示
 * @params { Number } status 2-待发货, 3-已发货, 5-已完成, 8-维权中
 * @params { Boolean } success 是否已经付款
 */
export async function fetchOrderByUnionid(unionid, status, success=true) {
	let data = null
	if(status == 0) {
		data  = await Order.find({unionid, success}, 'out_trade_no goods status').sort('-_id').exec()
	}else {
		data = await Order.find({unionid, status, success}).sort('-_id').exec()
	}
	return data
}

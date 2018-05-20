import mongoose from 'mongoose'

const Cart = mongoose.model('Cart')

/**
 * 获取用户购物车列表
 * @param { String } unionid ID
 */
export async function getCartByUnionid(unionid, limit = 20) {
	const data = await Cart.find({unionid: unionid}).sort('-meta.updateAt').limit(Number(limit)).exec()

	return data
}

/**
 * 添加商品到购物车	
 * @param { Object } cart 购物车对象
 */
export async function saveCart(unionid, cart) {
	let conditions = {unionid: unionid, id: cart.id, desc: cart.desc}
	let update = Object.assign({}, cart, {unionid})
	// new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
	// upsert: bool - creates the object if it doesn't exist. defaults to false.
	let options = {new: true, upsert: true}
	const data = await Cart.findOneAndUpdate(conditions, update, options).exec()

	return data

}



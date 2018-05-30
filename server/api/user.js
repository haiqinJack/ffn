import mongoose from 'mongoose'

const User = mongoose.model('User')

export async function getUserAddressByOpenId(unionid) {
	const data  = await User.findOne({unionid}, {address: 1}).exec()
	return data
}

export async function PushOneUserAddress(unionid, address) {
	let conditions = {unionid}
	let update = { $push: { address } }
	let options = {new: true, upsert: true}
	const data = await User.updateOne(conditions, update, options)

	return data
}

import mongoose from 'mongoose'

const Group = mongoose.model('Group')

/**
 * 根据ID查找指定分组
 * @param { String } _id _id
 */
export async function findOneGroup(_id) {
	const data = await Group.findOne({_id: _id}, 'goods_list').exec()

	return data
}

//获取分组
export async function findGroup() {
	const data = await Group.find({}).exec()

	return data
}

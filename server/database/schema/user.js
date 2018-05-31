const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
	openid: String,
	nickname: String, // 用户昵称
	sex: {// 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
		type: String,
		enum: ['0', '1', '2']
	}, 

	province: String, // 用户个人资料填写的省份
	city: String, // 普通用户个人资料填写的城市
	country: String, // 国家，如中国为CN
	headimgurl: String, // 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
	privilege: [], // 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
	unionid: String,
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

UserSchema.pre('save', function(next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

const User = mongoose.model('User', UserSchema)

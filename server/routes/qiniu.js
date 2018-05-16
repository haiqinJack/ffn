import { controller, get } from  '../decorator/router'
import config from '../config'
import wechatMiddle from '../wechat-lib/middleware'
import qiniu from '../libs/qiniu'

@controller('')
export class QiniuController{
	@get('/qiniu')
	QiniuToken(ctx, next) {
		let token = qiniu.fetchToken()
		ctx.status = 200
		ctx.body = {
			token: token
		}	
	}
}

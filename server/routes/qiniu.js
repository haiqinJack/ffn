import { controller, get } from  '../decorator/router'
import config from '../config'
import qiniu from '../libs/qiniu'

@controller('/api')
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

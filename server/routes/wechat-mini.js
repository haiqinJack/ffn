import { controller, post } from  '../decorator/router'
import { pay2 } from '../controllers/wechat'
import { openidAndSessionKey, WXBizDataCrypt } from '../wechat/mini'

@controller('/api/wechat')
export class WechatMiniController{
	@post('/login')
	async login(ctx, next) {
		const { code, userInfo } = ctx.request.body

		try {
			const {session_key, openid, unionid} = await openidAndSessionKey(code)
			// 获取用户详细信息.
			const pc = new WXBizDataCrypt(session_key)
			const decryptData = pc.decryptData(userInfo.encryptedData, userInfo.iv)
			
			ctx.body = {
				success: true,
				data: decryptData
			}	
		} catch(e) {
			ctx.body ={
				success: false,
				msg: '服务器异常'
			}
		}
	}

	@post('/mini-pay')
	async wechatMiniPay(ctx, next) {
		await pay2(ctx, next)
	}
}

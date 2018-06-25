import { controller, get, post } from  '../decorator/router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth, pay, notify, createMenu } from '../controllers/wechat'

@controller('')
export class WechatController{
	@get('/wechat')
	async wechatHear(ctx, next) {
		await wechatMiddle(config.wechat, reply)(ctx, next)
	}

	@post('/wechat')
	async wechatPostHear(ctx, next) {
		const middle = wechatMiddle(config.wechat, reply)
		await middle(ctx, next)
	}

	@get('/wechat-signature')
	async wechatSignature(ctx, next) {
		await signature(ctx, next)
	}

	@get('/wechat-redirect')
	async wechatRedirect(ctx, next) {
		await redirect(ctx, next)
	}

	@get('/wechat-oauth')
	async wechatOauth(ctx, next) {
		await oauth(ctx, next)
	}

	@post('/wechat-pay')
	async wechatPay(ctx, next){
		await pay(ctx, next)
	}

	@post('/wechat-notify')
	a() {
		return notify()
	}

	@get('/wechat-menu')
	async createMenu(ctx, next) {
		await createMenu(ctx, next)
	}

}

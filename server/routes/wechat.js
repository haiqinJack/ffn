import Router from 'koa-router'
import { controller, get, post } from  '../decorator/router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'

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
}


// export const router = app => {
// 	const router = new Router();

// 	router.all('/wechat', wechatMiddle(config.wechat, reply)
// 	);

// 	router.get('/user', signature)
// 	router.get('/wechat-oauth', oauth)
// 	router.get('/wechat-redirect', redirect)
// 	router.get('/tag', async (ctx, next) => {
// 		let mp = require('../wechat')
// 		let client = mp.getWechat()
// 		const data = await client.handle('fetchUserInfo', 'o5Yi9wOfXWopOcMYiujWBZmwBH0Q')
// 		ctx.body = data
// 	})
// 	app.use(router.routes()).use(router.allowedMethods());
// }
 

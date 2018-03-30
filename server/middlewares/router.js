import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
	const router = new Router();

	router.all('/wechat', wechatMiddle(config.wechat, reply)
	);

	router.get('/user', async (ctx, next) => {
		let mp = require('../wechat')
		let client = mp.getWechat()
		const data = await client.handle('fetchUserList')

		ctx.body = data
	})

	router.get('/tag', async (ctx, next) => {
		let mp = require('../wechat')
		let client = mp.getWechat()
		const data = await client.handle('fetchUserInfo', 'o5Yi9wOfXWopOcMYiujWBZmwBH0Q')
		ctx.body = data
	})
	app.use(router.routes()).use(router.allowedMethods());
}
 

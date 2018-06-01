import { controller, get, post } from  '../decorator/router'
import * as api from '../api'

@controller('/api/u')
export class OrderController{
	@get('/order/:unionid/:status')
	async fetchOrder(ctx, next) {
		let { unionid, status } = ctx.params
		let data = await api.fetchOrderByUnionid(unionid, status)

		ctx.body = {
			success: true,
			data: data
		}
	} 
}

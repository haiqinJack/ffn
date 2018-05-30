import { controller, get, post } from  '../decorator/router'
import * as api from '../api/user'

@controller('/api/u')
export class CartController{
	@get('/address/:id')
	async fetchCartByUnionid(ctx, next) {
		let { id } = ctx.params
		const data = await api.getUserAddressByOpenId(id)

		ctx.body = {
			success: true,
			data: data
		}
	}

	@post('/address/create')
	async saveUserAddress(ctx, next) {
		let { unionid, address } = ctx.request.body
		address.id = Date.now()

		const data = await api.PushOneUserAddress(unionid, address)

		ctx.body = {
			success: true,
			data: data
		}
	}
}

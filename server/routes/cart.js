import xss from 'xss'
import R from 'ramda'
import { controller, get, post } from  '../decorator/router'
import * as api from '../api/cart'
import config from '../config'

@controller('/api/cart')
export class CartController{
	@post('/create')
	async createCart(ctx, next) {
		let { unionid, cart} = ctx.request.body
		
		const data = await api.saveCart(unionid, cart)

		ctx.body = {
			success: true,
			data: data
		}
	}

	@get('/:id')
	async fetchCartByUnionid(ctx, next) {
		let { id } = ctx.params
		const data = await api.getCartByUnionid(id)

		ctx.body = {
			success: true,
			data: data
		}
	}
}

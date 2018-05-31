import xss from 'xss'
import R from 'ramda'
import { controller, get, post } from  '../decorator/router'
import * as api from '../api/goods'

@controller('/api/goods')
export class GoodsController{
	@get('/all')
	async fetchGoodsCard(ctx, next) {
		const data = await api.getGoodsCard()

		ctx.body = {
			success: true,
			data: data
		}
	}

	@get('/:id')
	async fetchGoodsOne(ctx, next) {
		let { id } = ctx.params
		const data = await api.getGoodsOneById(id)

		ctx.body = {
			success: true,
			data: data
		}
	}

	@get('/sku/:id')
	async fetchSKUById(ctx, next) {
		let { id } = ctx.params
		const data = await api.getGoodsByIdForSKU(id)

		ctx.body = {
			success: true,
			data: data
		}
	} 
}

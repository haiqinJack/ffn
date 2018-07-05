import xss from 'xss'
import R from 'ramda'
import { controller, get, post } from  '../decorator/router'
import * as api from '../api'

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

	@get('/group/:id')
	async fetchGroupGoods(ctx, next) {
		let { id } = ctx.params
		const group = await api.findOneGroup(id)
		try {
			const data = await api.findsGoods(group.goods_list)
			ctx.body = {
				success: true,
				data: data
			}
		}catch (e) {
			ctx.body = {
				success: false,
				data: []
			}
		}
	}	 
}

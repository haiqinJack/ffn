import xss from 'xss'
import R from 'ramda'
import { controller, get, post } from  '../decorator/router'
import * as api from '../api/goods'

@controller('/api/goods')
export class GoodsController{
	@post('/create')
	async createGoods(ctx, next) {
		let goods = ctx.request.body
		let id = new Date().getTime()
		goods = {
			id: id,
			title: xss(goods.title),
			info: xss(goods.info),
			expressPrice: goods.expressPrice,
			thumb: R.map(item => xss(item), goods.thumb),
			imageList: R.map(item => xss(item),goods.imageList),
			picture: xss(goods.picture),
			price: (xss(goods.price) * 100),
			sku: {
				tree: R.map((item) => ({
					k: xss(item.k),
					k_s: xss(item.k_s),
					v: R.map(i => {
						return i.imgUrl ? 
						({
							id: i.id? xss(i.id) : i.id,
							name: xss(i.name),
							imgUrl: xss(i.imgUrl)
						}) :
						({
							id: i.id? xss(i.id) : i.id,
							name: xss(i.name)
						})
					}
					)(item.v)
				}), goods.sku.tree),
				list: R.map(item => ({
					id: id,
					price: (xss(goods.price) * 100),
					s1: item.s1? xss(item.s1) : item.s1,
					s1Name: item.s1Name? xss(item.s1Name) : '',
					s2: item.s2? xss(item.s2) : item.s2,
					s2Name: item.s2? xss(item.s2Name) : '',
					s3: item.s3? xss(item.s3) : item.s3,
					s3Name: item.s3Name? xss(item.s3Name): '',
					stock_num: item.stock_num? xss(item.stock_num): 0
				}), goods.sku.list),
				price: xss(goods.price),
				none_sku: goods.sku.none_sku,
				collection_id: id,
				stock_num: goods.stock_num? xss(goods.stock_num): goods.stock_num,
			}			
		}
		const data = await api.saveGoods(goods)

		ctx.body = {
			success: true,
			data: data
		}
	}

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

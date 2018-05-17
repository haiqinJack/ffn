import xss from 'xss'
import R from 'ramda'
import { controller, get, post } from  '../decorator/router'
import * as api from '../api/goods'
import config from '../config'

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
			stock_num: xss(goods.stock_num),
			price: xss(goods.price),
			sku: {
				tree: R.map((item) => ({
					k: xss(item.k),
					v: R.map(i => {
						return i.imgUrl ? 
						({
							id: xss(i.id),
							name: xss(i.name),
							imgUrl: xss(i.imgUrl)
						}) :
						({
							id: xss(i.id),
							name: xss(i.name)
						})
					}
					)(item.v)
				}), goods.sku.tree),
				list: R.map(item => ({
					id: id,
					price: xss(item.price),
					s1: item.s1? xss(item.s1) : '',
					s1Name: item.s1Name? xss(item.s1Name) : '',
					s2: item.s2? xss(item.s2) : '',
					s2Name: item.s2? xss(item.s2Name) : '',
					s3: item.s3? xss(item.s3) : '',
					s3Name: item.s3Name? xss(item.s3Name): '',
					stock_num: item.stock_num? xss(item.stock_num): 0
				}), goods.sku.list),
				none_sku: goods.sku.none_sku,
				collection_id: id,
				stock_num: xss(goods.sku.stock_num),
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
}

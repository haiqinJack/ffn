import * as api from '../api'
import {parse as urlParse } from 'url'
import {parse as queryParse } from 'querystring'
import config from '../config'
import * as wechatPay from '../wechat-lib/pay'

export async function signature(ctx, next) {
	let url = ctx.query.url
	if(!url) ctx.throw(404)

	url = decodeURIComponent(url)

	const data = await api.getSignatureAsync(url)
	
	ctx.body = {
		success: true,
		data: data
	}
}

export async function redirect(ctx, next) {
	const target  = config.SITE_ROOT_URL + '/oauth'
	const scope = 'snsapi_userinfo'
	const { visit } = ctx.query
	const params = `${visit}`
	// const url = api.getAuthorizeURL(target, params, scope)
	const url = api.getAuthorizeURL(target, params)

	ctx.redirect(url)
}

export async function oauth(ctx, next) {
	let url = ctx.query.url
	url = decodeURIComponent(url)
	const urlObj = urlParse(url)
	const params = queryParse(urlObj.query)
	const code = params.code
	const user = await api.getUserInfoByCode(code)

	ctx.body = {
		success: true,
		data: user
	}
}

export async function pay(ctx, next) {
	const ip = ctx.ip.replace('::fff:', '')
	const { unionid, total, message, contact, products } = ctx.request.body
	let order = {
		unionid,
		totalFee: total, 
		message, 
		address: contact, 
		goods: products
	}
	const data = await api.createOrder(order)
	const orderParams = {
	  body: '法弗纳科技小铺',
	  attach: '法弗纳科技小铺',
	  out_trade_no: 'ffn' + (+new Date),
	  total_fee: total,
	  spbill_create_ip: ip,
	  openid: unionid,
	  trade_type: 'JSAPI'
	}

	const payargs = await wechatPay.getBrandWCPayRequestParams(orderParams)

	ctx.body= {
		success: true,
		data: payargs
	}
}

export function notify () {
	return wechatPay.notifyMiddleware()
}

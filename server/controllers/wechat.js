import * as api from '../api'
import {parse as urlParse } from 'url'
import {parse as queryParse } from 'querystring'
import config from '../config'
import * as wechatPay from '../wechat-lib/pay'
import menu from '../config/menu.js'
import getClintIp from 'ipware'

const getIp = getClintIp().getIp

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
	if(!ctx.session.user){
		// const url = api.getAuthorizeURL(target, params, scope)
		const url = api.getAuthorizeURL(target, params)
		ctx.redirect(url)
	}else {
		const url = config.SITE_ROOT_URL + '/oauth?' +'code=abc&state=' + visit
		ctx.redirect(url)
	}	
}

export async function oauth(ctx, next) {
	if(!ctx.session.user){
		let url = ctx.query.url
		if(url) {
			url = decodeURIComponent(url)
			const urlObj = urlParse(url)
			const params = queryParse(urlObj.query)
			const code = params.code
			const user = await api.getUserInfoByCode(code)

			ctx.session.user = user

			ctx.body = {
				success: true,
				data: user
			}
		} else {
			ctx.redirect('/wechat-redirect')
		}
	}else {
		ctx.body = {
			success: true,
			data: ctx.session.user
		}
	}
}

export async function pay(ctx, next) {
	const ipInfo = getIp(ctx.request.req)
	let ip = ipInfo.clientIp
	ip = ip.replace('::ffff:', '')
	const { unionid, total, message, contact, products } = ctx.request.body
	let order = {
		unionid,
		totalFee: total, 
		message, 
		address: contact, 
		goods: products
	}
	console.log(products)
	let out_trade_no = 'ffn'+ (new Date)
	const orderParams = {
	  body:'法弗纳商城-智能设备',
	  attach: '法弗纳商城-智能设备',
	  out_trade_no: out_trade_no,
	  total_fee: total,
	  spbill_create_ip: ip,
	  openid: ctx.session.user.openid,
	  trade_type: 'JSAPI'
	}

	const payargs = await wechatPay.getBrandWCPayRequestParams(orderParams)

	order.out_trade_no = out_trade_no
	order.paySign = params.paySign

	const data = await api.createOrder(order)

	ctx.body= {
		success: true,
		data: payargs
	}
}

export function notify () {
	return wechatPay.notifyMiddleware()
}

export async function createMenu(ctx, next) {
	console.log(menu)
	const data = await api.createMenu(menu)

	ctx.status= 200
	ctx.body = {
		success: true,
		data: data
	}
}

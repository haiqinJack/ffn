import fs from 'fs'
import wechatPay from 'wechat-pay'
import config from '../config'
import { resolve } from 'path'

const cert = resolve(__dirname, '../', 'config/cert/apiclient_cert.p12')

const PaymentConfig = {
	partnerKey: config.shop.key,
  appId: config.wechat.appID,
  mchId: config.shop.mchId,
  notifyUrl: config.shop.notifyUrl,
  pfx: fs.readFileSync(cert)
}

const PaymentConfig2 = {
	partnerKey: config.shop.key,
  appId: config.wechatMini.appID,
  mchId: config.shop.mchId,
  notifyUrl: config.shop.notifyUrl,
  pfx: fs.readFileSync(cert)
}
const Payment = wechatPay.Payment
const payment = new Payment(PaymentConfig || {})
const payment2 = new Payment(PaymentConfig2 || {})
export const getBrandWCPayRequestParams = (order) =>{
	return new Promise((resolve, reject) => {
		payment.getBrandWCPayRequestParams(order, (err, payargs) => {
			if(err) {
				reject(err)
			}else{
				resolve(payargs)
			}	
		})
	})
}

export const getBrandWCPayRequestParams2 = (order) =>{
	return new Promise((resolve, reject) => {
		payment2.getBrandWCPayRequestParams(order, (err, payargs) => {
			if(err) {
				reject(err)
			}else{
				resolve(payargs)
			}	
		})
	})
}

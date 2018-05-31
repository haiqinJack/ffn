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

const Payment = wechatPay.Payment
const middleware = wechatPay.middleware(PaymentConfig)
const payment = new Payment(PaymentConfig || {})

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

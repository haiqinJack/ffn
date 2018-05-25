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

export const notifyMiddleware = () => {
	return middleware.getNotify().done(function(message, req, res, next) {
	  var openid = message.openid;
	  var order_id = message.out_trade_no;
	  var attach = {};
	  try{
	   attach = JSON.parse(message.attach);
	  }catch(e){}
	 
	  /**
	   * 查询订单，在自己系统里把订单标为已处理
	   * 如果订单之前已经处理过了直接返回成功
	   */
	  res.reply('success');
	 
	  /**
	   * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
	   * res.reply(new Error('...'))
	   */
	})
}

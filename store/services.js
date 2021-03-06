import axios from 'axios'
import config from '../server/config'

const baseUrl = '/api'
const url = 'http://rap2api.taobao.org/app/mock/10346//api'

class Services {
	getWechatSignture (url) {
		return axios.get(`/wechat-signature?url=${encodeURIComponent(url)}`)
	}
	getUserInfoByOAuth (url) {
		return axios.get(`/wechat-oauth?url=${url}`)
	}
	createOrder(unionid, total, message, contact, products) {
		return axios.post('/wechat-pay', {unionid, total, message, contact, products})
	}
	fetchGoods(goodsId) {
    return axios.get(`${baseUrl}/goods/${goodsId}`)
	}
	fetchAllGoods() {
    return axios.get(`${baseUrl}/goods/all`)
	}
	fetchSkuByGoodsId(goodsId) {
    return axios.get(`${baseUrl}/goods/sku/${goodsId}`)
	}
	fetchQiniuToken() {
		return axios.get(`${baseUrl}/qiniu`)
	}
	saveCart(unionid, cart) {
		return axios.post(`${baseUrl}/cart/create`, {unionid, cart})
	}
	fetchCartList(id) {
		return axios.get(`${baseUrl}/cart/${id}`)
	}	
	fetchOrder(unionid, status) {
		return axios.get(`${baseUrl}/u/order/${unionid}/${status}`)
	}
}

export default new Services()

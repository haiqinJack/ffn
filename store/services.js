import axios from 'axios'

const baseUrl = '/api'
const url = 'http://rap2api.taobao.org/app/mock/10346//api'

class Services {
	getWechatSignture (url) {
		return axios.get(`${baseUrl}/user?url=${url}`)
	}
	getUserInfoByOAuth (url ) {
		return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
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
	saveGoods(goods) {
		return axios.post(`${baseUrl}/goods/create`, goods)
	}
	saveCart(unionid, cart) {
		return axios.post(`${baseUrl}/cart/create`, {unionid, cart})
	}
	fetchCartList(id) {
		return axios.get(`${baseUrl}/cart/${id}`)
	}	
}

export default new Services()

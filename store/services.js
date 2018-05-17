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
	fetchCartList(id) {
		return axios.get(`${url}/user/cart/${id}`)
	}
	fetchGoods(goodsId) {
    return axios.get(`${url}/goods/${goodsId}`)
	}
	fetchAllGoods() {
    return axios.get(`${baseUrl}/goods/all`)
	}
	fetchSkuByGoodsId(goodsId) {
    return axios.get(`${url}/goods/sku/${goodsId}`)
	}
	fetchQiniuToken() {
		return axios.get(`${baseUrl}/qiniu`)
	}
	saveGoods(goods) {
		return axios.post('api/goods/create', goods)
	}
}

export default new Services()

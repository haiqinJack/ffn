import axios from 'axios'

const baseUrl = ''
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
    return axios.get(`${url}/allgoods`)
	}
	fetchSkuByGoodsId(goodsId) {
    return axios.get(`${url}/goods/sku/${goodsId}`)
	}
}

export default new Services()

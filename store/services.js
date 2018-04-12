import axios from 'axios'

const baseUrl = ''

class Services {
	getWechatSignture (url) {
		return axios.get(`${baseUrl}/user?url=${url}`)
	}
	getUserInfoByOAuth (url ) {
		return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
	}
}

export default new Services()

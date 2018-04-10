import axios from 'axios'

const baseUrl = ''

class Services {
	getWechatSignture (url) {
		return axios.get(`${baseUrl}/user?url=${url}`)
	}
}

export default new Services()

import request from 'request-promise'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
	accessToken: base + 'token?grant_type=client_credential',
	user: {
		fetchUserList: base + 'user/get?'
	}
}

export default class Wechat {
	constructor(opts) {
		this.opts = Object.assign({}, opts)
		this.appID = opts.appID
		this.appSecret = opts.appSecret
		this.getAccessToken = opts.getAccessToken
		this.saveAccessToken = opts.saveAccessToken
		
	}

	async handle(operation, ...args) {
		const tokenData = await this.fetchAccessToken()
		const options = this[operation](tokenData.access_token, ...args)
		const data = await request(options)

		return data
	}

	async request(options) {
		options = Object.assign({}, options, {json: true})

		try{
			const response = await request(options)
			return response
		}catch(error) {
			console.error(error)
		}

	}

	async fetchAccessToken() {
		let data = await this.getAccessToken()
		if(!this.isValidAccessToken(data)){
			data =  await this.updateAccessToken()
			await this.saveAccessToken(data)
		}

		return data
	}

	async updateAccessToken() {
		const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`
		
		const data = await this.request({url: url})
		const now = (new Date().getTime())
		const expiresIn = now + (data.expires_in - 20) * 1000
		data.expires_in = expiresIn

		return data
	}

	isValidAccessToken(data) {
		if(!data || !data.access_token || !data.expires_in){
			return false
		}

		const expiresIn = data.expires_in
		const now = (new Date().getTime())

		if(now < expiresIn){
			return true
		}else{
			return false
		}

	}

	fetchUserList(token, openid) {
		const url = `${api.user.fetchUserList}access_token=${token}&next_openid=${openid || ''}`
		return {url}
	}
}

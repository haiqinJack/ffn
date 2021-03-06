import request from 'request-promise'
import { signature } from './util'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
	accessToken: base + 'token?grant_type=client_credential',
	ticket: base + 'ticket/getticket?',
	user: {
		info: base + 'user/info?',
		batchInfo: base + 'user/info/batchget?',
		fetchUserList: base + 'user/get?',
		remark: base + 'user/info/updateremark?'
	},
	tag: {
		create: base + 'tags/create?',
		fetch: base + 'tags/get?',
		update: base + 'tags/update?',
		del: base + 'tags/delete?',
		fetchUsers: base + 'user/tag/get?',
		batchTag: base + 'tags/members/batchtagging?',
		batchUnTag: base + 'tags/members/batchuntagging?',
		getUserTagList: base + 'tags/getidlist?'
	},
	menu: {
		create: base + 'menu/create?',
		delete: base + 'menu/delete?'
	}
}

export default class Wechat {
	constructor(opts) {
		this.opts = Object.assign({}, opts)
		this.appID = opts.appID
		this.appSecret = opts.appSecret
		this.getAccessToken = opts.getAccessToken
		this.saveAccessToken = opts.saveAccessToken	
		this.getTicket = opts.getTicket
		this.saveTicket = opts.saveTicket
	}

	deleteMenu(token) {
		const url = `${api.menu.delete}access_token=${token}`

		return {url}
	}

	createMenu(token, menu) {
		const url = `${api.menu.create}access_token=${token}`

		return {method: 'POST', url: url, body: menu}
	}

	signature(ticket, url) {
		return signature(ticket, url)
	}

	getUserTagList(token, openid) {
		const url = `${api.tag.getUserTagList}access_token=${token}`
		const form = {
			openid: openid
		}

		return {method: 'POST', url: url, body: form}
	}

	batchUnTag(token, openIdList, tagid) {
		const url = `${api.tag.batchUnTag}access_token=${token}`
		const form = {
			openid_list: openIdList,
			tagid: tagid
		}

		return {method: 'POST', url: url, body: form}
	}

	batchTag(token, openIdList, tagid) {
		const url = `${api.tag.batchTag}access_token=${token}`
		const form = {
			openid_list: openIdList,
			tagid: tagid
		}

		return {method: 'POST', url: url, body: form}
	}

	fetchTagUsers(token, tagId, openid='') {
		const url = `${api.tag.fetchUsers}access_token=${token}`
		const form = {
			tagid: tagId,
			next_openid: openid
		}

		return {method: 'POST', url: url, body: form}
	}

	delTag(token, tagId) {
		const url = `${api.tag.del}access_token=${token}`
		const form = {
			tag: {
				id: tagId
			}
		}

		return {method: 'POST', url: url, body: form}
	}

	updateTag(token, tagId, name) {
		const url = `${api.tag.update}access_token=${token}`
		const form = {
			tag: {
				id: tagId,
				name: name
			}
		}
		return {method: 'POST', url: url, body: form}
	}

	fetchTag(token) {
		const url = `${api.tag.fetch}access_token=${token}`

		return {url}
	}

	createTag(token, name) {
		const url = `${api.tag.create}access_token=${token}`
		const form = {
			tag: {
				name: name
			}
		}

		return {method: 'POST', url: url, body: form}
	}

	fetchUserList(token, openid='') {
		const url = `${api.user.fetchUserList}access_token=${token}&next_openid=${openid}`

		return {url}
	}

	remarkUser(token, openid, remark) {
		const url = `${api.user.remark}access_token=${token}`
		const form = {openid, remark}
		return {method: 'POST', url: url, body: form}
	}

	batchUserInfo(token) {
		const url = `${api.user.batchInfo}access_token=${token}`

		return {url}
	}

	fetchUserInfo(token, openid, lang='zh_CN') {
		const url = `${api.user.info}access_token=${token}&openid=${openid}&lang=${lang}`

		return {url}
	}
	async handle(operation, ...args) {
		const tokenData = await this.fetchAccessToken()
		const options = this[operation](tokenData.access_token, ...args)
		const data = await this.request(options)

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
		if(!this.isValidToken(data, 'access_token')){
			data =  await this.updateAccessToken()
			await this.saveAccessToken(data)
		}

		return data
	}

	async updateAccessToken() {
		const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`
		
		const data = await this.request({url: url})
		const now = (new Date().getTime())
		const expiresIn = now + (data.expires_in - 60) * 1000
		data.expires_in = expiresIn

		return data
	}

	async fetchTicket() {
		let data = await this.getTicket()
		if(!this.isValidToken(data, 'ticket')){
			const tokenData = await this.fetchAccessToken()
			data =  await this.updateTicket(tokenData.access_token)
			await this.saveTicket(data)
		}

		return data
	}

	async updateTicket(token) {
		const url = `${api.ticket}access_token=${token}&type=jsapi`
		const data = await this.request({url: url})
		const now = (new Date().getTime())
		const expiresIn = now + (data.expires_in - 60) * 1000
		data.expires_in = expiresIn

		return data		
	}

	isValidToken(data, name) {
		if(!data || !data[name] || !data.expires_in){
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

}

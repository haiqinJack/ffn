import { getWechat, getOAuth } from '../wechat'

const client = getWechat()

export async function getSignatureAsync(url) {
	const data = await client.fetchTicket()
	const ticket = data.ticket

	let params = client.signature(ticket, url)
	params.appId = client.appID

	return params
}

export function getAuthorizeURL(...args) {
	const oauth = getOAuth()
	
	return oauth.getAuthorizeURL(...args)
}

export async function getUserInfoByCode(code) {
	const oauth = getOAuth()
	const data = await oauth.fetchAccessToken(code)
	const user = await oauth.getUserInfo(data.access_token, data.openid)

	return user
}

export async function createMenu(menu) {
	const data = await client.handle('createMenu', menu)
	
	return data
}

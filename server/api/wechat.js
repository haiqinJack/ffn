import { getWechat } from '../wechat'

const client = getWechat()

export async function getSignatureAsync(url) {
	const data = await client.fetchTicket()
	const ticket = data.ticket

	let params = client.signature(ticket, url)
	params.appId = client.appID

	return params
}

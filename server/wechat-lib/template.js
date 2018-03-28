import { jsonToXml } from './util'

export default function template(info) {
	const xml = jsonToXml({
		xml: {
			ToUserName: info.toUserName,
			FromUserName: info.fromUserName,
			CreateTime:info.createTime,
			MsgType: info.msgType,
			Content: info.content
		}
	})
	return xml
}

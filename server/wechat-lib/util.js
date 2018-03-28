import xml2js from 'xml2js'
import template from './template'

function xmlToJson(xml) {
	return new Promise((resolve, reject)=> {
		xml2js.parseString(xml, {trim: true}, (err, content)=> {
			err? reject(err): resolve(content)
		})
	})
}

function jsonToXml(obj) {
    const builder = new xml2js.Builder()
    return builder.buildObject(obj)
}

function formatMessage(result) {
	let message = {}
	if(typeof result === 'object'){
		const keys = Object.keys(result)
		
		for(let i = 0; i < keys.length; i++) {
			const values = result[keys[i]]
			const key = keys[i]
		
			if(!(values instanceof Array) || values.length === 0 ){
				continue
			}

			if(values.length === 1 ){
				let val = values[0]
				message[key] = (val || '').trim()
			}
		}
	}
	
	return message
}

function tpl(replyBody, message) {
	let info = Object.assign({}, {
		content: replyBody,
		createTime: new Date().getTime(),
		msgType: 'text',
		toUserName: message.FromUserName,
		fromUserName: message.ToUserName
	})

	return template(info)
}

export {
	xmlToJson,
	jsonToXml,
	tpl,
	formatMessage
}

import xml2js from 'xml2js'
import template from './template'
import sha1 from 'sha1'

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

function createNonceStr() {
	return Math.random().toString(36).substr(3, 16)
}

function createTimestamp() {
	return parseInt(new Date().getTime() / 1000, 0) + ''
}

function raw(args) {
	let keys = Object.keys(args)
	let newArgs = {}
	let str = ''

	keys = keys.sort()

	keys.forEach((key) => {
		newArgs[key.toLowerCase()] = args[key]
	})

	for(let k in newArgs) {
		str += '&' + k + '=' + newArgs[k]
	}
	
	return str.substr(1)

}

function signIt(noncestr, timestamp, jsapi_ticket, url) {
	const ret = {noncestr, timestamp, jsapi_ticket, url}
	const string = raw(ret)
  const sha = sha1(string)

  return sha
}

function signature(jsapi_ticket, url) {
	const noncestr = createNonceStr()
	const timestamp = createTimestamp()
	const signature = signIt(noncestr, timestamp, jsapi_ticket, url)

	return {noncestr, timestamp, signature}
}

export {
	xmlToJson,
	jsonToXml,
	tpl,
	formatMessage,
	signature
}

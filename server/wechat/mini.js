import crypto from 'crypto'
import request from 'request-promise'
import conf from '../config'

export const openidAndSessionKey = async code => {

  let { appID, appSecret} = conf.wechatMini
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

  let res = await request({url, json: true})

  return res
}

export class WXBizDataCrypt {
  constructor (sessionKey) {
    this.appId = conf.wechatMini.appID
    this.sessionKey = sessionKey
  }

  decryptData (encryptedData, iv) {
  // base64 decode
  var sessionKey = new Buffer(this.sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
  }
}

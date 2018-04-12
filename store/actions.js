import axios from 'axios'
import Services from './services'

export default {
  getWechatSignture({ commit }, url) {
  	return Services.getWechatSignture(url)
  },
  getUserInfoByOAuth({ commit }, url) {
  	return Services.getUserInfoByOAuth(url)
  }  
}

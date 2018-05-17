import axios from 'axios'
import Services from './services'

export default {
  getWechatSignture({ commit }, url) {
  	return Services.getWechatSignture(url)
  },
  getUserInfoByOAuth({ commit }, url) {
  	return Services.getUserInfoByOAuth(url)
  },
  async fetchCartList({ state }) {
    const res = await Services.fetchCartList(state.user.id) 

    state.cartList = res.data.data 
    
    return res
  },
  async fetchGoods({ commit }, goodsId) {
    const res = await Services.fetchGoods(goodsId)

    commit('SET_GOODS', res.data.data.goods)
  },
  async fetchAllGoods({ state }) {
    const res = await Services.fetchAllGoods()

    state.products = res.data.data
  },
  async fetchSkuByGoodsId({ commit, state}, goodsId) {
    const res = await Services.fetchSkuByGoodsId(goodsId)
    commit('SET_SKUBOX', {goodsId: goodsId,sku:res.data.data.sku})

    return res
  },
  async fetchQiniuToken() {
    const res = await Services.fetchQiniuToken()
    return res.data
  },
  async saveGoods({},goods) {
    const res = await Services.saveGoods(goods)
    return res.data
  }     
}

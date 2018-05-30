import axios from 'axios'
import Services from './services'

export default {
  nuxtServerInit({ commit }, { req}) {
    if(req.session && req.session.user) {
      const user = req.session.user
      commit('SET_USER', user)
    } 
  },
  getWechatSignture({ commit }, url) {
  	return Services.getWechatSignture(url)
  },
  getUserInfoByOAuth({ commit }, url) {
  	return Services.getUserInfoByOAuth(url)
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  async fetchCartList({ state }) {
    const res = await Services.fetchCartList(state.user.unionid) 

    state.cartList = res.data.data 
    
    return res
  },
  async fetchGoods({ commit }, goodsId) {
    const res = await Services.fetchGoods(goodsId)
    
    commit('SET_GOODS', res.data.data)
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
  async saveCart({ state }, cart) {
    const res = await Services.saveCart(state.user.unionid, cart)
    return res
  },   
  async createOrder({ state }, { total, message, contact, products}) {
    const res = await Services.createOrder(state.user.unionid, total, message, contact, products)
    return res
  },
  async fetchUserAddress({ commit, state }) {
    const res = await Services.fetchUserAddress(state.user.unionid)
    commit('SET_ADDRESS', res.data.data.address)
    return res
  },
  async saveUserAddress({ commit, state }, address) {
    const res = await Services.saveUserAddress(state.user.unionid, address)
    return res
  }
}

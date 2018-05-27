import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => new Vuex.Store({
  state: {
    imageCDN: 'http://p8p8yzlxl.bkt.clouddn.com/',
  	user: {
      // unionid: 'o5z25w2rayBmb3ZbJdE_AjLQgVf8'
  	},
  	goods: {},
  	cartList: [],
  	payment: [
      {
        id: 1,
        title: '匠心特制黑糖姜枣膏 买2送罐环保xx餐具一套匠心特制黑糖姜枣膏 买2送罐环保xx餐具一套',
        desc: '规格',
        num: 2,
        price: 200,
        picture: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        expressPrice: 100
      }
    ],
  	skuBox: [],
  	products: []
  },
  getters,
  actions,
  mutations
})

export default createStore

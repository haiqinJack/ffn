import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => new Vuex.Store({
  state: {
    imageCDN: 'http://p8p8yzlxl.bkt.clouddn.com/',
  	user: {
  		id: 1
  	},
  	goods: {},
  	cartList: [],
  	payment: [],
  	skuBox: [],
  	products: []
  },
  getters,
  actions,
  mutations
})

export default createStore

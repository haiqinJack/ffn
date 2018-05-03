export default {
  SET_PAYMENT(state, value) {
    state.payment = value
  },
  DEL_CARTLIST(state, arr) {
    arr.forEach((value, index) => {
      state.cartList.forEach((val, i) => {
        if(val.id === value) {
          state.cartList.splice(i,1)
        }
      })
    })
  },
  SET_GOODS(state, goods) {
    let arr = getMaximumPriceAndMinimumPrice(goods)
    goods = formatPrice(goods, arr)

    state.goods = goods    
  },
  SET_SKUBOX(state, obj) {
    state.skuBox.push(obj)
  }
}

export function getMaximumPriceAndMinimumPrice(goods) {
  let arr = []
  let list = goods.sku.list
  for(let i = 0; i < list.length; i++){
    arr.push(list[i].price)
  }
  //最大价格
  let max = arr[0]
  for(let i = 0; i < arr.length; i++){
    if(arr[i] > max){
      max = arr[i]
    }
  }
  //最小价格
  let min = arr[0]
  for(let i = 0; i < arr.length; i++){
    if(arr[i] < min){
      min = arr[i]
    }
  }      
  return [max, min]
}

export function formatPrice(goods, arr) {
  if(arr[0] === arr[1]){
    goods.sku.price = (arr[0] / 100).toFixed(2)
    goods.price = (arr[0] / 100).toFixed(2)
    return goods
  }else{
    goods.sku.price = (arr[1] / 100).toFixed(2) + '~' + (arr[0] / 100 ).toFixed(2)
    goods.price = (arr[1] / 100).toFixed(2) + '~' + (arr[0] / 100 ).toFixed(2)
    return goods
  }    
}

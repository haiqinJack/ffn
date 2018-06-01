export default {
  SET_USER: (state, user) => {
    state.user = user
  },
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
  },
  SET_ORDER(state, order) {
    order.forEach((item, index) => {
      switch(item.status) {
        //2-待发货, 3-已发货, 5-已完成, 8-维权中
        case 2:
        order[index].status = '待发货'
        break;
        case 3:
        order[index].status = '已发货'
        break;
        case 5:
        order[index].status = '已完成'
        break;        
        case 8:
        order[index].status = '维权中'
        break;
        default:
        order[index].status = '待发货'
      }
    })    
    state.order = order
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

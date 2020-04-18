import {
  ADD_COUNTER,
  ADD_TO_CAT
} from './mutations.types'
export default {
  addCart(context, payload) {
    //   let oldProduct = null
    //  for(let item of state.carList){
    //    if(item.iid === payload.iid){
    //        oldProduct = item 
    //    }
    //  }
    //1.查找之前数组中是否有该商品  防止有该商品后再添加一个商品对象
    const oldProduct = context.state.carList.find(item => item.iid === payload.iid)
    //2.判断oldProduct
    if (oldProduct) {
      //oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      //state.carList.push(payload)
      context.commit(ADD_TO_CAT, payload)
    }
   
  }
}

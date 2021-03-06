import {
  ADD_COUNTER,
  ADD_TO_CAT
} from './mutations.types'
export default {
  addCart(context, payload) {
     return new Promise((resolve,reject) =>{
     //1.查找之前数组中是否有该商品  防止有该商品后再添加一个商品对象
     const oldProduct = context.state.catList.find(item => item.iid === payload.iid)
     //2.判断oldProduct
     if (oldProduct) {
       //oldProduct.count += 1
       context.commit(ADD_COUNTER, oldProduct)
       resolve('当前商品数量加1')
     } else {
       payload.count = 1
       //state.carList.push(payload)
       context.commit(ADD_TO_CAT, payload)
       resolve('商品新的商品')
     }
     })
   
  }
}
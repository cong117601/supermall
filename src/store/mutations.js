import {
  ADD_COUNTER,
  ADD_TO_CAT
} from './mutations.types'

export default {
  
  [ADD_COUNTER](state, payload) {
    payload.count += 1
    console.log(payload);
    
  },
  [ADD_TO_CAT](state, payload) {
    payload.check = true
    state.catList.push(payload)
  }

}
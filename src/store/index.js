import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
//1.安装插件
Vue.use(Vuex)
const state = {
  carList: []
}
//2.创建store对象
const store = new Vuex.Store({

  state,
  mutations,
  actions,
})

//3.挂载Vue实例上
export default store
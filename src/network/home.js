import {request} from './request'
//对首页home 请求数据 进行封装
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}
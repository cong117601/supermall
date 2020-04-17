import axios from 'axios'

export function request(config) {
  
    //1.创建axios实列
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/h8',
      timeout: 5000
    })
    //2.拦截器  (axios.interceptors  全局拦截)
    //2.1请求拦截
    axios.interceptors.request.use(config => {
      console.log(config);
      //1.config中的一些信息不符合服务器要求
      //2.在发送网络请求的时候，都希望界面中显示一个请求的图标
      //3.某些网络请求（登陆），必须携带一些特殊的信息
      return config
    }, 
    err => {
     console.log(err);
     
    })
    //2.2响应拦截
    instance.interceptors.response.use(res =>{
      //必须返回
      return res.data
    },
    err =>{

    })
    //3.发送真正的网络请求
    return instance(config)

  }


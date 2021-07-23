import axios from 'axios';

// const baseURL = 'http://13.114.161.29:8888/muzimed_mobile/'         //服务器
const baseURL = 'http://192.168.50.236:8888/muzimed_mobile/'        //本地/李明
// const baseURL = 'http://192.168.1.175:8888/muzimed_mobile/'         //测试

const http = axios.create({
  baseURL,
  timeout:8000,
})

// 在发起请求时进行拦截，获取token
http.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  return req
})

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use((res) => {
  if(res.data.code === '20002'){
    console.log('失效了')
  }
  return res
})

const api = {}

api.get = function(url,params){
  if (params) {
    return new Promise((resolve,reject) => {
      http({method: "get", url: url, params:params}).then((res)=>{ resolve(res ) })
    })
  } else {
    return new Promise((resolve,reject) => {
      return http({method: "get", url: url}).then((res)=>{ resolve(res) })
    })
  }
}

export default api;

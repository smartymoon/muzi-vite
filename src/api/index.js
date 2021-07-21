import axios from 'axios';

const baseURL = 'http://192.168.1.175:8888/muzimed_mobile/';

const api = axios.create({
  baseURL,
  timeout:8000,
})

// 在发起请求时进行拦截，获取token
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  return req
})

// 当获取服务器返回的信息时进行的处理
api.interceptors.response.use((res) => {
  if(res.data.code === '20002'){
    console.log('失效了')
  }
  return res
})

export default api;

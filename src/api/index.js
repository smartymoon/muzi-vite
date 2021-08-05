import axios from 'axios';
import qs from 'qs'
// const baseURL = 'http://13.114.161.29:8888/muzimed_mobile/'         //服务器
// const baseURL = 'http://192.168.50.236:8888/muzimed_mobile/'        //本地/李明
// const baseURL = 'http://192.168.1.175:8888/muzimed_mobile/'         //测试
const baseURL = import.meta.env.VITE_APP_URL      // 测试/开发

const http = axios.create({
  baseURL,
  timeout:8000,
})

// 在发起请求时进行拦截，获取token
http.interceptors.request.use((req) => {
  req.headers.Authorization = window.sessionStorage.getItem("token")
  return req
})

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use((res) => {
  if(res.data.code === 20002){
    console.log('api/index.js------ res 20002',res.data)
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("id")
    window.location.href="/login"
  }
  return res
})

const api = {}

api.get = function(url, params) {
  if (params) {
    return new Promise((resolve,reject) => {
      http({ method: "get", url: url, params:params }).then((res)=>{ resolve(res ) })
    })
  } else {
    return new Promise((resolve,reject) => {
      http({ method: "get", url: url }).then((res)=>{ resolve(res) })
    })
  }
}

api.post = function(url, params, useQs=false) {
  console.log('uuuuuu',useQs)
  let data
  useQs ? data = qs.stringify(params) : data = params
  return new Promise((resolve,reject) => {
    http({ method: "post", url: url, data:data }).then((res) => { resolve(res) })
  })
}

api.put = function(url, params) {
  return new Promise((resolve,reject) => {
    http({ method: "put", url: url, contentType: "application/x-www-form-urlencoded", params:params }).then((res) => { resolve(res) })
  })
}

api.delete = function(url, params) {
  return new Promise((resolve,reject) => {
    http({ method: "delete", url: url, params:params }).then((res) => { resolve(res) })
  })
}

export default api;

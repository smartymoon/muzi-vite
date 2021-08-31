import axios from 'axios';
import { Dialog } from 'vant'
import router from '../router';
import qs from 'qs'
const baseURL = import.meta.env.VITE_APP_URL

const http = axios.create({
  baseURL,
  timeout: 8000,
})

// 在发起请求时进行拦截，获取token
http.interceptors.request.use((req) => {
  req.headers.Authorization = window.sessionStorage.getItem("token")
  return req
})

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use((res) => {
  if(res.data.code === 20002){
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("id")
    Dialog.alert({ message: '登录时效已过期，请重新登录' }).then(() => {
      router.push({ path:'/login' })
    })
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
  let data
  useQs ? data = qs.stringify(params) : data = params
  return new Promise((resolve,reject) => {
    http({ method: "post", url: url, data:data }).then((res) => { resolve(res) })
  })
}

api.put = function(url, params) {
  return new Promise((resolve,reject) => {
    http({ method: "put", url: url, contentType: "application/x-www-form-urlencoded", params: params }).then((res) => { resolve(res) })
  })
}

api.delete = function(url, params) {
  return new Promise((resolve,reject) => {
    http({ method: "delete", url: url, params:params }).then((res) => { resolve(res) })
  })
}

export default api;

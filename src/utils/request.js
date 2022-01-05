/**
 * 封装 axios 请求模块
 */
import axios from "axios"
// 引入容器模块
import store from '@/store'

import JSONBig from 'json-bigint'

const request = axios.create({
        baseURL: "http://ttapi.research.itcast.cn/", // 基础路径
        transformResponse: [function(data) {
            // 自定义后端返回的原始数据
            // axios默认会在内部这样来处理后端返回的数据

            try {
                return JSONBig.parse(data)

            } catch (error) {
                return data
            }
        }]
    })
    // 请求拦截器
    // Add a request interceptor  axios已经被顶一个requerst了 所以用request
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    // config是配置对象 本次请求的请求配置对象
    // console.log(config);打印出来可以看到有请求头对象 所以可以在这设置请求头相关
    // 请求发起会进入这里·
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 把store里的state用user解构出来
    // 这里一定要返回config配置对象  否则请求就听在这里出不去了
    // console.log(config);
    return config
}, function(error) {
    // Do something with request error如果请求还没有发出去内部出错了会进入这里
    return Promise.reject(error) //这个意思是把错误继续抛出
})

// 响应拦截器
export default request
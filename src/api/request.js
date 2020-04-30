import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getStorage } from '@/utils/auth'
import { ACCESS_TOKEN } from '@/utils/constant'

const baseURL = process.env.VUE_APP_API_BASE
const service = axios.create({ baseURL })

// 跨域访问需要发送cookie时一定要加axios.defaults.withCredentials = true
// const isDev = process.env.NODE_ENV === 'development'

// if (isDev) {
//     service.defaults.withCredentials = true
// }

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        // const token = getStorage(ACCESS_TOKEN)
        // if (token) {
        //     config.headers['XXX'] = token
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    res => {
        return res.data
    },
    err => {
        // do something with response error
        if (err.response) {
            const { status, data } = err.response
            const token = getStorage(ACCESS_TOKEN)
            if (data.message) {
                Message({
                    type: 'error',
                    message: data.message
                })
            }
            // status 401: token has expired
            if (status === 401) {
                // todo clearToken
                if (token) {
                    store.dispatch('logout').then()
                }
            }
        }
        return Promise.reject(err)
    }
)

export default service

// Private functions

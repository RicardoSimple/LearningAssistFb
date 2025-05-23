import axios from 'axios'
import { getRefreshToken, getToken } from './userInfo'
import { Message } from 'element-ui'
import { clearAll } from './storage'

const TokenKey = "Authorization"
const RefreshTokenKey = "Authorization-refresh"
const TokenPrefix = "Bearer"
// create an axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // check access
        if (config.access) {
            if (getToken() != null && getToken() != "") {
                config.headers[TokenKey] = TokenPrefix+" "+getToken()
            } else {
                // redirect 未登录
            }
        }
        // check refreshAccess only for refreshToken
        if (config.refreshAccess) {
            if (getRefreshToken() != null && getRefreshToken() != "") {
                config.headers[RefreshTokenKey] = getRefreshToken()
            }
        }
        if (config.isForm) {
            config.headers['Content-Type'] = 'multipart/form-data'
        }
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
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // store.commit('SET_LOADING',false);

        console.log(res)
        // if the custom code is not 20000, it is judged as an error.
        if (res.code == 312) {
            if (getToken() != null) {
                Message.error(res.msg)
                clearAll();
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        }
        if (res.code !== 200) {
            // alert
            Message.error(res.msg)
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // alert
        console.log('err' + error) // for debug
        Message.error(res.msg)
        return Promise.reject(error)
    }
)

export default service

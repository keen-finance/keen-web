import axios from 'axios'
import { getToken } from './auth'
import Config from '../settings'
import toast from 'react-hot-toast';

const service = axios.create({
  baseURL: Config[Config.NODE_ENV].VUE_APP_BASE_API, // api 的 base_url
  // baseURL: 'http://8.134.96.143:8000/', // api 的 base_url
  timeout: Config.timeout // 请求超时时间
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 兼容blob下载出错json提示
    if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function (e) {
        const errorMsg = JSON.parse(reader.result).message
        // Notification.error({
        //   title: errorMsg,
        //   duration: 5000
        // })
      }
    } else {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          toast.error('网络请求超时');
          return Promise.reject(error)
        }
      }
      if (code) {
        if (code === 401) {
          // store.dispatch('LogOut').then(() => {
          //   // 用户登录界面提示
          //   Cookies.set('point', 401)
          //   location.reload()
          // })
        } else if (code === 403) {
          // router.push({ path: '/401' })
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            toast.error(errorMsg);
            // Notification.error({
            //   title: errorMsg,
            //   duration: 5000
            // })
          }
        }
      } else {
        toast.error("接口请求失败");
        // Notification.error({
        //   title: '接口请求失败',
        //   duration: 5000
        // })
      }
    }
    return Promise.reject(error)
  }
)
export default service

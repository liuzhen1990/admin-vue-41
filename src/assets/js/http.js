import axios from 'axios'
// import {getToken} from './auth'
// 创建axios实例，并配置基准路径
// export default axios.create({
//   baseURL: 'http://localhost:8888/api/private/v1/'
// })
import {getToken} from '@/assets/js/auth'
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
// 建议通过定义插件的配置来扩展Vue本身
// 1.定义一个插件本身
const httpPlugin = {}
httpPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$http = http
}
// 导出插件对象
export default httpPlugin
// 通过全局方法 Vue.use() 使用插件：
// Vue.use(MyPlugin)
// 功能三、请求拦截器
// 这里http是axios的实例
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // return config
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
    // 如同next()<允许通过
    return config
  }
  console.log(config)
}, function (error) {
  return Promise.reject(error)
})

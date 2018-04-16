// 封装和用户授权相关函数
const userInforkey = 'user-info'
// 保存登录信息到本地
export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInforkey, JSON.stringify(userInfo))
}
// 从本地存储中获取当前登录用户信息
export function getUserInfo () {
  return window.localStorage.getItem(userInforkey)
}
// 获取本地存储中用户信息的Token令牌
export function getToken () {
  return JSON.parse(getUserInfo()).token
}
// 删除本地存储中的用户登录信息
export function removeUserInfo () {
  window.localStorage.removeItem(userInforkey)
}

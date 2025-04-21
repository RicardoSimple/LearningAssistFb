import { store, load, remove } from './storage'
import { currentUser } from '../api/userApi'

const loadUserInfoKey = "load-user-info"
const loadTokenKey = "load-token-info"
const loadRefreshTokenKey = "load-refresh-token-info"

export const getUserInfo = () => {
  return load(loadUserInfoKey, null)
}

export const setUserInfo = (userInfo) => {
  store(loadUserInfoKey, userInfo)
}

export const refreshUserInfo = () => {
  currentUser().then(res => {
    setUserInfo(res.data)
  })
}
export const getToken = () => {
  return load(loadTokenKey, null)
}

export const setToken = (token) => {
  store(loadTokenKey, token)
}
export const removeToken = () => {
  remove(loadTokenKey)
}
export const getRefreshToken = () => {
  return load(loadRefreshTokenKey, null)
}

export const setRefreshToken = (token) => {
  store(loadRefreshTokenKey, token)
}
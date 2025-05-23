  import { get, post } from './index';

/**
 * 注册接口
 * @param {userName:string,phone:string,nickName:string,gender:string,name:string,email:string,pwd:string,avatar:string} data 
 * @returns 
 */
export async function register (data) {
  return await post('/account/auth/register', data, false, false, true)
}

/**
 * 登录接口
 * @param {userName:string,pwd:string} data 
 * @returns 
 */
export async function login (data) {
  return await post('/account/auth/login', data, false)
}

export async function refreshToken () {
  return await get('/user/refresh', {}, false, true)
}

export async function check () {
  return await get('/account/auth/check')
}

export async function currentUser () {
  return await get('/account/auth/current')
}
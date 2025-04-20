import { get, post } from '..';

/**
 * 
 * @param {nickName,name,avatar,background,slogan} param 
 * @returns 
 */
export async function updateProfile (param) {
  return await post('/setting/profile', param)
}
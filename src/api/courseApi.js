import { get, post } from './index';
export async function getCourse () {
    return await get('/course/courses')
}

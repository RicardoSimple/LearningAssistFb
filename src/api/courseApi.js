import { get, post } from './index';
export async function getCourse () {
    return await get('/course/courses')
}
export async function getCourseDetail (id) {
    return await get(`/course/detail?id=${id}`)
}
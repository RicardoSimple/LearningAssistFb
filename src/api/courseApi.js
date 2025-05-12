import { get, post } from './index';
export async function getCourse () {
    return await get('/course/courses')
}
export async function getCourseDetail (id) {
    return await get(`/course/detail?id=${id}`)
}
export async function addIncrease (id) {
    return await get(`/course/view/increase?id=${id}`)
}
export async function getHotNCourse (n) {
    return await get(`/course/hot?n=${n}`)
}
export async function favoriteCourse (id) {
    return await post(`/course/favorite?course_id=${id}`)
}
export async function unfavoriteCourse (id) {
    return await post(`/course/unfavorite?course_id=${id}`)
}
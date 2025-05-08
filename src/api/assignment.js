import { get, post } from './index';
export async function getMyAssignments (page, pageSize) {
    return await get(`/assignment/my?page=${page}&pageSize=${pageSize}`)
}

export async function getAssignmentDetailFull (id) {
    return await get(`/assignment/detail/full?id=${id}`)
}
export async function submitAssignment (data) {
    return await post('/assignment/submit', data)
}
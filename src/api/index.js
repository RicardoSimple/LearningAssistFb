import request from '@/utils/request'
import { getRefreshToken, getToken } from '@/utils/userInfo'

export const get = function (url, params, access = true, refreshAccess = false) {
    return request({
        url,
        method: 'get',
        params: params,
        access,
        refreshAccess
    })
}
export const post = function (url, data, access = true, refreshAccess = false, isForm = false) {
    return request({
        url,
        method: 'post',
        data,
        access,
        refreshAccess,
        isForm
    })
}
export function fetchList (params) {
    console.log("fetch list")
    return get({
        url: '/post/list',
        params: params,
    })
}

export function fetchFocus () {
    return get({
        url: '/focus/list',
    })
}

export function fetchCategory () {
    return get({
        url: '/category',
    })
}

export function fetchFriend () {
    return get({
        url: '/friend',
    })
}

export function fetchSocial () {
    return get({
        url: '/social',
    });
}

export function fetchSiteInfo () {
    return get({
        url: '/site',
    })
}

export function fetchComment () {
    return get({
        url: '/comment',
    })
}
export function postStream(url, data, onMessage, access = true) {
    const controller = new AbortController()
    const headers = {
        'Content-Type': 'application/json'
    }

    if (access) {
        const token = getToken() // 可换成你项目的存储逻辑
        if (token) {
            headers['Authorization'] = 'Bearer ' + token
        }
    }

    fetch('/api/'+url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        signal: controller.signal
    }).then(async res => {
        if (!res.ok) throw new Error('响应失败')

        const reader = res.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })

            // 按行处理流式返回的数据
            const lines = buffer.split('\n')
            buffer = lines.pop() // 剩下的半行下次处理
            for (const line of lines) {
                const trimmed = line.trim()
                if (trimmed.startsWith('data:')) {
                    const jsonStr = trimmed.replace(/^data:\s*/, '')
                        console.log("json:",jsonStr)
                        const content = jsonStr
                        if (content) onMessage(content)

                }
            }
        }
    }).catch(err => {
        console.error('流式请求失败', err)
    })

    return controller // 可用于中断
}

import { get, post, postStream } from './index'

// 获取对话列表
export async function getConversations() {
    return await get('/chat/conversations')
}

// 获取某个对话的历史消息（分页）
export async function getMessages(conversationId, page = 1, pageSize = 20) {
    return await get(`/chat/messages?conversation_id=${conversationId}&page=${page}&page_size=${pageSize}`)
}

// 发起新的消息（非流式，一般用于调试或非实时回复）
export async function sendMessage(conversationId, message) {
    return await post('/chat/assistant', {
        conversation_id: conversationId,
        message
    })
}

// 删除对话
export async function deleteConversation(conversationId) {
    return await post(`/chat/conversation/delete?id=${conversationId}` )
}

// 流式发送消息并获取响应（关键方法）
export async function sendMessageStream(conversationId, message, onChunk) {
    return postStream(
        '/chat/assistant',
        {
            conversation_id: conversationId,
            message
        },
        onChunk
    );
}

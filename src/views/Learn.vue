<template>
  <div class="chat-layout">
    <!-- 左侧：会话列表 -->
    <div class="sidebar">
      <el-scrollbar>
        <el-card>
          <el-button type="info" @click="NewConvEvent">新对话</el-button>
        </el-card>
        <el-menu @select="handleSelectConversation">
          <el-menu-item
              v-for="conv in conversations"
              :key="conv.id"
              :index="conv.id.toString()"
              class="item_container"
          >
            <span class="title_menu">
            {{ conv.title || '未命名对话' }}
            </span>
            <span class="delete_btn">
              <el-button type="text" @click="deleteConversation(conv.id)"  icon="el-icon-delete"></el-button>
            </span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
<!--    v-infinite-scroll="loadMore"-->
    <!-- 右侧：聊天窗口 -->
    <div class="chat-window">
      <el-scrollbar
          class="chat-history"
          ref="scrollContainer"

          :infinite-scroll-disabled="loading"
          :infinite-scroll-distance="50"
          @scroll.native="handleScroll"
      >
        <div v-for="msg in messages" :key="msg.id || msg._localId" :class="msg.role">
          <div class="bubble" v-html="renderMarkdown(msg.content)"></div>
        </div>
        <div v-if="streamingMessage" class="assistant">
          <div class="bubble" v-html="renderMarkdown(streamingMessage)"></div>
        </div>
      </el-scrollbar>

      <!-- 输入框 -->
      <div class="chat-input">
        <el-input
            type="textarea"
            v-model="input"
            placeholder="请输入内容"
            @keyup.enter.native="sendMessage"
        />
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getConversations, getMessages, sendMessageStream, deleteConversation  } from '@/api/chat.js'
import { marked } from 'marked'

export default {
  data() {
    return {
      conversations: [],
      selectedConvId: null,
      messages: [],
      page: 1,
      pageSize: 20,
      total: 0,
      input: '',
      streamingMessage: '',
      loading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getConversations()
      this.conversations = res.data
      console.log(this.conversations)
      if (this.conversations.length > 0) {
        this.selectedConvId = this.conversations[0].id
        this.loadMessages(true)
      }
    },
    async loadMessages(reset = false) {
      if (!this.selectedConvId) return
      if (reset) {
        this.page = 1
        this.messages = []
      }

      this.loading = true
      const res = await getMessages(this.selectedConvId, this.page, this.pageSize)
      const newMessages = res.data
      this.messages = [...newMessages, ...this.messages]
      this.total = res.data.total
      this.loading = false
      this.scrollToBottom()
    },
    async loadMore() {
      if (this.loading || this.messages.length >= this.total) return
      this.page += 1
      await this.loadMessages()
    },
    handleSelectConversation(id) {
      this.selectedConvId = parseInt(id)
      this.loadMessages(true)
    },
    NewConvEvent(){
      this.selectedConvId = null
      this.messages = []
      this.input = ''
    },
    async sendMessage() {
      const content = this.input.trim()
      if (!content || this.loading) return

      // 添加用户消息
      this.messages.push({ role: 'user', content, _localId: Date.now() + '-u' })
      this.input = ''
      const assistantMsg = { role: 'assistant', content: '', _localId: Date.now() + '-a' }
      this.messages.push(assistantMsg)
      this.loading = true

      console.log("start send")
      // 流式响应
      await sendMessageStream(this.selectedConvId, content, (chunk) => {
        console.log(chunk)
        assistantMsg.content += chunk
      })

      this.loading = false
      this.scrollToBottom()
    },
    handleScroll(e) {
      if (e.target.scrollTop === 0 && this.messages.length < this.total && !this.loading) {
        this.page += 1
        this.loadMessages()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.scrollContainer?.wrap
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    renderMarkdown(content) {
      return marked.parse(content)
    },
    deleteConversation(id) {
      this.$confirm('此操作将永久删除该对话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        deleteConversation(id).then(res => {
          this.init()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

<style scoped lang="less">
.chat-layout {
  display: flex;
  height: 90vh;
  margin: 90px 50px 50px 50px;
  .sidebar {
    width: 240px;
    background-color: #f7f7f7;
    border-right: 1px solid #ddd;
  }
  .item_container{
    display: flex;

  }
  .title_menu{
    width: 200px;
  }
  .delete_btn{
    position: relative;
  }
  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;

    .chat-history {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .user,
    .assistant {
      margin-bottom: 12px;

      .bubble {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 6px;
        max-width: 70%;
        white-space: pre-wrap;
        line-height: 1.5;
      }
    }

    .user .bubble {
      background-color: #409eff;
      color: white;
      align-self: flex-end;
    }

    .assistant .bubble {
      background-color: #f0f0f0;
      color: #333;
    }

    .chat-input {
      padding: 12px;
      border-top: 1px solid #ddd;
      display: flex;
      gap: 10px;
    }
  }
}
</style>

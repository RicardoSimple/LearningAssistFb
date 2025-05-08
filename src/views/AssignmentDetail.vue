<template>
  <div class="assignment-detail" v-loading="loading">
    <el-card v-if="assignment" class="box-card">
      <div slot="header" class="header">
        <span class="title">{{ assignment.title }}</span>
        <el-tag type="info">{{ assignment.course&&assignment.course.name ? assignment.course.name : '未知课程' }}</el-tag>
      </div>

      <div class="info">
        <p><strong>截止时间：</strong>{{ assignment.due_date }}</p>
        <p><strong>发布教师：</strong>{{ assignment.teacher&&assignment.teacher.name ? assignment.teacher.name : '未知教师' }}</p>
        <el-divider content-position="right">作业详情</el-divider>
        <div v-html="assignment.content"></div>
        <el-divider content-position="left">提交记录</el-divider>
      </div>
      <el-collapse v-model="collapseActive">
        <el-collapse-item title="点击展开以提交新记录" name="1">
          <ArticleEditor
              :getHtml="getHtml"
              :getTitle="getTitle"
          ></ArticleEditor>
          <el-card class="button_container">
            <el-button @click="submitEvent" class="subButton">提交</el-button>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      <el-divider />

      <div v-if="submission">
        <h4>我的提交记录</h4>
        <p><strong>提交时间：</strong>{{ submission.submitted_at }}</p>
        <el-divider content-position="left">内容</el-divider>
        <div v-html="submission.title"></div>
        <div v-html="submission.content"></div>
        <el-divider content-position="left">评价</el-divider>
        <p><strong>状态：</strong>{{ checkStatus(submission)? '已批改' : '未批改' }}</p>
        <div>
          <span v-if="!checkStatus(submission)"></span>
          <span v-if="checkStatus(submission)">
            <el-rate
                          v-model="submission.score"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
          </el-rate>
          </span>

        </div>

        <p><strong>评语：</strong>{{ submission.feedback }}</p>
        <el-tag type="success">已提交</el-tag>
      </div>
      <div v-else>
        <el-empty description="暂无提交记录" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAssignmentDetailFull, submitAssignment } from '@/api/assignment'
import ArticleEditor from "@/components/article/article-editor.vue"; // 请根据实际路径导入

export default {
  components: {ArticleEditor},
  data() {
    return {
      loading: false,
      assignment: null,
      submission: null,
      collapseActive: '',
      form:{
        content:'',
        title:'',
        assignment_id:''
      }
    }
  },
  created() {
    this.loadDetail()
  },
  methods: {
    getHtml (text) {
      this.form.content = text
    },
    getTitle (title) {
      this.form.title = title
    },
    checkStatus(submission){
      console.log(submission)
      return submission.reviewed_at > submission.submitted_at;
    },
    submitEvent(){
      submitAssignment(this.form).then(res => {
        if (res.code && res.code === 200) {
          this.$message.success('提交成功')
          this.loadDetail()
        }
      })
    },
    async loadDetail() {
      const id = this.$route.params.id
      if (!id) {
        this.$message.error('未提供作业ID')
        return
      }
      this.form.assignment_id = id
      this.loading = true
      try {
        const res = await getAssignmentDetailFull(id)
        this.assignment = res.data.assignment
        this.submission = res.data.submission || null
      } catch (e) {
        this.$message.error('加载失败')
      } finally {
        this.loading = false
      }
    },
  }
}
</script>

<style scoped lang="less">
.assignment-detail {
  padding: 20px;
  margin: 90px 40px 50px 40px;

  .box-card {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .info {
      margin-top: 20px;
      font-size: 14px;
      color: #444;

      p {
        margin: 10px 0;
      }
    }
  }
}
.button_container{
  margin: 10px 160px 10px 160px;
  .subButton{
    margin: 10px 100px 10px;
  }
}
</style>

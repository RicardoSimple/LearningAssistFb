<template>
  <div class="my-assignment">
    <div class="header">
      <el-input
          placeholder="请输入作业标题"
          v-model="search"
          clearable
          @input="handleFilter"
          class="search-box"
      />
    </div>

    <div class="card-grid">
      <el-card
          v-for="item in filteredAssignments"
          :key="item.id"
          class="assignment-card"
          shadow="hover"
      >
        <div class="card-header">
          <router-link :to="`/assignment/${item.id}`">
          <span class="title">{{ item.title }}</span>
          </router-link>
          <el-tag type="info">{{ item.course && item.course.name ? item.course.name : '未知课程' }}</el-tag>
        </div>
        <div class="card-content">
          <p class="content">{{ item.content }}</p>
          <div class="info">
            <span>截止时间：{{ item.due_date }}</span>
            <span>发布教师：{{ item.teacher && item.teacher.name ? item.teacher.name : '未知教师' }}</span>
          </div>
        </div>
      </el-card>
    </div>

    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pageNum"
          :page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { getMyAssignments } from '@/api/assignment'

export default {
  data() {
    return {
      assignments: [],
      filteredAssignments: [],
      pageNum: 1,
      pageSize: 6,
      total: 0,
      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const res = await getMyAssignments(this.pageNum, this.pageSize)
        this.assignments = res.data.list
        this.total = res.data.total
        this.filteredAssignments = this.assignments
      } catch (err) {
        this.$message.error('加载作业失败')
      }
    },
    handleFilter() {
      const keyword = this.search.trim().toLowerCase()
      this.filteredAssignments = this.assignments.filter(a =>
          a.title.toLowerCase().includes(keyword)
      )
    },
    handlePageChange(page) {
      this.pageNum = page
      this.fetchData()
    }
  }
}
</script>

<style scoped lang="less">
.my-assignment {
  padding: 20px;
  margin: 90px 50px 50px 50px;
  .search-box {
    width: 300px;
    margin-bottom: 20px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .assignment-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .card-content {
      .content {
        margin-bottom: 10px;
        color: #666;
      }

      .info {
        font-size: 12px;
        color: #999;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .pagination {
    margin-top: 30px;
    text-align: center;
  }
}
</style>

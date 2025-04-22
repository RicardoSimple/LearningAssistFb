<template>
  <div class="course_detail_container">
  <el-card shadow="always" v-loading="loading" class="course-detail-card">
    <template #header>
      <div class="header-title">课程详情</div>
    </template>

    <div class="detail-layout">
      <div class="left">
        <el-image
            v-if="course.cover"
            :src="course.cover"
            style="width: 200px; height: 120px; border-radius: 8px"
            fit="cover"
        />
      </div>

      <div class="right">
        <el-descriptions column="2" border>
          <el-descriptions-item label="课程名称">{{ course.name }}</el-descriptions-item>
          <el-descriptions-item label="课程时长">{{ course.duration }}</el-descriptions-item>
          <el-descriptions-item label="课程时间">{{ course.date }}</el-descriptions-item>
          <el-descriptions-item label="所属科目">
            <el-tag
                v-for="subject in course.subjects"
                :key="subject.id"
                type="success"
                style="margin-right: 4px"
            >
              {{ subject.name }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider />
        <el-descriptions title="课程介绍" column="1">
          <el-descriptions-item>
            <div style="white-space: pre-wrap;">{{ course.description }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script>
import { getCourseDetail } from '@/api/courseApi'

export default {
  name: 'CourseDetailPage',
  data() {
    return {
      loading: false,
      course: {}
    }
  },
  methods: {
    fetchCourseDetail() {
      const id = this.$route.params.id
      console.log(id)
      if (!id) return

      this.loading = true
      getCourseDetail(id)
          .then(res => {
            this.course = res.data
            console.log(res.data)
          })
          .catch(err => {
            console.error('获取详情失败', err)
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  created() {
    this.fetchCourseDetail()
  }
}
</script>

<style scoped lang="less">
.course_detail_container{
  padding: 100px 50px 100px 50px;
}
.course-detail-card {
  margin: 20px;
  height: 500px;

  .header-title {
    font-size: 18px;
    font-weight: bold;
  }

  .detail-layout {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .left {
      flex-shrink: 0;
    }

    .right {
      flex: 1;
    }
  }
}
</style>

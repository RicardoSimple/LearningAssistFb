<template>
  <div class="course_detail_container">
  <el-card shadow="always" v-loading="loading" class="course-detail-card">
    <template #header>
      <div class="header_container">
        <div class="header-title">课程详情</div>
        <div class="statistic_container">
          <el-statistic :value="course.view_count" title="浏览量">
          </el-statistic>
          <el-divider direction="vertical"></el-divider>
          <el-statistic :value="course.favorite_num" title="收藏量">
            <template slot="suffix">
              <span @click="clickFavoriteEvent" class="like">
                <i
                    class="el-icon-star-on"
                    style="color:cadetblue"
                    v-show="course.is_favorite"
                ></i>
                <i class="el-icon-star-off" v-show="!course.is_favorite"></i>
              </span>
            </template>
          </el-statistic>
        </div>
      </div>
    </template>

    <div class="detail-layout">
      <div class="left">
        <el-image
            v-if="course.cover"
            :src="course.cover"
            style="width: 100%; height: auto; border-radius: 8px"
            fit="cover"
        />

      </div>

      <div class="right">
        <el-descriptions column="2" border>
          <el-descriptions-item label="课程名称">{{ course.name }}</el-descriptions-item>
          <el-descriptions-item label="课程时长">{{ course.duration }}</el-descriptions-item>
          <el-descriptions-item label="课程时间">{{ formatDateOnly(course.date) }}</el-descriptions-item>
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
    <el-card class="course-detail-card">
      <div  v-html="renderMarkdown(course.course_detail)"></div>
    </el-card>
  </div>
</template>

<script>
import { getCourseDetail,addIncrease,favoriteCourse,unfavoriteCourse } from '@/api/courseApi'
import { formatDateOnly } from "@/utils/date";
import {marked} from "marked";

export default {
  name: 'CourseDetailPage',
  data() {
    return {
      loading: false,
      course: {
        is_favorite :false
      }
    }
  },
  methods: {
    formatDateOnly,
    async fetchCourseDetail() {
      const id = this.$route.params.id
      console.log(id)
      if (!id) return
      addIncrease(id)

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
    },

    clickFavoriteEvent(){
      if (this.course.is_favorite){
        unfavoriteCourse(this.course.id)
        this.course.favorite_num--
        this.course.is_favorite = false
      }else{
        favoriteCourse(this.course.id)
        this.course.favorite_num++
        this.course.is_favorite = true
      }
    },
    renderMarkdown(content) {
      return marked.parse(content)
    },
  },
  async created() {
   await this.fetchCourseDetail()
  }
}
</script>

<style scoped lang="less">
.course_detail_container{
  padding: 100px 50px 100px 50px;
}
.header_container{
  display: flex;
  justify-content: space-between;
}
.statistic_container{
  display: flex;
  justify-content: space-evenly;
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
      width: 30vw;
      flex-shrink: 0;
    }

    .right {
      flex: 1;
    }
  }
}
</style>

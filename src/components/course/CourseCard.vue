<!-- components/CourseCard.vue -->
<template>
  <el-card class="card">
    <img class="cover" :src="course.cover" alt="课程封面" />
    <div class="info">
      <router-link :to="`/course/${course.id}`">
        <h3 class="title">{{ course.name }}</h3>

      </router-link>
      <div class="tag_container">
        <el-tag type="info" size="mini" class ="subject_tag"  v-for="subject in course.subjects" :key="subject.id" >{{ subject.name }}</el-tag>
      </div>
      <p class="desc">{{ course.description }}</p>
      <div class="meta">
        <span><i class="icon">⏱</i>{{ course.duration }}</span>
        <span><i class="icon">📅</i>{{ course.date }}</span>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name:'CourseCard',
  props:{
    course:{
      type:Object,
      default:{},
      required:true
    }
  },
  data(){
    return{

    }
  }
}
</script>
<style scoped lang="less">
.card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .info {
    padding: 18px;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #333;
    }

    .desc {
      font-size: 14px;
      color: #666;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .meta {
      font-size: 13px;
      color: #999;
      display: flex;
      justify-content: space-between;

      .icon {
        margin-right: 6px;
      }
    }
  }
}
.tag_container{
  height: 40px;
}
.subject_tag{
  margin:5px 10px 5px 0px;
}
</style>

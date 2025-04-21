
<template>
  <el-card class="course-container">
    <div class="grid">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </el-card>
</template>
<script>
import CourseCard from '@/components/course/CourseCard.vue'
import { getCourse } from '../api/courseApi'

export default {
  components: {CourseCard},
  data() {
    return {
      courses: [
        {
          id: 1,
          cover: 'https://picsum.photos/seed/course1/400/220',
          name:
              '前端开发实战课',
          subjects:[{
            id:1,
            name:"前端"
          }],
          description:
              '掌握 HTML、CSS、JavaScript，打造自己的网页应用。',
          duration:
              '4小时',
          date:
              '2025-05-01 14:00',
        }
        ,
        {
          id: 2,
          cover:
              'https://picsum.photos/seed/course2/400/220',
          name:
              'Python 编程基础',
          description:
              '学习 Python 基础语法、控制结构、函数与文件操作。',
          duration:
              '3小时15分钟',
          date:
              '2025-04-28 09:30',
        }
        ,
      ]
    }
  },
  methods:{
    getCourses(){
      getCourse().then(res=>{
        this.courses = res.data || []
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    getCourse().then(res=>{
      this.courses = res.data || []
      console.log(res.data)
      console.log(this.courses)
    }).catch(err=>{
      console.log(err)
    })
  }
}

</script>
<style scoped lang="less">
.course-container {
  padding: 100px 50px 100px 50px;

  .page-title {
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: bold;
    color: #333;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}
</style>

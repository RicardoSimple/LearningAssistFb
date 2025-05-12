<template>
  <div class="home">
    <!-- <banner isHome="true"></banner> -->
    <div class="site-content animate">
      <!--通知栏-->
      <div class="notify">
        <div
          class="search-result"
          v-if="hideSlogan"
        >
          <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
          <span v-else-if="category">分类 "{{category}}" 相关文章</span>
        </div>
        <quote v-else>{{notice}}</quote>
      </div>
      <div class="block">
        <el-carousel height="40vh" type="card" arrow="always">
          <el-carousel-item class="carou_item" v-for="course in hotcourses" :key="course.id">
            <el-card class="card">
              <img class="cover" :src="course.cover" alt="课程封面" />
              <div class="info">
                <router-link :to="`/course/${course.id}`">
                  <div class="link_container">
                    <div>
                      <h3 class="title">{{ course.name }}</h3>
                    </div>
                    <div>
                      <el-statistic :value="course.view_count" title="浏览量">
                      </el-statistic>
                    </div>
                  </div>

                </router-link>
                <p class="desc">{{ course.description }}</p>
              </div>
            </el-card>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--焦点图-->
      <div
        class="top-feature"
        v-if="!hideSlogan"
      >
        <section-title>
          <div style="display: flex;align-items: flex-end;">
            聚焦<small-ico></small-ico></div>
        </section-title>
        <div class="feature-content">
<!--          <div-->
<!--            class="feature-item"-->
<!--            v-for="item in features"-->
<!--            :key="item.title"-->
<!--          >-->
<!--            <Feature :data="item"></Feature>-->
<!--          </div>          -->
          <div
            class="feature-item"
            v-for="item in hotcourses"
            :key="item.id"
          >
            <HotCourseCard :course="item"></HotCourseCard>
          </div>
        </div>
      </div>
      <!--文章列表-->
      <div
        class="site-main"
        :class="{'search':hideSlogan}"
      >
        <section-title v-if="!hideSlogan">推荐</section-title>
<!--        <template v-for="item in postList">-->
<!--          <post-->
<!--            :post="item"-->
<!--            :key="item.id"-->
<!--          ></post>-->
<!--        </template>-->
      </div>

      <!--加载更多-->
      <div
        class="more"
        v-show="hasNextPage"
      >
        <div
          class="more-btn"
          @click="loadMore"
        >More</div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import Feature from '@/components/feature'
import sectionTitle from '@/components/section-title'
import Post from '@/components/post'
import SmallIco from '@/components/small-ico'
import Quote from '@/components/quote'
import {getHotNCourse} from "@/api/courseApi";
import HotCourseCard from "@/components/course/HotCourseCard.vue";

export default {
  name: 'Home',
  props: ['cate', 'words'],
  data () {
    return {
      hotcourses:[],
      currPage: 1,
      hasNextPage: false
    }
  },
  components: {
    HotCourseCard,
    Banner,
    Feature,
    sectionTitle,
    Post,
    SmallIco,
    Quote
  },
  computed: {
    searchWords () {
      return this.$route.params.words
    },
    category () {
      return this.$route.params.cate
    },
    hideSlogan () {
      return this.category || this.searchWords
    },
    notice () {
      return this.$store.getters.notice
    }
  },
  methods: {
    // fetchFocus () {
    //   fetchFocus().then(res => {
    //     this.features = res.data || []
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    loadMore () {
      fetchList({ page: this.currPage + 1 }).then(res => {
        this.postList = this.postList.concat(res.data.items || [])
        this.currPage = res.data.page
        this.hasNextPage = res.data.hasNextPage
      })
    }
  },
  created () {
    getHotNCourse(6).then(res => {
      this.hotcourses = res.data
    })
  }
}
</script>
<style scoped lang="less">
.cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;
    & > div {
      padding: 20px;
    }
  }

  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 25%;
      margin: 20px 10px 10px 20px;
    }
  }
}

.site-main {
  padding-top: 80px;

  &.search {
    padding-top: 0;
  }
}

.more {
  margin: 50px 0;
  .more-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #adadad;
    border: 1px solid #adadad;
    border-radius: 20px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      color: #8fd0cc;
      border: 1px dashed #8fd0cc;
    }
  }
}

/******/
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}
.link_container{
  display: flex;
  justify-content: space-between;
}
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
    height: 30vh;
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

  }
}
/******/
</style>

<template>
  <div
    id="layout-header"
    :class="{'fixed':fixed,'hidden':hidden}"
    @click.stop="mobileShow=false"
  >
    <div class="site-logo">
      <router-link to="/">
        <img
          src="@/assets/ALLogo.png"
          style="background-repeat: no-repeat; background-position: center;"
          alt=""
        >
        <div class="site-name"><p>智能学习助手</p></div>
      </router-link>
    </div>
    <div
      class="menus-btn"
      @click.stop="mobileShow=!mobileShow"
    >
      Menus
    </div>
    <div
      class="site-menus"
      :class="{'mobileShow':mobileShow}"
      @click.stop="mobileShow=!mobileShow"
    >
      <div class="menu-item header-search"><header-search /></div>
      <div class="menu-item"><router-link to="/">首页</router-link></div>
      <div class="menu-item"><router-link to="/course">课程</router-link></div>
<!--      <div class="menu-item hasChild">-->
<!--        <a href="#">文章</a>-->
<!--        <div-->
<!--          class="childMenu"-->
<!--          v-if="category.length"-->
<!--        >-->
<!--          <div-->
<!--            class="sub-menu"-->
<!--            v-for="item in category"-->
<!--            :key="item.title"-->
<!--          ><router-link-->
<!--              :to="`/category/${item.title}`">{{item.title}}</router-link></div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="menu-item"><router-link to="/friend">友链</router-link></div>-->
      <div class="menu-item"><router-link to="/learn">学习</router-link></div>
<!--      <div class="menu-item"><router-link to="/about">关于</router-link></div>-->
      <div
        class="menu-item"
        v-if="userInfo==null"
      ><router-link to="/login">登录</router-link></div>
      <div
        class="menu-item"
        v-if="userInfo!=null"
      ><router-link to="/main">
          <el-popover
            placement="top"
            visible-arrow="false"
            width="200"
            trigger="hover"
          >
          <UserMenu></UserMenu>
            <el-avatar
              :size="50"
              :src="userInfo.avatar"
              @error="errorHandler"
              slot="reference"
            >
              {{ userInfo.user_name }}
            </el-avatar>
          </el-popover></router-link></div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@/components/header-search'
import { fetchCategory } from '../../api'
import { check } from '../../api/userApi'
import { getUserInfo } from '../../utils/userInfo'
import UserMenu from '../user/user-menu.vue'
export default {
  name: "layout-header",
  components: { HeaderSearch, UserMenu },
  data () {
    return {
      lastScrollTop: 0,
      fixed: false,
      hidden: false,
      category: [],
      mobileShow: false,
      userInfo: null,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.watchScroll)
    this.fetchCategory()
  },
  async created () {
    await check()
    this.userInfo = getUserInfo()
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.watchScroll)
  },
  methods: {
    watchScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop === 0) {
        this.fixed = false;
      } else if (scrollTop >= this.lastScrollTop) {
        this.fixed = false;
        this.hidden = true;
      } else {
        this.fixed = true
        this.hidden = false
      }
      this.lastScrollTop = scrollTop
    },
    fetchCategory () {
      fetchCategory().then(res => {
        this.category = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    errorHandler () {
      return true;
    }
  }
}
</script>

<style scoped lang="less">
#layout-header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s all ease;
  -webkit-transition: 0.3s all ease;
  -moz-transition: 0.3s all linear;
  -o-transition: 0.3s all ease;
  -ms-transition: 0.3s all ease;
  &.hidden {
    top: -100px;
  }
  &.fixed {
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.site-logo {
  text-align: center;

  img {
    width: 40px;
    height: auto;
  }

  p.site-name {
    font-size: 15px;
    font-weight: bold;
    position: relative;
    top: -10px;
  }
}
.menus-btn {
  display: none;
  visibility: hidden;
}
.site-menus {
  display: flex;
  align-items: center;

  .menu-item {
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    a {
      padding: 12px 10px;
      color: #545454;
      font-weight: 500;
      font-size: 16px;
      &:hover {
        color: #ff6d6d;
      }
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
    &.hasChild:hover .childMenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(-5px);
    }
  }
  .childMenu {
    width: 130px;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 55px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: 0.7s all ease;
    -webkit-transition: 0.6s all ease;
    -moz-transition: 0.6s all linear;
    -o-transition: 0.6s all ease;
    -ms-transition: 0.6s all ease;
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid white;
      top: -8px;
      left: 20px;
    }
    &:before {
      top: -9px;
      border-bottom: 8px solid #ddd;
    }
    .sub-menu {
      height: 40px;
      line-height: 40px;
      position: relative;
      &:not(:last-child):after {
        /*position: absolute;*/
        content: "";
        width: 50%;
        height: 1px;
        color: #ff6d6d;
        bottom: 0;
        left: 25%;
        z-index: 99;
      }
    }
  }
}
@media (max-width: 960px) {
  #layout-header {
    padding: 0 20px;
  }
}
@media (max-width: 600px) {
  #layout-header {
    padding: 0 10px;
  }
  .menus-btn {
    display: block;
    visibility: visible;
  }
  .site-menus {
    position: absolute;
    display: none;
    visibility: hidden;
    background-color: #f9f9f9;
    width: 100%;
    left: 0;
    top: 80px;
    z-index: -9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .menu-item {
      position: relative;
      height: unset;
      &:not(:last-child) {
        margin-right: 0;
      }
    }
    .childMenu {
      position: relative;
      width: 100%;
      top: 0;
      background-color: #f3f3f3;
      opacity: 1;
      visibility: visible;
      border: none;
      box-shadow: none;
      &:before,
      &:after {
        content: "";
        position: relative;
        width: 0;
        height: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }
  .site-menus.mobileShow {
    display: inline-block;
    visibility: visible;
    z-index: 99;
  }
}
</style>

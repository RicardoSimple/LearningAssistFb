import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '../utils/userInfo'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/category/:cate',
        name: 'category',
        component: () => import('../views/Home.vue'),
        meta: { title: '分类', params: 'cate' }
    },
    {
        path: '/search/:words',
        name: 'search',
        component: () => import('../views/Home.vue'),
        meta: { title: '搜索', params: 'words' }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: { title: '关于' }
    },
    {
        path: '/course',
        name:'course',
        component:()=> import('../views/Courses.vue'),
        meta:{title: '课程'}
    },
    {
        path: '/course/:id',
        name: 'courseDetail',
        component: () => import('../views/CourseDetail.vue'),
        meta: { title: '课程详情' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/user/Register.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/user/Main.vue'),
        meta: { title: '个人中心', isAuth: true }
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/user/MyArticle.vue'),
        meta: { title: '文章管理', isAuth: true }
    },
    {
        path: '/assignments',
        name: 'assignments',
        component: () => import('../views/Assignments.vue'),
        meta: { title: '我的作业', isAuth: true }
    },
    {
        path: '/assignment/:id',
        name: 'assignmentDetail',
        component: () => import('../views/AssignmentDetail.vue'),
        meta: { title: '作业详情' }
    },
    {
        path: '/learn',
        name: 'learn',
        component: () => import('../views/Learn.vue'),
        meta: { title: '学习', isAuth: true }
    },
    {
        path: '/setting',
        component: () => import('../views/user/Setting.vue'),
        children: [
            {
                path: '',
                redirect: 'profile'
            },
            {
                path: 'profile',
                meta: { title: '更改资料', isAuth: true },
                name: 'profile',
                component: () => import('../views/setting/Profile.vue'),
            },
            {
                path: 'history',
                name: 'history',
                component: () => import('../views/setting/History.vue'),
                meta: { title: '历史记录', isAuth: true }
            }
        ]
    },
    {
        path: '/edit/:articleId',
        name: 'editArticle',
        component: () => import('../views/EditArticle.vue'),
        props: true,
        meta: { title: '编辑文章', isAuth: true, params: 'articleId' }
    },
    {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/Friend.vue'),
        meta: { title: '友链' }
    },
    {
        path: '/addArticle',
        name: 'addArticle',
        component: () => import('../views/AddArticle.vue'),
        meta: { title: '新文章', isAuth: true }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Articles.vue'),
        meta: { title: '文章' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    let title = "Smart Assistant"
    if (to.meta.isAuth) { // 判断是否需要进行导航守卫
        const token = getToken()
        if (token != "") {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
    if (to.meta.params) {
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    } else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }
    next();
})
router.afterEach((to, from) => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.dispatch('setLoading', false);
    }, 500)
})
export default router

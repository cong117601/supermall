import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const ShopCat = () => import('../views/shopcat/ShopCat')
//1.安装插件
Vue.use(VueRouter)
//单词不要写错 routes 固定
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcat',
    component: ShopCat
  },
]
//2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出 ,在main.js中进行使用 挂载
export default router
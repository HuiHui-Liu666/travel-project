import { createRouter,createWebHashHistory } from "vue-router";
const routes = [
  {path:'/',name:'index',component:()=>import('@/pages/index/index.vue')},
  {path:'/found',name:'found',component:()=>import('@/pages/found/index.vue')},
  {path:'/publish',name:'publish',component:()=>import('@/pages/publish/index.vue')},
  {path:'/mine',name:'mine',component:()=>import('@/pages/mine/index.vue')},
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
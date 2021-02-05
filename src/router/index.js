import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login')
  }, {
    redirect: "/login",
    path: '/'
  },
  //进入首页
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index/index'),
    meta: {
      keepAlive: true
    },
    children: [
      //首页
      {
        path: '/hollerword',
        name: 'hollerword',
        component: () => import('@/views/HollerWord/hollerword'),
        meta: {
          keepAlive: false,
          break: [{
            name: "首页"
          }]
        }
      }, {
        redirect: "/hollerword",
        path: '/'
      },
      //商品管理
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/goods'),
        meta: {
          keepAlive: true,
          break: [{
            name: "商品管理"
          }]
        }
      },
      //详情页
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/goods/detail'),
        meta: {
          keepAlive: true,
          break: [{
            name: "商品详情"
          }]
        }
      },
      //编辑页
      {
        path: '/compile',
        name: 'compile',
        component: () => import('@/views/goods/compile'),
        meta: {
          keepAlive: true,
          break: [{
            name: "商品管理 -- 修改商品"
          }]
        }
      },
      //添加啊
      {
        path: '/add',
        name: 'add',
        component: () => import('@/views/goods/add'),
        meta: {
          keepAlive: true,
          break: [{
            name: "商品管理 -- 添加商品"
          }]
        }
      },
      //品类管理
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/category'),
        meta: {
          keepAlive: true,
          break: [{
            name: "品类管理"
          }]
        }
      },
      //订单管理
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/order'),
        meta: {
          keepAlive: true,
          break: [{
            name: "订单管理"
          }]
        }
      },
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
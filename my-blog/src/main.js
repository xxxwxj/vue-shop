import Vue from 'vue'
import App from './App.vue'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import axios from 'axios'

import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import SingleBlog from './components/SingleBlog'
import EditBlog from './components/EditBlog'

Vue.config.productionTip = false
// Vue.use(VueResource)
Vue.use(VueRouter)

// axios全局配置
axios.defaults.baseURL = 'http://localhost:3000'


// 自定义指令
// Vue.directive('rainbow', {
//   bind(el) {
//     el.style.color = '#' + Math.random().toString(16).slice(2, 8);
//   }
// })
// Vue.directive('theme', {
//   bind(el, binding) {
//     if (binding.value === 'wide') {
//       el.style.maxWidth = '1260px';
//     } else if (binding.value === 'narrow') {
//       el.style.maxWidth = '560px';
//     }
//     if (binding.arg === 'column') {
//       el.style.background = '#6677cc';
//       el.style.padding = '20px';

//     }
//   }
// })

// 自定义过滤器
// Vue.filter('to-uppercase', value => value.toUpperCase())
// Vue.filter('snippet', value => value.slice(0,100) + '...')

// 创建路由
const router = new VueRouter({
  routes: [
    { path: '/', component: ShowBlogs },
    { path: '/add', component: AddBlog },
    { path: '/blog/:id', component: SingleBlog },
    { path: '/edit/:id', component: EditBlog }
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

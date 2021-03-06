import Vue from 'vue'
import Router from 'vue-router'
import detail from '../components/detail.vue'
import index from '../components/index.vue'
import rubbish from '../components/rubbish.vue'
import upload from '../components/upload.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/detail',
      component: detail,
      name: 'detail'
    },
    {
      path: '/',
      component: index,
      name: 'index'
    },
    {
      path: '/rubbish/:id',
      component: rubbish,
      name: 'rubbish'
    },
    {
      path: '/upload',
      component: upload,
      name: 'upload'
    }
  ]
})

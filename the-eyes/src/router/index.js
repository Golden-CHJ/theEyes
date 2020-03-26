import Vue from 'vue'
import Router from 'vue-router'
import detail from '../components/detail.vue'
import index from '../components/index.vue'
 Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/detail',
            component:detail,
            name:"detail"
        },
        {
            path:'/',
            component:index,
            name:"index"
        }
    ]
})
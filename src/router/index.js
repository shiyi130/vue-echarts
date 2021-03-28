import Vue from 'vue'
import Router from 'vue-router'
import AllCharts from '@/components/AllCharts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AllCharts',
      component: AllCharts
    }
  ]
})

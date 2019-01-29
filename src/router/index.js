import Vue from 'vue'
import Router from 'vue-router'
import { utils } from '../libs/util.js'
import {state} from '../store/index.js'
/**
 * 登录路由引用
 */
import Login from './login'
import student from './student/index'
import patriarch from './patriarch/index'
import teacher from './teacher/index'
import weChartBindRes from './login/weChartBindRes'

import { AlertPlugin, Confirm, Grid, GridItem } from 'vux'

Vue.use(Confirm)
Vue.use(AlertPlugin)
Vue.use(Grid)
Vue.use(GridItem)

Vue.use(Router)

let base = utils.base

let currentRouter = [
  Login,
  weChartBindRes,
  {path: '*', redirect: '/login'},
  student,
  patriarch,
  teacher
]

let router = new Router({
  base: base,
  mode: 'history',
  routes: currentRouter
})
router.beforeEach((to, from, next) => {
  console.log(to,from)
  if((to.name=='questions'&&from.name=='homeworkRes'&&!to.query.noRes)||(to.name=='choiceEvaluation'&&from.name=='appraisal_math_open_start')){
    this.$router.go(-2)
  }
  // if(from.query.allowBack==false){
  //   this.$router.go(-2)
  // }
  next();
  let allowBack = true    //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack;
  }
  if(from.name&&to.name=='login'){
    console.log('p')
    allowBack=false
  }
  if (!allowBack) {
    history.pushState(null, null, location.href)
  }
  console.log(state,allowBack,'50')
  state.allowBack=allowBack;


})
export default router

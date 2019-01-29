import questionbank from './questionbank/questionbank'
import appraisal from './appraisal/appraisal'
import commonality from './commonality/commonality'
const student = {
  // 学生端入口
  path: '/student',
  name: 'student',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../components/student'))
    }, 'student')
  },
  redirect: to => {
    return '/student/homepage'
  },
  children: [
    { 	// 底部切换主路由
      path: '/student/homepage',
      name: 'homepage',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../components/homepage'))
        }, 'student')
      },
      redirect: to => {
        return '/student/homepage/home'
      },
      children: [
        { // 首页
          path: '/student/homepage/home',
          name: 'home',
          meta:{allowBack: false},
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/student/home'))
            }, 'student')
          }
        },

        // 题库
        questionbank,

        // 自适应测评
        appraisal,

        { // 个人中心
          path: '/student/homepage/firstchild',
          name: 'firstchild',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/student/firstchild'))
            }, 'student')
          }
        }
      ]
    },

    /****************************************************************************************/
    // 公共路由
    commonality

    /****************************************************************************************/

  ]
}
export default student

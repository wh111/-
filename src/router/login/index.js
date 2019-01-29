/**
 * 移动端登录页面跳转相关路由
 * describe 根据功能模块名称命名路由
 * author zyc
 * date 2018-04-19 15:19
 */

const login = {
  path: '/login',
  name: 'login',
  // meta:{allowBack: false},
  component: r => require.ensure([], () => r(require('../../pages/login/login')), 'login')
}

export default login

const firstChild = {
  path: '/student/commonality/myOrder',
  name: 'myOrder',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/student/firstchild/myOrder'))
    }, 'student')
  },
  redirect: to => {
    return '/student/commonality/myOrder/allBook'
  },
  children: [
    { // 个人中心——我的订单——全部
      path: '/student/commonality/myOrder/allBook',
      name: 'allBook',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/allBook'))
        }, 'student')
      }
    },
    { // 个人中心——我的订单——未付款
      path: '/student/commonality/myOrder/non_payment',
      name: 'non_payment',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/non_payment'))
        }, 'student')
      }
    },
    { // 个人中心——我的订单——已完成
      path: '/student/commonality/myOrder/accomplish',
      name: 'accomplish',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/accomplish'))
        }, 'student')
      }
    },
    { // 个人中心——我的订单——已取消
      path: '/student/commonality/myOrder/cancel',
      name: 'cancel',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/cancel'))
        }, 'student')
      }
    }

  ]
}
export default firstChild

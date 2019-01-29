import pMyorder from './pMine/pMyorder'
import commonality from './commonality/commonality'
const patriarch = {
  path: '/guardian',
  name: 'guardian',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../pages/patriarch/patriarch'))
    }, 'guardian')
  },
  redirect: to => {
    return '/guardian/pRoute'
  },
  children: [
    {// 底部切换路由
      path: '/guardian/pRoute',
      name: 'pRoute',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../pages/patriarch/pRoute'))
        }, 'patriarch')
      },
      redirect: to => {
        return '/guardian/pRoute/pHome'
      },
      children: [
        {// 首页
          path: '/guardian/pRoute/pHome',
          name: 'pHome',
          meta:{allowBack: false},
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pHome/pHome'))
            }, 'patriarch')
          }
        },
        {// 首页——学习动态
          path: '/guardian/pRoute/pDynamic',
          name: 'pDynamic',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pHome/pDynamic'))
            }, 'patriarch')
          }
        },
        {// 首页——学习动态--查看更多
          path: '/guardian/pRoute/pDynamic_content',
          name: 'pDynamic_content',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pHome/pDynamic_content'))
            }, 'patriarch')
          }
        },
        {// 首页——她的题库
          path: '/guardian/pRoute/pHerquestion',
          name: 'pHerquestion',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pHome/pHerquestion'))
            }, 'patriarch')
          }
        },
        {// 题库
          path: '/guardian/pRoute/pQuestion',
          name: 'pQuestion',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pQuestion/pQuestion'))
            }, 'patriarch')
          }
        },
        {// 题库--商品详情
          path: '/guardian/pRoute/pQuestion_content',
          name: 'pQuestion_content',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pQuestion/pQuestion_content'))
            }, 'patriarch')
          }
        },
        {// 个人中心
          path: '/guardian/pRoute/pMine',
          name: 'pMine',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pMine/pMine'))
            }, 'patriarch')
          }
        },
        // 个人中心-我的订单
        pMyorder,

        {// 个人中心——我的收藏
          path: '/guardian/pRoute/pMyfavorite',
          name: 'pMyfavorite',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/patriarch/pMine/pMyfavorite'))
            }, 'patriarch')
          }
        }

      ]
    },
    commonality
  ]
}
export default patriarch

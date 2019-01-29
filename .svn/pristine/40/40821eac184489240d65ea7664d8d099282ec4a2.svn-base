const personal = {
  // 公共路由
  path: '/guardian/commonality',
  name: 'pcommonalitya',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../components/commonality'))
    }, 'guardian')
  },
  children: [
    {// 个人中心——我的订单-商品详情
      path: '/guardian/commonality/all_content',
      name: 'all_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pMyorder/all_content'))
        }, 'guardian')
      }
    },
    {// 个人中心——留言反馈
      path: '/guardian/commonality/pFeedback',
      name: 'pFeedback',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pFeedback'))
        }, 'guardian')
      }
    },
    {// 个人中心——留言反馈——我要反馈
      path: '/guardian/pRoute/pSubmit',
      name: 'pSubmit',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pSubmit'))
        }, 'guardian')
      }
    },
    {// 个人中心——留言反馈——结果页
      path: '/guardian/pRoute/pSuccess',
      name: 'pSuccess',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pSuccess'))
        }, 'guardian')
      }
    }
  ]
}
export default personal

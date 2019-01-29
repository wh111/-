const HomePage = {
  // 公共路由
  path: '/guardian/commonality',
  name: 'pcommonalitys',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../components/commonality'))
    }, 'guardian')
  },
  children: [
    {// 首页——TA的题库-——五年高考卅年模拟
      path: '/guardian/commonality/pHerquestion_content',
      name: 'pHerquestion_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pHome/pHerquestion_content'))
        }, 'guardian')
      }
    },
    {// 首页——TA的题库-——五年高考卅年模拟--查看
      path: '/guardian/commonality/pExamine',
      name: 'pExamine',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pHome/pExamine'))
        }, 'guardian')
      }
    },
    {// 首页——TA的题库-——五年高考卅年模拟--查看--题类型
      path: '/guardian/commonality/pTopic',
      name: 'pTopic',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pHome/pTopic'))
        }, 'guardian')
      }
    },
    {// 首页——TA的作业
      path: '/guardian/commonality/pHerwork',
      name: 'pHerwork',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pHome/pHerwork'))
        }, 'guardian')
      }
    },
    {// 首页——TA的测评
      path: '/guardian/commonality/pHerappraisal',
      name: 'pHerappraisal',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pHome/pHerappraisal'))
        }, 'guardian')
      }
    }
  ]
}
export default HomePage

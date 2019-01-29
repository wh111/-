import HomePage from './HomePage'
import personal from './personal'
const commonality = {
  // 公共路由
  path: '/guardian/commonality',
  name: 'pCommonality',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../components/commonality'))
    }, 'guardian')
  },
  children: [
    HomePage,
    personal
  ]
}
export default commonality

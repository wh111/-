const pMyorder = {
  path: '/guardian/pRoute/pMine/pMyorder',
  name: 'pMyorder',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/patriarch/pMine/pMyorder'))
    }, 'guardian')
  },
  redirect: to => {
    return '/patriarch/pRoute/pMine/pMyorder/all'
  },
  children: [
    {
      path: '/guardian/pRoute/pMine/pMyorder/all',
      name: 'all',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pMyorder/all'))
        }, 'guardian')
      }
    },
    {
      path: '/guardian/pRoute/pMine/pMyorder/non-payment',
      name: 'non-payment',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pMyorder/non-payment'))
        }, 'guardian')
      }
    },
    {
      path: '/guardian/pRoute/pMine/pMyorder/paccomplish',
      name: 'paccomplish',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pMyorder/accomplish'))
        }, 'guardian')
      }
    },
    {
      path: '/guardian/pRoute/pMine/pMyorder/canceled',
      name: 'canceled',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/patriarch/pMine/pMyorder/canceled'))
        }, 'guardian')
      }
    }
  ]
}
export default pMyorder

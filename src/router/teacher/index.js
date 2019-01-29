import commonality from './commonality/commonality'
const teacher = {
// 老师端入口
  path: '/teacher',
  name: 'teacher',
  component: resolve => {
		 require.ensure([], () => {
			 resolve(require('../../pages/teacher/teacher'))
		 }, 'teacher')
  },
  redirect: to => {
    return '/teacher/tRouter'
  },
  children: [
    {// 教师端路由
      path: '/teacher/tRouter',
      name: 'tRouter',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../pages/teacher/tRouter'))
        }, 'teacher')
      },
      redirect: to => {
        return '/teacher/tRouter/tTeam'
      },
      children: [
        {// 班组路由
          path: '/teacher/tRouter/tTeam',
          name: 'tTeam',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/teacher/tTeam/tTeam'))
            }, 'teacher')
          },
          redirect: to => {
            return '/teacher/tRouter/tTeam/tGroup'
          },
          children: [
            {// 班组--只看班级
              path: '/teacher/tRouter/tTeam/tClass',
              name: 'tClass',
              component: resolve => {
                require.ensure([], () => {
                  resolve(require('../../pages/teacher/tTeam/tClass'))
                }, 'teacher')
              }
            },
            {// 班组--只看小组
              path: '/teacher/tRouter/tTeam/tGroup',
              name: 'tGroup',
              component: resolve => {
                require.ensure([], () => {
                  resolve(require('../../pages/teacher/tTeam/tGroup'))
                }, 'teacher')
              }
            }
          ]
        },
        {// 我的路由
          path: '/teacher/tRouter/tMine',
          name: 'tMine',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../pages/teacher/tMine/tMine'))
            }, 'teacher')
          }
        }
      ]
    },
    commonality
  ]
}
export default teacher

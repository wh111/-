const commonality = {
  path: '/teacher/tCommonality',
  name: 'tCommonality',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/teacher/commonality'))
    }, 'teacher')
  },
  children: [
    {// 班级名称
      path: '/teacher/tCommonality/tClassContent',
      name: 'tClassContent',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tClassContent'))
        }, 'teacher')
      },
      redirect: to => {
        return '/teacher/tCommonality/tClassContent/tBook'
      },
      children: [
        {// 班级名称--作业
          path: '/teacher/tCommonality/tClassContent/tBook',
          name: 'tBook',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tBook'))
            }, 'teacher')
          }
        },
        {// 班级名称--测评
          path: '/teacher/tCommonality/tClassContent/tEvaluation',
          name: 'tEvaluation',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tEvaluation'))
            }, 'teacher')
          }
        }

        // {//班级名称--信息
        //   path: '/teacher/tCommonality/tClassContent/tMessage',
        //   name: 'tMessage',
        //   component: resolve => {
        //     require.ensure([], () => {
        //       resolve(require('../../../pages/teacher/tTeam/tMessage'))
        //     }, 'teacher')
        //   },
        // }
      ]
    },
    {// 班级名称--创建班组群
      path: '/teacher/tCommonality/tClassCreated',
      name: 'tClassCreated',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tClassCreated'))
        }, 'teacher')
      }
    },
    {// 班级名称--测评
      path: '/teacher/tCommonality/tAppraisal',
      name: 'tAppraisal',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tAppraisal'))
        }, 'teacher')
      }
    },
    {// 班级名称--测评
      path: '/teacher/tCommonality/priview/:type',
      name: 'preview',
      meta:{allowBack: false},
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/preview'))
        }, 'teacher')
      }
    },
    {// 班级名称--测评 //添加试题
      path: '/teacher/tCommonality/addQueToPaper',
      name: 'addQueToPaper',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/addQueToPaper'))
        }, 'teacher')
      }
    },
    {// 班级名称--布置作业（ + 号）
      path: '/teacher/tCommonality/tHomework',
      name: 'tHomework',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tHomework'))
        }, 'teacher')
      },
      redirect: to => {
        return '/teacher/tCommonality/tHomework/tTextbook'
      },
      children: [
        {// 教材类型
          path: '/teacher/tCommonality/tHomework/tTextbook',
          name: 'tTextbook',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tTextbook'))
            }, 'teacher')
          }
        },
        {// 题型
          path: '/teacher/tCommonality/tHomework/tQuestion',
          name: 'tQuestion',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tQuestion'))
            }, 'teacher')
          }
        },
        {// 基础设置
          path: '/teacher/tCommonality/tHomework/tBasic',
          name: 'tBasic',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tBasic'))
            }, 'teacher')
          }
        }

      ]
    },
    {// 班级名称--测评--待批改
      path: '/teacher/tCommonality/tAppraisalContent',
      name: 'tAppraisalContent',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tAppraisalContent'))
        }, 'teacher')
      }
    },
    {// 班级名称--测评--待批改
      path: '/teacher/tCommonality/tMistakes',
      name: 'tMistakes',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tMistakes'))
        }, 'teacher')
      }
    },
    {// 班级名称-已批改
      path: '/teacher/tCommonality/tResponses',
      name: 'tResponses',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/teacher/tTeam/tResponses'))
        }, 'teacher')
      },
      redirect: to => {
        return '/teacher/tCommonality/tResponses/tAlready'
      },
      children: [
        {// 已批改
          path: '/teacher/tCommonality/tResponses/tAlready',
          name: 'tAlready',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tAlready'))
            }, 'teacher')
          }
        },
        {// 未批改
          path: '/teacher/tCommonality/tResponses/tNone',
          name: 'tNone',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tNone'))
            }, 'teacher')
          }
        },
        {// 未完成
          path: '/teacher/tCommonality/tResponses/tAccomplish',
          name: 'tAccomplish',
          component: resolve => {
            require.ensure([], () => {
              resolve(require('../../../pages/teacher/tTeam/tAccomplish'))
            }, 'teacher')
          }
        }
      ]
    }

  ]
}
export default commonality

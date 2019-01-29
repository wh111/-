const appraisal = {
  path: '/student/homepage/appraisal',
  name: 'appraisal',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/student/appraisal'))
    }, 'student')
  },
  redirect: to => {
    return '/student/homepage/appraisal/appraisal_math'
  },
  children: [
    {
      path: '/student/homepage/appraisal/appraisal_math',
      name: 'appraisal_math',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_math'))
        }, 'student')
      }
    },
    {
      path: '/student/homepage/appraisal/selfTestResult',
      name: 'selfTestResult',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/selfTest/selfTestResult'))
        }, 'student')
      }
    },
    {
      path: '/student/homepage/appraisal/choiceEvaluation_Byself/:grade/:isFirstAssessment/:textbookVersionId/:subject',
      name: 'choiceEvaluation',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/choiceEvaluation_Byself'))
        }, 'student')
      }
    },
    {// 语文
      path: '/student/homepage/appraisal/appraisal_language',
      name: 'appraisal_language',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_language'))
        }, 'student')
      }
    },
    {// 英语
      path: '/student/homepage/appraisal/appraisal_english',
      name: 'appraisal_english',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_english'))
        }, 'student')
      }
    },
    {// 历史
      path: '/student/homepage/appraisal/appraisal_history',
      name: 'appraisal_history',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_history'))
        }, 'student')
      }
    },
    {// 地理
      path: '/student/homepage/appraisal/appraisal_geography',
      name: 'appraisal_geography',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_geography'))
        }, 'student')
      }
    }

  ]
}
export default appraisal

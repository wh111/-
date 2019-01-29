const recentPracticeNext = {
  // 最近练习一级路由页面——未满一百分
  path: '/student/commonality/recentPractice_next',
  name: 'recentPractice_next',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/student/home/recentPractice_next'))
    }, 'student')
  },
  redirect: to => {
    return '/student/commonality/recentPractice_next/recentPractice_next_question'
  },
  children: [
    { // 最近练习一级路由页面——未满一百分——选择题
      path: '/student/commonality/recentPractice_next/recentPractice_next_question',
      name: 'recentPractice_next_question',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/recentPractice_next/recentPractice_next_question'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——未满一百分——填空题
      path: '/student/commonality/recentPractice_next/sCompletion',
      name: 'sCompletion',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/sCompletion'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——未满一百分——问答题
      path: '/student/commonality/recentPractice_next/sAsked',
      name: 'sAsked',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/sAsked '))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——未满一百分——笔记
      path: '/student/commonality/recentPractice_next/recentPractice_next_note',
      name: 'recentPractice_next_note',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../..//pages/student/home/recentPractice_next/recentPractice_next_note'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——未满一百分——收藏
      path: '/student/commonality/recentPractice_next/recentPractice_next_collect',
      name: 'recentPractice_next_collect',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../..//pages/student/home/recentPractice_next/recentPractice_next_collect'))
        }, 'student')
      }
    }
  ]
}
export default recentPracticeNext

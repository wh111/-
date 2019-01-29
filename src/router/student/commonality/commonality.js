import recentPracticeNext from './recentPractice_next'
import appraisalMathOpen from './appraisal_math_open'
import firstChild from './firstchild'
const commonality = {
  // 公共路由
  path: '/student/commonality',
  name: 'commonality',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../components/commonality'))
    }, 'student')
  },
  children: [

    { // 最近练习主页面
      path: '/student/commonality/recentPractice',
      name: 'recentPractice',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/recentpractice'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面
      path: '/student/commonality/recentPractice_content',
      name: 'recentPractice_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/recentPractice_content'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——满百分
      path: '/student/commonality/recentPractice_over',
      name: 'recentPractice_over',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/recentPractice_over'))
        }, 'student')
      }
    },
    { // 最近练习一级路由页面——未满一百分——详情页面
      path: '/student/commonality/recentPractice_last',
      name: 'recentPractice_last',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/home/recentPractice_last'))
        }, 'student')
      }
    },
    recentPracticeNext,
    /****************************************************************************************/

    { // 题库——商品详情
      path: '/student/commonality/questionGradeContent',
      name: 'questionGradeContent',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/questionGradeContent'))
        }, 'student')
      }
    },
    { // 题库——商品详情——购买
      path: '/student/commonality/buy',
      name: 'buy',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/buy'))
        }, 'student')
      }
    },
    // 测评-进入测评(导航部分)
    appraisalMathOpen,
    { // 自适应测评——进入测评——详情
      path: '/student/commonality/appraisal_math_open_start',
      name: 'appraisal_math_open_start',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/appraisal/appraisal_math_open_start'))
        }, 'student')
      }
    },
    { // 个人中心——头像
      path: '/student/commonality/personal',
      name: 'personal',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/personal'))
        }, 'student')
      }
    },
    { // 个人中心——消息（图片）
      path: '/student/commonality/message',
      name: 'message',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/message'))
        }, 'student')
      }
    },
    { // 个人中心——消息（图片）--详情
      path: '/student/commonality/message_content',
      name: 'message_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/message_content'))
        }, 'student')
      }
    },
    { // 个人中心——会员（V）
      path: '/student/commonality/member',
      name: 'member',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/member'))
        }, 'student')
      }
    },
    { // 个人中心——专题库
      path: '/student/commonality/projectLibrary',
      name: 'projectLibrary',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/projectLibrary'))
        }, 'student')
      }
    },
    // 个人中心——我的订单(路由)
    firstChild,
    { // 个人中心——我的订单——商品详情
      path: '/student/commonality/allBook_content',
      name: 'allBook_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/allBook_content'))
        }, 'student')
      }
    },
    { // 个人中心——我的收藏
      path: '/student/commonality/myFavorite',
      name: 'myFavorite',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/myFavorite'))
        }, 'student')
      }
    },
    { // 个人中心——我的错题
      path: '/student/commonality/myErrors',
      name: 'myErrors',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/myErrors'))
        }, 'student')
      }
    },
    { // 个人中心——我的错题--易错题
      path: '/student/commonality/mistakes',
      name: 'mistakes',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/mistakes'))
        }, 'student')
      }
    },
    {// 个人中心--错题题目详情展示
      path: '/student/commonality/questionDetail',
      name: 'questionDetail',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/questionDetail'))
        }, 'student')
      }
    },
    // {//个人中心--题目详情展示
    //   path: '/student/commonality/questionDetail',
    //   name: 'questionDetail',
    //   component: resolve => {
    //     require.ensure([], () => {
    //       resolve(require('../../../pages/student/firstchild/questionDetail'))
    //     }, 'student')
    //   }
    // },
    { // 个人中心——我的笔记
      path: '/student/commonality/myNote',
      name: 'myNote',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/myNote'))
        }, 'student')
      }
    },

    { // 个人中心——我的班组——群信息
      path: '/student/commonality/myTeam',
      name: 'myTeam',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/myTeam'))
        }, 'student')
      }
    },
    { // 个人中心——我的班组——群信息——申请加群
      path: '/student/commonality/theClassOf',
      name: 'theClassOf',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/theClassOf'))
        }, 'student')
      }
    },
    { // 个人中心——我的班组——群信息——申请加群——群名称
      path: '/student/commonality/theClassOf_name',
      name: 'theClassOf_name',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/theClassOf_name'))
        }, 'student')
      }
    },
    { // 个人中心——我的班组——群信息——申请加群——群名称--群成员
      path: '/student/commonality/theClassOf_member',
      name: 'theClassOf_member',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/theClassOf_member'))
        }, 'student')
      }
    },
    { // 个人中心——我的班组——群信息——申请加群——添加班组群
      path: '/student/commonality/theClassOf_content',
      name: 'theClassOf_content',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/theClassOf_content'))
        }, 'student')
      }
    },
    {// 我的已完成作业作业详情
      path: '/student/commonality/homeworkRes/:type/:id',
      name: 'homeworkRes',
      meta: {
        name: '我的作业' // 表示菜单显示
      },
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/homeworkRes'))
        }, 'selfCenter')
      }
    },
    {// 做作业
      path: '/student/commonality/questions/:type/:papersId',
      name: 'questions',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/firstchild/todoQuestion/index'))
        }, 'student')
      }
    }
  ]
}
export default commonality

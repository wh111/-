const questionbank = {
	 // 题库
  path: '/student/homepage/questionbank',
  name: 'questionbank',
  component: resolve => {
    require.ensure([], () => {
      resolve(require('../../../pages/student/questionbank'))
    }, 'student')
  },
  redirect: to => {
    return '/student/homepage/questionbank/question_grade'
  },
  children: [
    {// 年级
      path: '/student/homepage/questionbank/question_grade',
      name: 'question_grade',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/question_grade'))
        }, 'student')
      }
    },
    {// 科目
      path: '/student/homepage/questionbank/question_subject',
      name: 'question_subject',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/question_subject'))
        }, 'student')
      }
    },
    {// 类别
      path: '/student/homepage/questionbank/question_category',
      name: 'question_category',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/question_category'))
        }, 'student')
      }
    },
    {// 教材
      path: '/student/homepage/questionbank/question_textbook',
      name: 'question_textbook',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../../../pages/student/question_child/question_textbook'))
        }, 'student')
      }
    }

  ]
}
export default questionbank

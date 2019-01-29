const file = 'autoAssessment'// 当前模块api前缀
const api = {
  getShopAnswer:{
    path:'/papers/queryQuestionsAnswerInfo',
    method:'get'
  },
  isFirstAssessment: {//
    path: 'autoAssessment/isFirstAssessment',
    method: 'get'
  },
  getStudentAbility: {
    path: '/autoAssessment/studentAbilityChapter/query',
    method: 'get'
  },
  get: {// 查看测评结果
    path: file + '/get',
    method: 'get'
  },
  getAnswerResult: {// 查看测评结果
    path: file + '/getAnswerResult',
    method: 'get'
  },
  submit: { // 提交测评
    path: file + '/submit',
    method: 'post'
  },
  add: {// 开始测评(带章节id)
    path: file + '/add',
    method: 'post'
  },
  addFirstAssessment: {// 首次测评
    path: file + '/addFirstAssessment',
    method: 'post'
  },
  addAssessment: {// 进入测评
    path: file + '/addAssessment',
    method: 'post'
  },
  getNextQuestions: {// 答题并获取下一道题（下一道题）
    path: file + '/getNextQuestions',
    method: 'post'
  },
  getNextQuestionsNoLogin: {// 答题并获取下一道题（下一道题）【未登录】
    path: file + '/noLogin/getNextQuestions',
    method: 'post'
  },
  getAllAnswerQuestion: {
    path: 'autoAssessment/getAllAnswerQuestion',
    method: 'get'
  }
}
export default api

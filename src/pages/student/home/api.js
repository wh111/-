const urlPrefix = '/product/' // 当前模块api前缀
const api = {
  myCurrentStudyProductList: { // 最近练习
    path: urlPrefix + 'myCurrentStudyProductList',
    method: 'get'
  },
  productGet: {
    path: urlPrefix + 'get',
    method: 'get'
  },
  queryPaperList: {// 获取商品包含的试卷集合（开始练习）
    path: 'product/queryPaperList',
    method: 'get'
  },
  queryQuestionList: {// 获取试题编号
    path: 'papers/queryQuestionList',
    method: 'get'
  },
  // getQuestionsById:{
  //   path:  '/papers/getQuestionsById',
  //   method: 'get'
  // },
  getQuestionsById: {// 获取一道试题详情
    path: 'papers/getQuestionsById',
    method: 'get'
  },
  submitAnswer: {// 提交答题（提交答案，获取正确情况）
    path: 'papers/submitAnswer',
    method: 'post'
  },
  getNextQuestions: {// 在试卷中获取下一道题（开始练习、继续练习、下一道题）
    path: 'papers/getNextQuestions',
    method: 'get'
  }

}
export default api

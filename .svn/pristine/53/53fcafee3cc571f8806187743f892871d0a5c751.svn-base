const file = '/';//当前模块api前缀
const api = {
  createGroups: {// 创建班组
    path: '/groups/add',
    method: 'post'
  },
  userInfo: {
    path: '/getMyInfo',
    method: 'get'
  },
  getGroups: {// 查询全部班组
    path: '/groups/query',
    method: 'get'
  },
  historyWorkList: {//历史作业
    path: '/historyWork/list',
    method: 'get'
  },
  correcting:{//批改作业
    path: '/historyWork/correcting',
    method: 'put'
  },
  // finished:{
  //   path: '/historyWork/correcting',
  //   method: 'put'
  // },
  finished:{//批改作业结束
    path: '/historyWork/finished',
    method: 'put'
  },
  finishedTest:{//批改测评结束
    path: '/evaluation/finished',
    method: 'put'
  },
  queryHistoryList: {//查询历史测评
    path: '/evaluation/queryHistoryList',
    method: 'get'
  },
  getWorkInfo:{//批改作业（查看）
    path: '/historyWork/getWorkInfo',
    method: 'get'
  },
  getPaperInfo:{//获取测评
    path:'/evaluation/getCorrect',
    method:'get'
  },
  list: {//作答分析列表
    path: '/evaluation/getAnswerAnalysisList',
    method: 'get'
  },
  get: {//作答成绩
    path: '/evaluation/answerMarkAnalysis',
    method: 'get'
  },
  getAnalysis: {//测评试卷分析
    path: '/evaluation/getAnalysis',
    method: 'get'
  },
  queryMarkList: {//查看已批改/未批改作业
    path: '/historyWork/queryMarkList',
    method: 'get'
  },
  accessTo:{//催交
    path: '/evaluation/urgeEvaluation',
    method: 'get'
  },
  queryNoSubmit: {//查询未提交作业人员
    path: '/historyWork/queryNoSubmit',
    method: 'get'
  },
  urgeWork: {//催交作业
    path: '/historyWork/urgeWork',
    method: 'get'
  },
  urgeTest:{
    path: '/evaluation/urgeEvaluation',
    method: 'get'
  },
  urgeAllWork: {//催交所有人作业
    path: '/historyWork/urgeAllWork',
    method: 'get'
  },
  urgeAllEvaluation:{
    path: '/evaluation/urgeAllEvaluation',
    method: 'get'
  },
  getAnswerAnalysisInfo: {//作答分析详情
    path: '/evaluation/getAnswerAnalysisInfo',
    method: 'get'
  },
  getCorrect: {//作答分析详情
    path: '/evaluation/getCorrect',
    method: 'get'
  },
  //老师批改测评(主观题批改)
  correctEvaluation:{
    path: '/evaluation/correct',
    method: 'put'
  },
  correctWork:{
    path:'historyWork/correcting',
    method: 'put'
  },
  //添加 添加 易错/难题库
  add:{
    path: '/questions/library/add',
    method: 'post'
  },
  outofQuestion:{//试题纠错(错题反馈)
    path: '/outofQuestion/add',
    method: 'post'
  },
  workAdd: {// 布置作业
    path: 'work/add',
    method: 'post'
  },
  releaseAdd: {// 发布测评
    path: 'papers/release',
    method: 'post'
  },
  papersTemplateAdd: {// 添加组卷模板
    path: 'papersTemplate/add',
    method: 'post'
  },
  preview: {// 试卷预览(智能组卷)
    path: 'papers/preview',
    method: 'post'
  },
  // 所有试题
  questionsList: {
    path: 'papers/questions/query',
    method: 'get'
  },
  // 获取组卷模板
  getPapersTemplate: {
    path: 'papersTemplate/get',
    method: 'get'
  },
  // 根据教材信息查询知识点
  queryKnowledgeList: {
    path: '/textbookContent/queryKnowledgeList',
    method: 'get'
  },
  // 根据教材信息查询知识点
  queryChapterList: {
    path: '/textbookContent/queryChapterList',
    method: 'get'
  },
  getUserWorkInfo:{//个人详情（作业，批改未批改，正确与否）
    path: '/work/getUserWorkInfo',
    method: 'get'
  },
  getUserEvaluationInfo:{//个人详情（测评，批改未批改，正确与否）
    path: '/papers/getUserEvaluationInfo',
    method: 'get'
  },
  joinQuestion:{
    path:'questions/library/add',
    method:'post'
  },
  // 所有题型
  questionsType: '/questionsType/query-all',
  chapter: 'textbookContent/queryChapterList',
  knowledge: 'textbookContent/queryKnowledgeListByChapter',
  questions: 'papers/questions/group' // 查询试题数量（智能组卷）
}

export default api

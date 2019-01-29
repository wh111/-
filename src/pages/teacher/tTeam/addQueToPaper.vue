<!--
****--@file     addQueToPaper
****--@date     2017/12/7 16:58
****--@author   YC
****--@describe 添加试题到试卷
-->
<template>
    <div class="selectPapersBox">
        <subject-head @change="changeHeader" :hasAll="true" :selectItems="selectItems" notShowCharpter="true" showSubject="true"
                      :disSel="['subject']"></subject-head>
        <div>
            <div class="selectPapersItem">
                <!-- 搜索 -->
                <div>
                    <flexbox>
                        <flexbox-item :span="6">题型</flexbox-item>
                        <div>  <select style="width: 1rem;background: #fff"  v-model="selectFormValidate.questionsTypeId" clearable placeholder="请选择"
                                       @change="getQuestionsList" :disabled="questionsTypeId !== undefined">
                            <option label="全部" value=""></option>
                            <option v-for="(item,index) in questionsType" :key="index" :label="item.name"
                                       :value="item.id"></option>
                        </select></div>
                    </flexbox>
                </div>
                <div style="height: 0.2rem;background: #DEEAE1"></div>
                <!-- 题目 -->
                <div class="papersSelectBox overShow" style="background: #DEEAE1;padding-left: 0.15rem">
                    <template v-if="questionSelectArr.length">
                        <template v-for="(item,index) in questionSelectArr">
                            <question-show :key="index" :index="index+1"
                                           :showData="item" :show-answer="true" :showScore="true" class="questionItem"
                                           :has-do="0.7">
                                <template slot="todoBox">
                                    <button class="greenButton" style="width: 50px;background: #1cc03b;color: #fff;border-radius: 0.05rem;border: none;font-size: 12px;margin-top: 0.1rem;margin-right: 0.2rem;height: 0.3rem;line-height: 0.3rem"  mini  size="small" @click="add(item)"
                                               :disabled="hasThisQuestion(item)">
                                        {{ btnStr }}
                                    </button>
                                </template>
                            </question-show>
                        </template>
                    </template>
                    <p class="noDataTips" v-else>暂无试题可选择</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .selectPapersBox {
        .overShow {
            overflow: auto;
            height: 3.65rem;
            width: 100%;
        }
        .selectPapersItem {
            margin-top: 0.16rem;
        }
        .questionItem {
            margin-bottom: 0.2rem;
        }
        .noDataTips {
            line-height: 3.4rem;
            text-align: center;
        }
    }
</style>
<script>
  /*当前组件必要引入*/
  import api from './api'
  // import {projectDiffLevels} from '../../../../libs/projectDiffLevel'
  import questionDiffLevelOption from '../../../components/questionDiffLevelOption' // 难度组件
  import subjectHead from '../../../components/subjectHead.vue'

  import questionShow from '../../../components/questionShow/show'

  //当前组件引入全局的util
  let Util = null
  export default {
    props: ['selectItems', 'btnText', 'questionsTypeId', 'selectedIds'],
    data () {
      return {
        totalCount: 0,
        // projectDiffLevels,
        questionSelectArr: [],
        self: this,
        questionsType: {}, // 题型
        headerSelectObj: {}, // 缓存选择的数据
        questionDiffMap: {}, // 试题难度区间
        allChapter: {}, // 缓存章节
        chapterList: null, // 当前章节
        knowledgeList: {}, // 知识点
        formValidate: {
          textbookVersionId: '', // 版本
          subject: '', // 科目
          grade: '', // 年级
          term: '0', // 学期
          stage: '', // 阶段
          chapter: '', // 章节
        },
        // 第二步表单
        selectFormValidate: {
          questionsTypeId: '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '' // 知识点
        },
        searchObj: {},

        btnStr: this.btnText || '添加',

        disSelectIds: this.selectedIds || [], // 不允许选择的id
        num:1,
        // 接口
        // api: {
        //     chapter: 'textbookContent/queryChapterList', // 章节
        //     knowledge: 'textbookContent/queryKnowledgeListByChapter', // 知识点
        //     questionsType: 'questionsType/query-all' //题型,
        // }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        console.log(this.$store.state)
        Util = this.$util
        this.questionDiffMap = this.$store.state.envs.questionDiffMap
        this.initPages()
        // 获取题型
        this.getQuestionsType()
        console.log(this.disSelectIds)
      },
      hasThisQuestion (item) {
        let tag = false
        if (item.groups) {
          tag = !!~this.disSelectIds.indexOf(item.childQuestionsList[0].id)
        } else {
          tag = !!~this.disSelectIds.indexOf(item.id)
        }
        return tag
      },
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData () {
        console.log(this.searchObj)
        if(!this.searchObj.chapterId){
          return false
        }
        Object.assign(this.queryQptions.params, this.searchObj);
        console.log( 1)
        let opt = {
          ajaxSuccess: (data1,res) => {
            let data = []
            if (res.data.dataList instanceof Array) {
              data = res.data.dataList
            }
            this.questionSelectArr = data
            this.totalCount = res.data.totalCount
          },

          url: api.questionsList.path,
          params: this.queryQptions.params,
        }
        this.ajax(opt)
      },
      // 初始化分页
      initPages () {
        this.queryQptions = {
          url: api.questionsList.path,
          params: {curPage: this.num, pageSize: 10}
        }
      },
      // 初始化题目筛选
      initSelectFormValidate () {
        if (this.questionsTypeId) {
          this.selectFormValidate.questionsTypeId = Number(this.questionsTypeId)
        } else {
          this.selectFormValidate.questionsTypeId = '' // 题型
        }
        // this.selectFormValidate.diffLevelCode = ''// 难度
        // this.selectFormValidate.knowledgeId = ''// 知识点
      },
      // 改变获取题目
      getQuestionsList () {

        let {grade, subject, term, chapter: chapterId = ''} = this.formValidate
        let {questionsTypeId, knowledgeId, diffLevelCode} = this.selectFormValidate

        // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
        // let dif = ['', ''];
        // if (difMap) {
        //     dif = difMap.split(',')
        // }
        //
        // let diffLevelSmall = dif[0];
        // let diffLevelBig = dif[1];
         console.log(1,chapterId)
        subject = this.headerSelectObj.subject.code
        if(!chapterId){
          return false
        }
        this.searchObj = {
          grade,
          subject,
          term,
          chapterId,
          questionsTypeId,
          knowledgeId,
          diffLevelCode /*diffLevelSmall, diffLevelBig*/
        }

        this.setTableData()
      },
      //筛选
      changeHeader (obj, select) {
        select=_.defaultsDeep({}, select);
        if(select.chapter){
          select.chapter=select.chapter.toString()
        }
        for (let key in obj) {
          this.formValidate[key] = select[key]
        }
        console.log(this.formValidate)
        this.selectFormValidate.diffLevelCode = select.diffLevelCode
        this.selectFormValidate.knowledgeId = select.knowledge
        this.formValidate.textbookVersionId = select.textbookVersion
        this.headerSelectObj = obj
        this.changeMoudle()
      },
      // 改变学期或者章节
      changeMoudle (key, val) {
        if (key) {
          this.formValidate[key] = val
        }
        console.log(key)
        if (key == 'term') {
          // 获取章节
          this.getChapterDataForServer()
        } else {
          this.initSelectFormValidate()
          // 知识点
          this.getKnowledgeDataForServer()
        }
        // 获取题目
        this.getQuestionsList()
      },
      // 获取试题
      getQuestion () {
        let opt = {}
      },
      /******************************* 数据获取 ****************************/
      // 获取知识点
      getKnowledgeDataForServer () {
        if (!this.formValidate.chapter) {
          this.knowledgeList = null
          this.questionSelectArr = []
          return
        }
        this.getDataForServer('knowledge', {chapterIds: this.formValidate.chapter}, (data, res) => {
          this.knowledgeList = data
        })
      },
      // 获取题型
      getQuestionsType () {
        this.getDataForServer('questionsType', {type: 0}, obj => this.questionsType = obj)
      },
      // 获取章节
      getChapterDataForServer () {
        this.formValidate.chapter = ''
        let {textbookVersionId, grade, term, subject} = this.formValidate
        // 教材、年级、学期、科目缺一不可
        if (!textbookVersionId || !grade || term === '' || !subject) {
          this.chapterList = null
          return
        }

        let chapterId = ''

        // 缓存数据
        let cacheKey = [textbookVersionId, grade, term, subject]
        let cacheData = this.allChapter[cacheKey.join('-')]
        if (cacheData) {
          this.chapterList = this.$util.getFormData(cacheData) // 读取缓存
          for (let key in this.chapterList) {
            chapterId = key
            break
          }
          this.changeMoudle('chapter', '')
        } else {
          // 获取数据并缓存
          this.getDataForServer('chapter', {
            textbookVersionId,
            grade,
            subject: this.headerSelectObj.subject.code,
            term
          }, (data, res) => {
            this.chapterList = data
            this.allChapter[cacheKey.join('-')] = data
            // chapterId = res.data.length && res.data[0].id || ''
            this.changeMoudle('chapter', '')
          })
        }
      },
      // 从服务器获取选择数据
      getDataForServer (type, params, call, isObj = true) {
        console.log("mmm")
        let opt = {
          ajaxSuccess: (data1,res) => {
            let data = {}
            if (isObj && res.data instanceof Array && res.data.length) {
              res.data.map(item => data[item.id] = item)
            } else {
              data = null
            }
            call && call(data, res)
          },

          url: api[type],
          params
        }
        this.ajax(opt)
      },
      add (item) {
        this.$emit('add', item)
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch: {
      selectedIds () {
        this.disSelectIds = this.selectedIds || []
      },
      '$route' (to, from) {
        console.log(to,from)
        this.$router.go(1)
      }
    },
    components: {
      subjectHead,
      questionDiffLevelOption,
      questionShow
    }
  }

</script>

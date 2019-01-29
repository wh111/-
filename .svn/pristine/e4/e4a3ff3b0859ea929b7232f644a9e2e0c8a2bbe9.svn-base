<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/25
****--@author   zzh
----------------------------------->
<template>
    <div class="appraisal_math_open_start">
        <header-title>
            <slot>测评分析</slot>
        </header-title>
        <div class="stance"></div>
        <!--<flexbox class="math_header">-->
        <!--<flexbox-item align="center">测评结果</flexbox-item>-->
        <!--</flexbox>-->
        <div class="vux-circle-demo">
            <div>
                <div>得分<span>{{answerResult.totalScore / 100||0}}分</span></div>
                <div>用时<span>{{answerResult.useTime / 1000 | formatTimes}}</span></div>
            </div>
            <div style='width:0.75rem;height:0.75rem;'>
                <x-circle :percent="80" :stroke-width="8" :trail-width="6" :stroke-color="['#11A640', '#11A640']"
                          trail-color="#E5E5E5">
                    <span :style="{color: strokeColor2}"
                          style="font-size: 0.2rem">{{Number(((answerResult.answerTrueNum / answerResult.questionsCount) * 100).toFixed(1))}}%</span>
                </x-circle>
            </div>
            <div>
                <div><span>{{answerResult.answerTrueNum}}道</span>答对</div>
                <div><span>{{answerResult.answerFalseNum}}</span>答错</div>
            </div>
        </div>
        <div class="progress_book">
            <flexbox justify="space-between" style="box-sizing: border-box;padding: 0 0.15rem" align="center">
                <flexbox-item :span="4">
                    <div class="flex-demo">能力值</div>
                </flexbox-item>
                <x-progress class="appraisal_press" :percent="Number(answerResult.ability)" :show-cancel="false"
                            style="width: 100%;"></x-progress>
                <flexbox-item :span="2" align="right">
                    <div class="flex-demo">{{Number(answerResult.ability)}}%</div>
                </flexbox-item>
            </flexbox>
            <flexbox justify="space-between" style="box-sizing: border-box;padding: 0 0.15rem" align="center">
                <flexbox-item :span="4">
                    <div class="flex-demo">学习进度</div>
                </flexbox-item>
                <x-progress class="appraisal_press" :percent="Number(answerResult.studyProgress)" :show-cancel="false"
                            style="width: 100%;"></x-progress>
                <flexbox-item :span="2" align="right">
                    <div class="flex-demo">{{Number(answerResult.studyProgress)}}%</div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="math_footer">做题详情</div>
        <ul class="knowledge" >
            <li v-for="(item,index) in answerResult.knowledgeList" :key="index">
                <div>
                    <p>{{item.knowledgeName}}：</p>
                    <div style="float: left;margin-top: 0.1rem" v-for="(child,ind) in item.stuAnswerInfo" :key="ind" @click="open(child)">
                        <div class="item-div" :class="child.answerResult == true ? 'green' : 'red' ">
                            {{child.questionsSeq}}
                        </div>
                    </div>

                </div>

            </li>
        </ul>
        <div class="math_footer">测评分析</div>
        <div style="box-sizing: border-box;padding: 0.15rem;color: #7B7B7B">
            {{ answerResult.determineResult }}
        </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'
let Util = null
// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      percent1: 20,
      percent2: 75,
      strokeColor2: '#1B1B1B',
      typeId: this.$route.query.id,
      loading: false,
      tableData: [],
      answerResult: {totalScore:0},
      gamesAnswerId: '',
      api: {
        url: '/autoAssessment/getAnswerResult',
        method: 'get'
      },
      getApi: {
        url: '/assessment/getAllAnswerQuestion',
        method: 'get'
      },
      isFirst: ''

    }
  },
  methods: {
    // 初始化请求列表数据
    // 初始化请求列表数据
    init () {
      Util = this.$util
      let bind = this.$route.query.bind
      if (bind) {
        this.bindAnswerResult()
      } else {
        this.getAnswerResult()
      }
    },
    bindAnswerResult () {
      let opt = {
        ajaxSuccess: (data, res) => this.getDataSuccess(res),
        ajaxParams: {
          url: '/autoAssessment/login/query',
          params: {
            assessmentAutoId: this.$route.query.id
          }
        }
      }
      this.ajax(opt)
    },
    getAnswerResult () {
      let opt = {
        ajaxSuccess: (data, res) => this.getDataSuccess(res),

        url: this.api.url,
        method: this.api.method,
        params: {
          id: this.$route.query.id

        }
      }
      this.ajax(opt)
    },
    getDataSuccess (res) {
      this.answerResult = res.data
    },
    objectSpanMethod ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    /**
       * 回调函数
       * **/
    subCallback () {

    },
    /**
       * 回调函数
       * **/
    cancel () {

    },
    open (item) {
      this.$router.push({name: 'selfTestResult',
//        params: {grade: this.$route.query.grade, subject: this.$route.query.subject, textbookVersionId: this.$route.query.textbookVersionId, isFirstAssessment: 2},
        query: {id:this.$route.query.id,seq:item.questionsSeq,type:'2'}})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
    @import '../../../css/appraisal/appraisal_math_open_start';
</style>

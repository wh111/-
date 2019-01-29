<!--
****--@file     selfTestResult
****--@date     2018/6/1 14:58
****--@author   ${王恒}
****--@describe   自适应测评结果
-->
<template>
    <div class="selfTestResult-root">
        <topic-alert v-if="questionList.length" :questionList="questionList" :questionsId="questionData.id"
                     @next="getAnswerQuestion"></topic-alert>
        <div class="selfTestResult-root-questionBank">
            <div class="question_header">
                <!--<p class="p"> {{viewData.studentName}}<span style="float: right">{{viewData.totalScore}}分</span></p>-->
                <h3 class="question_header_num" style="">第{{seq}}题 <span class="question_header_have" style="">还有<span class="question_header_queNum" style="">{{(data.length-seq)}}</span>题 </span></h3>
                <p class="questionsTypeName">题型  <span class="questionsTypeNameSpan">{{questionData.questionsTypeName}}</span></p>
            </div>
            <!--<p class="questionType">题型 <span class="yellowColor">{{questionData.questionsTypeName}}</span></p>-->
            <scroller  :height="top"  lock-y :scrollbar-x=false @on-scroll="getNext" v-if="questionData">
                <div ref="scroller">
                    <question-show :show-data="questionData" :showInput=false :showAnswer=true></question-show>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from '../api'
  import questionShow from '../../../../components/questionShow/show.vue'
  import topicAlert from '../../commonality/topicAlert.vue'

  export default {
    data () {
      return {
        questionList: [],
        questionData: {id: ''},
        seq: this.$route.query.seq,
        timer: null,
        temp: true,
        data: [],
        postion: 0,
        top:'0',
        tempItem:0,
      }
    },
    methods: {
      getAnswerQuestion (seq) {
        this.seq = seq
        this.questionData = this.data[this.seq - 1]
      },
      getNext (val) {
        if(Math.abs(val.left)<Math.abs(val.top)){
          this.tempItem+=2;
          return
        }else if(Math.abs(val.left)>Math.abs(val.top)){
          this.tempItem=1;
        }
        if (val.left > 0) {
          this.poition = 1
        } else if (val.left < 0) {
          this.poition = -1
        }else if(this.tempItem==0||this.tempItem==1){
          this.tempItem=0;
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            let value = this.seq + this.poition
            if (value < 1 || value > this.data.length) {
              return
            }
            console.log(this.seq)
            this.seq = value
            this.questionData = this.data[this.seq - 1]

          }, 200)
        }


      },
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.getAllAnswerQuestion()//获取试题详情
      },
      getAllAnswerQuestion () {
        let params = {}
        if (this.$route.query.testType == 'shop') {
          params = {
            papersId: this.$route.query.papersId,
            productId: this.$route.query.productId,
            testType: this.$route.query.testType
          }

        } else {
          params = {assessmentAutoId: this.$route.query.id}
        }
        let opt = {
          ajaxSuccess: (data, res) => {
            let num = 1
            data.map((item, index) => {
              if (item.childQuestionsList) {
                item.childQuestionsList.map((item2) => {

                  this.questionList.push({
                    seq: num,
                    questionsTypeName: item.questionsTypeName,
                    isAnswer: true,
                    answerResult: item2.answerResult
                  })
                  let opt = this.$util._.defaultsDeep({}, item)
                  opt.childQuestionsList = [item2]
                  this.data.push(opt)
                  num++
                })
              } else {
                this.questionList.push({
                  seq: num,
                  questionsTypeName: item.questionsTypeName,
                  isAnswer: true,
                  answerResult: item.answerResult
                })
                this.data.push(item)
                num++
              }

            })
            console.log(this.questionList)
            this.questionData = this.data[this.seq - 1]
            console.log(this.questionData)
          },
          url: this.$route.query.testType == 'shop' ? api.getShopAnswer.path : api.getAllAnswerQuestion.path,
          params: params
        }
        this.ajax(opt)
      }
    },
    created () {
      this.init()
    },
    mounted () {
      this.top=-this.$refs.scroller.offsetTop+''
    },
    components: {topicAlert, questionShow}
  }

</script>
<style lang="scss">
    .selfTestResult-root {
        background: #DEEAE1;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 5.45rem;
        .selfTestResult-root-questionBank {
            padding: 0 0.15rem;
        }
        .question_header {
           margin-top: 0.15rem;
            margin-bottom: 0.1rem;
        }
        .questionType {
            font-size: 0.11rem;
            color: #707070;
        }
        .titleMessage{
          .small{
              font-size: 0.11rem;
              float: right;
              color: #707070;
          }
        }
        .yellowColor {
            color: #EC6941;
            font-size: 0.11rem;
            font-weight: bold;
            padding: 0 0.02rem
        }
    }
</style>

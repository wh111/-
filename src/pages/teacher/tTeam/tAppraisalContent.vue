<!----------------------------------
****--@name     tAppraisalContent
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div class="tAppraisalContent-root">
        <header-title>{{$route.query.title}}</header-title>
        <div class="stance"></div>
        <div class="tAppraisalContent">
            <!--<div style="text-align: right">-->
                <!--<x-button @click.native="join(1)" mini style="margin-right: 0.03rem">易错题</x-button>-->
                <!--<x-button @click.native="join(2)" mini>难题</x-button>-->
            <!--</div>-->
            <div class="question_header">
                 <div class="showScore">
                     <section class="h1">
                         <span v-if="questionData.childQuestionsList">
                             {{questionData.childQuestionsList[0].studentScore}}
                         </span>
                         <span v-else>
                             {{questionData.studentScore}}
                         </span>
                     </section>
                    <section class="p">得分</section>

                 </div>
                <!--<p class="p"> {{viewData.studentName}}<span style="float: right">{{viewData.totalScore}}分</span></p>-->
                <h3  class="question_header_num" style="margin-top: 0;padding-top: 0.1rem">第{{seq}}题 </h3>
                <p class="questionsTypeName">题型  <span
                        class="questionsTypeNameSpan">{{questionData.questionsTypeName}}</span> <span  @click="join(1)" style="margin-left: 0.5rem;color: #88abda"
                        class="questionsTypeName"><img class="imgItem" style="color: #88abda" src="../../../assets/image/join1.jpg"/> 加入易错题</span>
                    <span @click="join(2)" class="questionsTypeName" style="color: #13b5b1;margin-left: 0.1rem"> <img class="imgItem" style=" "
                                                          src="../../../assets/image/join2.jpg"/>加入难题</span></p>
            </div>
            <div ref="scroller">
                <scroller lock-y :scrollbar-x=false @on-scroll="getNext" v-if="questionData" :height="top">
                    <div>
                        <question-show v-if="$route.query.showType!='toCorrect'" :index="seq" :show-data="questionData"
                                       :showInput=false :showAnswer=true>
                            <!--<template v-if="questionData.childQuestionsList">-->
                                <!--<template v-for="(itemChild,index) in questionData.childQuestionsList"-->
                                          <!--:slot="'answerRight'+itemChild.id">-->
                                    <!--<template v-if="!['Answer','Input'].includes(itemChild.basicType)">-->
                                        <!--<span style="margin-right: 0.1rem">难度：{{itemChild.diffLevel}} </span>-->
                                        <!--{{itemChild.studentScore}} / {{itemChild.score}}分-->
                                    <!--</template>-->
                                    <!--<template v-else>-->
                                        <!--<div :key="itemChild.id">-->
                                            <!--<span style="margin-right: 0.1rem">难度：{{itemChild.diffLevel}} </span>-->
                                            <!--{{itemChild.studentScore}}-->
                                            <!--<span style="color:#fd7416;"> / {{itemChild.score}}</span>-->
                                        <!--</div>-->
                                    <!--</template>-->
                                <!--</template>-->

                            <!--</template>-->
                            <!--<template v-else slot="answerRight">-->
                                <!--<template v-if="!['Answer','Input'].includes(questionData.basicType)">-->
                                    <!--<span style="margin-right: 0.1rem">难度：{{questionData.diffLevel}} </span>-->
                                    <!--{{questionData.studentScore}} / {{questionData.score}}分-->
                                <!--</template>-->
                                <!--<template v-else>-->
                                    <!--<span style="margin-right: 0.1rem">难度：{{questionData.diffLevel}} </span>-->
                                    <!--{{questionData.studentScore}}-->
                                    <!--<span style="color:#fd7416;">/  {{questionData.score}}</span>-->
                                <!--</template>-->
                            <!--</template>-->
                        </question-show>
                        <div v-else>
                            <question-show
                                    :showData="questionData"
                                    :showScore="true"
                                    :show-answer="true"
                                    answerDo="7"
                                    :index="seq"
                            >
                                <template v-if="questionData.childQuestionsList">

                                    <template v-for="(itemChild,index) in questionData.childQuestionsList"
                                              :slot="'answerRight'+itemChild.id">
                                        <template v-if="!['Answer','Input'].includes(itemChild.basicType)">
                                            <!--<span style="margin-right: 0.1rem">难度：{{itemChild.diffLevel}} </span>-->
                                            <!--{{itemChild.studentScore}} / {{itemChild.score}}分-->
                                        </template>
                                        <template v-else>
                                            <div :key="itemChild.id">
                                                <!--<span style="margin-right: 0.1rem">难度：{{itemChild.diffLevel}} </span>-->
                                                <!--<input style="width: 22%" v-model="itemChild.studentScore" slot="todoBox"-->
                                                <!--type="number"/>-->
                                                <!--<span style="color:#fd7416;"> / {{itemChild.score}}</span>-->
                                                <x-button class="greenButton correctButton" mini
                                                          @click.native="inputShow(itemChild,seq-1,'child',index)">打分
                                                </x-button>
                                            </div>
                                        </template>
                                    </template>

                                </template>
                                <template v-else slot="answerRight">
                                    <template v-if="!['Answer','Input'].includes(questionData.basicType)">
                                        <!--<span style="margin-right: 0.1rem">难度：{{questionData.diffLevel}} </span>-->
                                        <!--{{questionData.studentScore}} / {{questionData.score}}分-->
                                    </template>
                                    <template v-else>
                                        <!--<span style="margin-right: 0.1rem">难度：{{questionData.diffLevel}} </span>-->
                                        <!--<input style="width: 22%" v-model="questionData.studentScore" slot="todoBox" type="number"/>-->
                                        <!--<span style="color:#fd7416;">/  {{questionData.score}}</span>-->
                                        <x-button class="greenButton correctButton" mini
                                                  @click.native="inputShow(questionData,seq-1,'noChild')">打分
                                        </x-button>
                                    </template>
                                </template>

                            </question-show>
                            <div style="text-align: center">
                                <x-button class="yellowButton" style="margin-top: 0.1rem" @click.native="allComplete">
                                    批改完成
                                </x-button>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
            <alert v-model="show">{{message}}</alert>
            <confirm v-model="confirmShow"
                     @on-confirm="onConfirm">
                {{message}}

            </confirm>
            <confirm v-model="correctShow" title="请输入分数"
                     @on-confirm="onConfirmCorrect">
                <p style="font-size: 0.12rem">该题满分 {{scoreData.score}}分 </p>
                <input style="border: none; width:1.25rem;border-bottom: 0.01rem solid #D2D2D2 "
                       v-model="score"></input>
            </confirm>
        </div>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import headerTitle from '../header'
  // 当前组件引入全局的util
  // let Util = null
  /*当前组件必要引入*/
  let Util = null
  import api from './api'
  import questionShow from '../../../components/questionShow/show.vue'

  export default {
    data () {
      return {
        type: '',
        scoreData: {},
        parentSeq: '',
        childrenSeq: '',
        correctShow: false,
        score: '',
        top: '0',
        confirmShow: false,
        show: false,
        message: '',
        questionList: [],
        questionData: {id: ''},
        seq: this.$route.query.seq,
        timer: null,
        temp: true,
        data: [],
        postion: 0,
        viewData: {},
        tempItem:0,
      }
    },
    methods: {
      onConfirmCorrect () {
        this.scoreData.studentScore = this.score;
        this.score=''
        this.type == 'noChild' ? this.correct(this.scoreData, this.parentSeq, this.type) : this.correct(this.scoreData, this.parentSeq, this.type, this.childrenSeq)
      },
      inputShow (data, parentSeq, type, childSeq) {
        this.correctShow = true
        this.scoreData = data
        this.parentSeq = parentSeq
        this.type = type
        this.childrenSeq = childSeq ;
      },
      onConfirm () {
        this.$router.push({name: 'tNone', query: this.$route.query})
      },
      allComplete () {//全部批改
        let temp = true
        console.log(this.viewData.questionsList)
        this.viewData.questionsList.map((item) => {
          console.log(item.groups)
          if (item.childQuestionsList) {
            item.childQuestionsList.map((childItem) => {
              if (!childItem.isCorrecting && ['Input', 'Answer'].includes(childItem.basicType)) {
                this.show = true
                this.message = '还有未批改的题，请批改完成点击提交'
                temp = false
                return false
              }
            })
          } else {
            if (!item.isCorrecting && ['Input', 'Answer'].includes(item.basicType)) {
              this.show = true
              this.message = '还有未批改的题，请批改完成点击提交'
              temp = false
              return false
            }
          }
        })
        if (!temp) {
          return false
        }
        let opt = {}
        if (this.$route.query.type == 'homework') {
          opt = {
            workId: this.$route.query.id,
            studentId: this.$route.query.studentId,
            groupsId: this.$route.query.groupsId
          }
        } else {
          opt = {
            papersId: this.$route.query.id,
            studentId: this.$route.query.studentId,
          }
        }
        this.ajax({
          ajaxSuccess: () => {
            this.confirmShow = true;
            this.message='批改完成'

          },

          url:this.$route.query.type=='homework'?api.finished.path:api.finishedTest.path,
          method: api.finishedTest.method,
          data: opt,

        })
      },
      correct (val, index, type, childrenIndex) {//

        let questionData = {
          workId: this.$route.query.id,
          studentId: this.$route.query.studentId,
          groupsId: this.$route.query.groupsId,
          questionsId: val.id,
          score: val.studentScore
        }
        if (this.$route.query.type != 'homework') {
          questionData = {
            paperId: this.$route.query.id,
            studentId: this.$route.query.studentId,
            groupsId: this.$route.query.groupsId,
            questionsId: val.id,
            score: val.studentScore
          }
        }
        if (val.studentScore > val.score || val.studentScore < 0 || val.studentScore === '') {
          this.show = true
          this.message = '请输入正确分值'
          return false
        }
        let opt = Object.assign({}, questionData)
        this.ajax({
          ajaxSuccess: (res) => {
            console.log(index,typeof(childrenIndex)!='undefined',childrenIndex )
            this.show = true
            this.message = '批改成功'
            if (typeof (childrenIndex)!= 'undefined') {
              this.viewData.totalScore += (Number(val.studentScore) - Number(this.viewData.questionsList[index].childQuestionsList[childrenIndex].middle))
              this.viewData.questionsList[index].childQuestionsList[childrenIndex].middle = val.studentScore
              this.viewData.questionsList[index].childQuestionsList[childrenIndex].isCorrecting = true

            } else {
              this.viewData.totalScore += (Number(val.studentScore) - Number(this.viewData.questionsList[index].middle))
              this.viewData.questionsList[index].middle = val.studentScore
              this.viewData.questionsList[index].isCorrecting = true
            }
          },

          url: this.$route.query.type != 'homework' ? api.correctEvaluation.path : api.correctWork.path,
          method: api.correctEvaluation.method,
          data: opt,

        })
      },
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
        } else if(this.tempItem==0||this.tempItem==1){
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
//      getAnswerResult () {
//        let opt = {
//          ajaxSuccess: (data, res) => {
//            this.setData(data);//获取题号
//          },
//          url: '/autoAssessment/getAnswerResult',
//          params: {
//            id: this.$route.query.id
//
//          }
//        }
//        this.ajax(opt)
//      },
//      setData(data){
//        console.log(data)
////        data.knowledgeList.map((item)=>{
////          this.questionList=this.questionList.concat(item.stuAnswerInfo)
////          console.log(item.stuAnswerInfo)
////        })
//        this.questionList.map((item,index)=>{
////          item.questionsTypeName=
//        })
//      },
      getAllAnswerQuestion () {
        if (this.$route.query.type == 'homework') {
          var params = {
            studentId: this.$route.query.studentId,
            workId: this.$route.query.id
          }
        } else {
          var params = {
            studentId: this.$route.query.studentId,
            id: this.$route.query.id
          }
        }

        let opt = {
          ajaxSuccess: (data, res) => {
            let tempList=this.$util._.defaultsDeep({},data);
            let temp=[];
            data.questionsList.map((item,index)=>{
               if(item.childQuestionsList){

                 item.childQuestionsList.map((item2,index1)=>{
                   let tempListSmall=this.$util._.defaultsDeep({},item);
                   console.log(tempListSmall)
                   tempListSmall.childQuestionsList[0]=tempListSmall.childQuestionsList[index1];
                   tempListSmall.childQuestionsList.length=1;
                   temp.push( tempListSmall)
                 })
               }else{
                 temp.push(item)
               }
            })
            this.viewData = res.data;
            this.viewData.questionsList=temp;
            this.viewData.questionsList.map((item, index) => {
              item.middle = item.studentScore
              if (item.childQuestionsList) {
                item.childQuestionsList.map((itemChildren) => {
                  itemChildren.middle = itemChildren.studentScore
                })
              }
              // this.viewData.questionsList.map((item) => {item.middle = (item.studentScore || 0)})
            })

            this.data = temp
            this.questionData = this.data[this.seq - 1]
          },
          url: this.$route.query.type == 'homework' ? api.getWorkInfo.path : api.getPaperInfo.path,
          params: params,
        }
        this.ajax(opt)
      },
      join (val) {
        let opt = {
          ajaxSuccess: (data, res) => {
            this.message = (val == 1 ? '添加易错题成功' : '添加难题成功')
            this.show = true
          },
          url: api.joinQuestion.path,
          method: api.joinQuestion.method,
          data: {
            questionsId: this.questionData.id,
            questionsLibraryType: val,
            source: this.$route.query.type == 'homework' ? 5 : 4,
            busId: this.$route.query.id,
          },
        }
        this.ajax(opt)
      }
    },
    created () {
      this.init()
    },
    mounted () {
      this.top = -this.$refs.scroller.offsetTop + ''
    },
    components: {questionShow, headerTitle}
  }
</script>
<style lang="scss">
    .tAppraisalContent {
        background: #ebebeb;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.15rem;
        padding-top: 0rem;
        min-height: 6.2rem;
        .imgItem {
            width: 0.12rem;
            position: relative
        }
        .showScore{
            float: right;
            width: 0.62rem;
            height:0.48rem;
            border: 0.01rem solid #1AAD19;
            border-radius: 0.03rem;
            overflow: hidden;
            text-align: center;
            margin-top: 0.05rem;
            .h1{
               font-size: 0.18rem;
                font-weight: normal;
                color: #fff;
                height: 0.28rem;
                line-height: 0.28rem;
                background:  #1AAD19;
                margin: 0;
                padding: 0;
            }
            .p{
                color:  #1AAD19;
                line-height: 0.2rem;
                font-size: 0.12rem;
            }
        }
    }

    .tAppraisalContent-root {
        .p {
            line-height: 0.3rem;
            padding: 0;
        }
    }
</style>

<!--
****--@file     questionDetail
****--@date     2018/5/29 14:01
****--@author   ${王恒}
****--@describe   我的错题，收藏，笔记详情
-->
<template>
    <div class="questionDetail-root">
        <header-title style="left: -0.15rem">
            <slot>
                <template v-if="type=='wrong'||type=='teaWrong'"> 易错题</template>
                <template v-else-if="type=='enjoy'">我的收藏 </template>
                <template v-else-if="type=='notes'">我的笔记</template>
                <template v-else-if="type=='teaDiff'">难题</template>
            </slot>
        </header-title>
        <div class="stance"></div>
        <div class="question-item-content" style="min-height: 6rem" >
            <question-show v-if="showQuestionData==true" :showData="questionData" :showAnswer="true"></question-show>
            <div v-if="type!='teaWrong'&&type!='teaDiff'">
            <span v-if="$route.query.type=='wrong'||$route.query.type=='enjoy'" class="addnode"
                  style="margin-top: 0.2rem" @click="show=true">添加笔记</span>
            <div v-else>
                <p style="margin-top: 0.2rem">我的笔记：<span class="addnode" @click="show=true">修改笔记</span></p>
                <div class="mynote">
                    <div style="min-height: 1.2rem;width: 100%;border: 1px solid #C2C2C2;">
                        {{questionData.childQuestionsList? questionData.childQuestionsList[0].questionsNotesResult.content:questionData.questionsNotesResult.content}}
                    </div>
                </div>
            </div>
            </div>
        </div>
        <confirm v-model="show" title="添加/修改笔记" @on-confirm="addNodemessage">
            <textarea v-model="addNode" style="height: 1.2rem;width: 90%;border: 1px solid #C2C2C2;"></textarea>
        </confirm>
        <alert v-model="messageShow" title="提示"> {{message}}</alert>
    </div>
</template>
<script>
  import HeaderTitle from '../header'
  import questionShow from '../../../components/questionShow/show.vue'
  import api from './api'
  /* 当前组件必要引入 */
  let Util = null
  export default {
    data () {
      return {
        questionData: {questionsNotesResult: {content: ''}},
        addNode: '',
        show: false,
        messageShow: false,
        message: '',
        type:'',
        showQuestionData:false
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        Util = this.$util;
        this.type=this.$route.query.type;
        this.getDetail()// 题目详情
      },
      addNodemessage () { // 添加笔记
        let options = {
          url: api.questionsNotesAdd.path,
          method: api.questionsNotesAdd.method,
          data: {
            questionsId:this.questionData.childQuestionsList?this.questionData.childQuestionsList[0].id:this.questionData.id,
            content: this.addNode,
            types: this.$route.query.types
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.messageShow = true
            if (this.$route.query.type == 'wrong' || this.$route.query.type == 'enjoy') {
              this.message = '添加笔记成功'
            } else {
              this.message = '修改笔记成功'
              this.questionData.childQuestionsList?this.questionData.childQuestionsList[0].questionsNotesResult.content:this.questionData.questionsNotesResult.content= this.addNode
            }
          }
        }
        console.log(options)
        this.ajax(options)
      },
      getDetail () {

        let url = ''
        if (this.$route.query.type == 'wrong') {
          url = api.questionsWrong.path
        } else if (this.$route.query.type == 'enjoy') {
          url = api.questionsFavorite.path
        } else if(this.$route.query.type=='notes') {
          url = api.questionsNotes.path
        } else {
          url=api.getQuestion.path
        }
        console.log(url)
        this.ajax({
          ajaxSuccess: (data, res) => {
            this.questionData = res.data
            this.showQuestionData=true;
            console.log(this.questionData,106 )

            //            this.isFavorite = !!res.data.isFavorite
            //            this.formValidate.isFavorite = res.data.isFavorite || 0
            //            this.formValidate.content = res.data.questionsNotesResult && res.data.questionsNotesResult.content || ''
            // Object.keys(this.formValidate).map(key => this.formValidate[key] = res.data[key])
          },
          url: url,
          params: {
            questionsId: this.$route.query.questionId,
            id: this.$route.query.tQuestionId,
            types: this.$route.query.types
          }

        })
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {HeaderTitle, questionShow}
  }

</script>
<style lang="scss">
    .questionDetail-root {
        .question-item-content {

            background: #DEEAE1;
            padding: 0.15rem;
        }
        .addnode {
            text-decoration: underline;
            color: #71be83;
            font-size: 0.16rem;
            float: right;

        }
        .mynote {
            border-radius: 5px;
            background-color: #f5f5f5;
            font-size: 14px;
            min-height: 1.2rem;
            margin-top: 0.1rem;
        }
    }
</style>

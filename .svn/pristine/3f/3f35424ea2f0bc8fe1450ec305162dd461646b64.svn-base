<!----------------------------------
****--@name     topicAlert
****--@role
****--@date     2018/5/6/006
****--@author   zzh
----------------------------------->
<template>
    <div class="topicAlert-root">
        <div class="tab_click">
            <div @click="change(1)">题版
                <div v-transfer-dom class="persistent">
                    <confirm v-model="show1" title="题版" @on-cancel="onCancel" :close-on-confirm="temp" @on-confirm="onConfirm" @on-show="onShow"
                             @on-hide="onHide">
                        <div style="max-height:3rem;overflow: auto" >
                        <div   v-for="(item,index) in data" :key="index">
                            <div class="recentPractice_last_title">{{item.name}}</div>
                            <div class="recentPractice_last_grid">
                                <div v-for="(item,index) in item.child" :key="index">
                                    <div class="grid-center defaultColor" v-if="!item.isAnswer" :class="skip==item.seq? 'active':''"  @click="open(item)">
                                        {{item.seq}}
                                    </div>
                                    <div  class="grid-center green" :class="skip==item.seq? 'active':''" v-else-if="(item.isAnswer&&item.answerResult)==true"  @click="open(item)">
                                        {{item.seq}}
                                    </div>
                                    <div class="grid-center red" :class="skip==item.seq? 'active':''" v-else  @click="open(item)">
                                        {{item.seq}}
                                    </div>

                                </div>
                                <div style="clear: both"></div>
                            </div>
                        </div>
                        </div>
                    </confirm>
                </div>
            </div>
            <div @click="change(2)" v-if="!$route.query.seeType">
                笔记
                <div v-transfer-dom class="recentPractice_last_note">
                    <confirm v-model="show" title="添加笔记" @on-cancel="onCancel" @on-confirm="addNodemessage" @on-show="onShow"
                             @on-hide="onHide">
                        <textarea v-model="addNode" style="height: 1.2rem;width: 90%;border: 1px solid #C2C2C2;"></textarea>
                    </confirm>
                </div>
            </div>
            <div @click="addEnjoy" v-if="!$route.query.seeType">收藏</div>
        </div>
        <alert v-model="messageShow" title="提示"> {{message}}</alert>
        <!--<div class="tab_content">-->
        <!--<div v-if="type==1">-->
        <!--<recent-practice-last></recent-practice-last>-->
        <!--</div>-->
        <!--<div v-if="type==2">笔记</div>-->
        <!--<div v-if="type==3">收藏</div>-->
        <!--</div>-->
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import api from './api'
  import RecentPracticeLast from '../home/recentPractice_last_question'
  // 当前组件引入全局的util
  let Util = null
  export default {
    props:['questionsId','questionList'],
    //来源类型：1试卷试题库/2自适应测评/3自选测评/4测评/5作业
    data () {
      return {
        show: false,
        show1: false,
        addNode:'',
        message:'',
        messageShow:false,
        data: [],
        skip: '',
        temp:false,
      }
    },
    methods: {
      addNodemessage(){//添加笔记
        let options = {
          url: api.questionsNotes.path,
          method:api.questionsNotes.method,
          data: {
            questionsId:this.questionsId,
            content:this.addNode,
            types:this.$route.query.type
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.messageShow=true;
            this.message='添加笔记成功';

          }
        }
        this.ajax(options)
      },
      addEnjoy(){
        let options = {
          url: api.questionsFavorite.path,
          method:api.questionsFavorite.method,
          params: {
            questionsId:this.questionsId,
            types:this.$route.query.type
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.messageShow=true;
            this.message='添加收藏成功';
          }
        }
        this.ajax(options)
      },
      // 初始化请求列表数据
      init () {
        if(this.$route.query.type==1){
          this.questionList.map((item)=>{
            item.questionsTypeName=item.type
          })
        }
         console.log(this.questionList)
        this.setData()
      },
      setData(){
        let arr=[];
        this.questionList.map((item)=>{
          if(arr.indexOf(item.questionsTypeName)==-1){
            arr.push(item.questionsTypeName);
            this.data.push({name:item.questionsTypeName,child:[item]});
           // this.data.push({name:item.questionsTypeName;value:1})

          }else {
            this.data.map((i)=>{
              if(i.name==item.questionsTypeName){
                i.child.push(item)
              }
            })

          }
        })
        console.log(this.data)
      },
      queryQuestionList () {
        let options = {
          url: api.queryPaperList.path,
          params: {
            papersId: this.$route.query.papersId,
            productId: this.$route.query.productId
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            this.data = data['dataList']

          }
        }
        this.ajax(options)
      },
      plan (type) {
        this.$router.push({name: type})
      },
      open (type) {
          if(!type.isAnswer&&this.$route.query.type==1){
             this.temp=false;
          }else{
            this.temp=true;
          }
          this.skip=type.seq

        // console.log(123)
      },
      change (type) {
        this.type = type
        if (type === 2) {
          this.show = true
        } else if (type === 1) {
          this.show1 = true
        }
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        // console.log('on confirm')
        this.$emit('next',this.skip);
        this.skip=''

      },
      onHide (type) {
//        type = this.skip
        // console.log('on hide13232')
        console.log(type)
//        if (type === 1) {
//          this.$router.push({name: 'recentPractice_next_question'})
//        } else if (type === 2) {
//          this.$router.push({name: 'sCompletion'})
//        } else if (type === 3) {
//          this.$router.push({name: 'sAsked'})
//        }
      },
      onShow () {
        console.log('on show')
      },
      onItemClick () {
        console.log('on item click')
      }
    },
    created () {
      this.init();
    },
    mounted () {},
    components: {
      RecentPracticeLast
    }
  }
</script>
<style lang="scss">
    @import '../../../css/home/recentPractice_last';
</style>

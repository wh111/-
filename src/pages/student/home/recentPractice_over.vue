<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
    <div class="recentPractice_over">
        <header-title>
            <slot>
                <template>{{$route.query.name}}</template>
            </slot>
        </header-title>
        <div class="stance"></div>
        <div v-for="(item,index) in data" :key="index" class="border">
            <div class="recentPractice_last_title">{{item.name}}</div>
            <div style="text-align: center">
            <div class="recentPractice_last_grid" >
                <section v-for="(item,index) in item.child" :key="index">
                    <div class="grid-center" :class="item.answerResult? '':'red'"  @click="open(item)">
                        <span>{{item.seq}}</span>
                    </div>
                </section>
            </div>
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import api from './api'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        typeList: [],
        dataList: null,
        data:[]
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        this.queryQuestionList()
      },
      open (val) {
        let query=Object.assign(this.$route.query,{seq:val.seq,testType:'shop'})
        this.$router.push({name:'selfTestResult',query:query})
      },
      queryQuestionList () {
        let options = {
          url: api.queryQuestionList.path,
          params: {
            papersId: this.$route.query.papersId,
            productId: this.$route.query.productId,
            studentId:this.$route.query.studentId
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            let arr=[];
            console.log(data)
            data.map((item)=>{
              if(arr.indexOf(item.type)==-1){
                arr.push(item.type);
//            this.data[item.questionsTypeName]=[item];
                this.data.push({name:item.type,child:[item]});
                // this.data.push({name:item.questionsTypeName;value:1})

              }else {
                this.data.map((i)=>{
                  if(i.name==item.type){
                    i.child.push(item)
                  }
                })

              }
            })

//          this.data.map((item)=>{
//
//          })
          }
        }
        this.ajax(options)
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
    @import '../../../css/home/recentPractice_over';
</style>

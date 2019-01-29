<!----------------------------------
****--@name     theClassOf_member
****--@role     ${*}
****--@date     2018/5/3
****--@author   zzh
----------------------------------->
<template>
    <div class="theClassOf_member">
      <header-title>
        <slot>群成员</slot>
      </header-title>
      <div class="stance"></div>
      <div class="mHeader">
        <div v-for="(item,index) in dataList" :key="index">
          <img :src="item.icon" onerror="this.src='../../../../sasmobile/img/img777.png'"  alt="">
          <span>{{item.name}}</span>
          <x-button v-if="$route.query.type=='teacher'" class="btn" mini @click.native="deletePerson(item)">删除</x-button>
        </div>
      </div>
      <alert v-model="message">删除成功！</alert>
    </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'
import api from './api'
import XButton from '../../../../node_modules/vux/src/components/x-button/index.vue'
// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      dataList: null,
      message:false
    }
  },
  methods: {
    deletePerson(val){
      this.ajax({
        ajaxSuccess: () => {
          this.message=true;
          this.init()
        },
          url: api.removeStudent.path,
          method: api.removeStudent.method,
          params: {
            id: this.$route.query.id,
            studentId: val.id
          },
      })
    },
    // 初始化请求列表数据
    init () {
        this.getPeople(this.$route.query.id)
    },
    getPeople (id) {
      let options = {
        url: this.$route.query.type=='teacher'?api.queryStudents.path:api.studentQueryStudents.path,
        params: {
          id: id
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
           if(this.$route.query.type!='teacher'){
             data.map((item) => {
               item.icon = this.getStaticPath(item.icon)
             })
             this.dataList = data
           }else {
             data.dataList.map((item) => {
               item.icon = this.getStaticPath(item.icon)
             })
             this.dataList = data.dataList
           }


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
  components: {
    XButton,
    HeaderTitle}
}
</script>
<style lang="scss">
    .theClassOf_member{
      .btn{
        background-color: #ff9f00;
        color: white;
        float: right;
        margin-right: 0.2rem;

      }
      .mHeader{
        box-sizing: border-box;
        padding: 0 0.16rem 0.18rem 0.15rem;
        >div{
          border-bottom: 0.01rem solid #F8FBF9;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0.18rem 0;
          >img{
            margin-right: 0.15rem;
          }
          >span{
            font-size: 0.15rem;
            color:rgba(27,27,27,0.7);
            font-weight: bold;
          }
        }
      }
    }
</style>

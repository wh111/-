<!----------------------------------
****--@name     message_content
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="message_content">
        <header-title>
            <slot>消息</slot>
        </header-title>
        <div class="stance"></div>
        <ul class="message_contents">
            <li>{{data.title}}</li>
            <li>
                {{data.content}}
            </li>
            <li>{{data.createTime | formatDate('yyyy-MM-dd HH:mm')}}</li>
        </ul>
        <div v-if="$route.query.busType=='Add_Friend'||$route.query.busType=='Join_Group'" style="margin-left: 0.15rem">
            <x-button mini plain type="primary" :disabled="data.joinStatus==1" @click.native="sure(2)">同意并添加</x-button>
            <x-button mini plain type="warn" :disabled="data.joinStatus==1" @click.native="sure(3)">拒绝</x-button>
        </div>
        <alert title="提示" v-model="show">
            <p>{{message}}</p>
        </alert>
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
      data: {title: '', content: '', createTime: '', createTime: ''},
      show: false,
      message: ''
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getDetail()
    },
    getDetail () {
      let options = {
        url: api.sysMsgGet.path,
        params: {
          id: this.$route.query.id
        },
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.data = data
        }
      }
      this.ajax(options)
    },
    sure (index) {
      if(this.$route.query.busType=='Join_Group'){
        this.ajax({
          ajaxSuccess: () => this.makeSuccess(index),

            //baseURL:'PUBLIC',
            url: api.modifyStudent.path,
            method: api.modifyStudent.method,
            data: {
              groupId:this.$route.query.busId,
              status: index,
              id: this.$route.query.id,
              studentId: this.data.operatorId,
//                id:this.messageId,
              userType:'Student',
            },
        })
      }else{
        this.ajax({
          ajaxSuccess: () => this.makeSuccess(index),

          // baseURL:'PUBLIC',
          url: api.auditing.path,
          method: api.auditing.method,
          data: {
            status: index,
            friendId: this.data.operatorId,
            id: this.data.id
          }

        })
      }

    },
    makeSuccess (index) {
      this.show = true
      this.message = (index == 2 ? '添加成功' : '已拒绝')
      this.getDetail()
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
    .message_content {
        .message_contents {
            box-sizing: border-box;
            padding: 0.25rem 0.15rem;
            font-weight: bold;
            li:nth-of-type(1) {
                color: rgba(0, 0, 0, 0.8);
                font-size: 0.18rem;
                margin-bottom: 0.165rem;
            }
            li:nth-of-type(2) {
                color: rgba(0, 0, 0, 0.8);
            }
            li:nth-of-type(3) {
                margin-top: 0.25rem;
                font-size: 0.12rem;
                color: rgba(149, 149, 149, 1);
            }
        }

    }
</style>

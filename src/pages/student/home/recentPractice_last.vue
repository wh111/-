<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
    <div class="recentPractice_last">
        <header-title>
            <slot>
              {{$route.query.name}}
            </slot>
        </header-title>
        <div class="stance"></div>
        <topic-alert></topic-alert>
        <div class="tab_content">
            <div v-if="type==1">
                <show-test showData="showData"></show-test>
            </div>
            <div v-if="type==2">笔记1323200..</div>
            <div v-if="type==3">收藏</div>
        </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */
import TopicAlert from '../commonality/topicAlert'
import RecentPracticeLast from './recentPractice_last_question'
import HeaderTitle from '../header'
import showTest from '../../../components/questionShow/show.vue'
// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      type: 1,
      show: false,
      show1: false,
      showData: null
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getQuestion()
    },
    getQuestion () {
      let options = {
        url: api.getQuestionsById.path,
        params: {
          questionsId: this.$route.query.questionsId,
          productId: this.$route.query.productId,
          papersId: this.$route.query.papersId
        },
        /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
        ajaxSuccess: (data, res) => {
          this.showData = data
        }
      }
      this.ajax(options)
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
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    onItemClick () {
      console.log('on item click')
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  components: {
    TopicAlert,
    RecentPracticeLast,
    HeaderTitle,
    showTest
  }
}
</script>
<style lang="scss">
    .txt {
        width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .recentPractice_last_note > div > div > .weui-dialog {
        height: 3.05rem;
        border-radius: 0.15rem;
        .weui-dialog__ft {
            width: 100%;
            bottom: 0;
            position: absolute;
        }
    }
</style>

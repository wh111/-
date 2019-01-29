<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="projectLibrary">
    <header-title>
      <slot><template v-if="$route.query.studentId">TA的题库</template> <template v-else>专题库</template></slot>
    </header-title>
    <div class="stance"></div>
    <p class="message" v-if="!data.length">暂无商品</p>
    <div class="content" v-for="(item,index) in data" :key="index" @click="open(item.id)">
      <div >
        <img :src="getStaticPath(item.icon)" onerror="this.src='../../../../sasmobile/img/1_07.jpg'" />
      </div>
      <div class="homePage_book">
        <div>{{item.title}}</div>
        <div><span> 价格：</span><span v-if="item.productTypes == 0"
                                    class="price">{{item.currentPrice | money}}</span>
          <span v-else class="price">{{item.currentPrice == null ? '0' : item.currentPrice
            }}积分</span></div>
        <div><span>试卷：</span><span>{{item.spec}}{{item.unit | unit }} </span></div>
        <section class="contentShop">
          {{item.content}}</section>
        <button>已购买</button>
      </div>
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
      data: [],
      contents: []
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getmyProductList()
    },
    getmyProductList () {
      let options = {
        url: api.myProductList.path,
        params: {
          studentId:this.$route.query.studentId,
          title: '',
          textbookVersionId: '',
          subject: '',
          grade: '',
          productTypes: '',
          types: ''
        },
        /**
         * 服务端返回的状态码检查,默认状态码检查前执行
         * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
         * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
         */
        ajaxSuccess: (data, res) => {
          this.data = data.dataList
        }
      }
      this.ajax(options)
    },
    open (id) {
      this.$router.push({name: 'recentPractice_content', query: {id: id,seeType:this.$route.query.seeType,studentId:this.$route.query.studentId}})
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
  @import '../../../css/child/projectLibrary';
</style>

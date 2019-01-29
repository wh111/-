<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
    <div class="question_grade">
      <div class="content" v-for="(item,index) in data" :key="index">
        <div @click="open">
          <img src="../../../../sasmobile/img/1_07.jpg"/>
        </div>
        <div class="homePage_book">
          <div>{{item.title}}</div>
          <div><span>{{item.price}}</span><span>{{item.number}}</span></div>
          <div><span>{{item.paper}}</span><span>{{item.numbers}}</span></div>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    open () {
      this.$router.push({name: 'questionGradeContent'})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
<style lang="scss">
  @import '../../../css/question_child/question_grade';
</style>

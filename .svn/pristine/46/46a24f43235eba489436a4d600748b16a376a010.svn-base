<!----------------------------------
****--@name     tClass
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
    <div class="tClass">
      <flexbox wrap="wrap" justify="space-between" :gutter=0 class="myTeam_header" v-for="index in 2" :key="index">
        <flexbox-item>
          <div @click="open('tClassContent')">初三一班</div>
          <div><span>群号</span><span>43252345</span></div>
        </flexbox-item>
        <div class="right_box" style="align-items: center;display: flex;justify-content: right">
          <div>2</div>
          <x-icon type="ios-arrow-forward" size="0.3rem"></x-icon>
        </div>
      </flexbox>
      <div class="tClassAdd" @click="open('tClassCreated')">+添加班组群</div>
    </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {}
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    open (type) {
      this.$router.push({name: type})
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
  @import "../../../tcss/tClass";
</style>

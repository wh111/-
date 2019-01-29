<template>
	<div class="appraisal_math_open_math">
		<div class="navigation_first">
          <flexbox-item :span="4" style="box-sizing: border-box;padding: 0.15rem"><div class="flex-demo">数学</div></flexbox-item>
          <flexbox-item :span="4">
            <flexbox justify="space-between" style="box-sizing: border-box;padding: 0 0.15rem" align="center">
              <flexbox-item :span="3"><div class="flex-demo">学习进度</div></flexbox-item>
              <x-progress class="appraisal_progress" :percent="percent2" :show-cancel="false" style="width: 100%;"></x-progress>
              <flexbox-item :span="2" align="right">{{percent2}}%</flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="4">
            <flexbox justify="space-between" style="box-sizing: border-box;padding: 0.15rem" align="center">
              <flexbox-item :span="3"><div class="flex-demo">能力值</div></flexbox-item>
              <x-progress class="appraisal_progress" :percent="percent3" :show-cancel="false" style="width: 100%;"></x-progress>
              <flexbox-item :span="2" align="right">{{percent3}}%</flexbox-item>
            </flexbox>
          </flexbox-item>
        </div>
        <div class="open" @click="open">进入首次测评</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      percent2: 30,
      percent3: 20

    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    open () {
      this.$router.push({name: 'appraisal_math_open_start'})
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
  @import "../../../css/appraisal/appraisal_math_open_math";
</style>

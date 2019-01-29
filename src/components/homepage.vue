<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/19
****--@author   zzh
----------------------------------->
<template>
	<div class="homepage">
		<router-view/>
		<div style="">
			<div style="height: 0.7rem"></div>
			<ul class="navigation" style="">
				<li @click="change('home')" :class="type === 'home'?'active':''">
					<div>
						<span class="glyphicon glyphicon-home"></span>
					</div>
					<div>首页</div>
				</li>
				<li @click="change('questionbank')" :class=" (type === 'question_grade') || (type === 'question_subject') || (type === 'question_category') || (type === 'question_textbook') ? 'active': ''">
					<div class="glyphicon glyphicon-list"></div>
					<div>题库</div>
				</li>
				<li @click="change('appraisal')" :class="(type === 'appraisal_math')||(type === 'appraisal_language') || (type === 'appraisal_english') || (type === 'appraisal_history') || (type === 'appraisal_geography')?'active':''">
					<div class="glyphicon glyphicon-pencil"></div>
					<div>测评</div>
				</li>
				<li @click="change('firstchild')" :class="type === 'firstchild'?'active':''">
					<div class="glyphicon glyphicon-user"></div>
					<div>我的</div>
					<!--<div class="navigation_icon"><icon class="actives" name="account" scale="2"></icon> </div>-->
					<!--<div>我的</div>-->
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
/* 当前组件必要引入 */
import '../tools/bootstrap-3.3.7-dist/css/bootstrap.css'
// 当前组件引入全局的util
// let Util = null;
export default {
  data () {
    return {
      type: '',
      fullWidth: document.documentElement.clientWidth
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (index) {
      this.$router.push({
        name: index
      })
    }
  },
  created () {
    this.init()
    let local = location.href.split('/')
    local = local[local.length - 1]
    this.type = local
    // console.log(local);
    this.show = (this.type === 'question_grade') || (this.type === 'question_subject') || (this.type === 'question_category') || (this.type === 'question_textbook')
  },

  watch: {
    $route (to, from) {
      // console.log(to.name)
      this.type = to.name
    }
  }
}
</script>
<style lang="scss">
	@import '../css/homepage';
</style>

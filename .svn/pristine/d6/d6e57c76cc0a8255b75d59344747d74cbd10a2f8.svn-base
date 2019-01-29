<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/19
****--@author   zzh
----------------------------------->
<template>
    <div class="pRoute">
        <router-view/>
        <div>
            <div style="height: 0.7rem"></div>
            <ul class="navigation">
                <li @click="change('pHome')"
                    :class="(type === 'pHome')||(type === 'pHerquestion') || (type === 'pDynamic') || (type === 'pDynamic_content')?'active':''">
                    <div>
                        <span class="glyphicon glyphicon-home"></span>
                    </div>
                    <div>首页</div>
                </li>
                <li @click="change('pQuestion')"
                    :class="(type === 'pQuestion') || (type === 'pQuestion_content')?'active':''">
                    <div class="glyphicon glyphicon-list"></div>
                    <div>题库</div>
                </li>
                <li @click="change('pMine')"
                    :class="(type === 'pMine') || (type==='all') || (type==='non-payment') || (type==='paccomplish') || (type==='canceled') ? 'active':''">
                    <div class="glyphicon glyphicon-user"></div>
                    <div>我的</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import '../../tools/bootstrap-3.3.7-dist/css/bootstrap-theme.css'
  import '../../tools/bootstrap-3.3.7-dist/css/bootstrap.css'
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
      console.log(local)
    },
    watch: {
      $route (to, from) {
        this.type = to.name
        console.log(to.name)
      }
    }
  }
</script>
<style lang="scss">
    @import '../../pcss/pRoute';
</style>

<!----------------------------------
****--@name     search
****--@role     ${*}
****--@date     2018/5/9
****--@author   zzh
----------------------------------->
<template>
    <div class="search">
      <ul class="screen">
        <li @click="show">筛选</li>
        <li>
          <div>最近</div>
          <div>最热</div>
          <div>价格</div>
        </li>
      </ul>
      <div class="screen_content" style="display: none">
        <div class="screen_top">
          <div v-for="(item1,index) in subjects" :key="index">
            <div id="pGroups">{{item1}}</div>
            <grid>
              <grid-item class="pSubject" v-for="(item,index) in subject" :key="index" align="center">
                <span>{{item}}</span>
              </grid-item>
            </grid>
          </div>

          <div class="pSubmit">
            <input type="button" value="重置筛条件"/>
            <input type="button" value="确定并筛选"/>
          </div>
        </div>
        <div class="screen_footer"></div>
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
      subject: ['全部', '语文', '数学', '英语'],
      subjects: ['年级', '科目', '类别', '教材']
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    show () {
      this.flag = !this.flag
      if (this.flag === true) {
        $('.screen_content').stop().slideUp(500)
      } else if (this.flag === false) {
        $('.screen_content').stop().slideDown(400)
      }
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
    .search{
      width: 100%;
      margin: 0 auto;
      z-index: 666;
      position: relative;
      background: white;
      .screen{
        margin-bottom: 0;
        box-sizing: border-box;
        padding: 0 0 0.1rem 0.16rem;
        display: flex;
        border-bottom: 1px solid gainsboro;
        justify-content: space-between;
        >li:nth-of-type(1){
          color:rgba(37,37,37,1);
          font-size: 0.14rem;
        }
        >li:nth-of-type(2){
          display: flex;
          >div{
            margin-right: 0.2rem;
            color:rgba(145,145,145,1);
            font-size: 0.14rem;
          }
        }
      }
      #pGroups{
        box-sizing: border-box;
        padding: 0.05rem 0.15rem;
        color:rgba(93,93,93,1);
        font-size: 0.15rem;
        background: #FAFAFA;
      }
      .pSubject{
        padding: 0;
        height: 0.3rem;
        line-height: 0.3rem;
        span{
          font-size: 0.14rem;
          color:#737373;
        }
      }
      .pSubmit{
        display: flex;
        justify-content: space-between;
        border-top: 0.2rem solid #F5F5F5;
        input{
          background: #FFFFFF;
          height: 0.46rem;
          width: 50%;
          border: 0;
          border-right: 1px solid #F5F5F5;
          color:rgba(93,93,93,1);
          font-size: 0.14rem;
          outline: 0;
        }
        input:nth-of-type(2){
          background: #1AAD19;
          color: #FFFFFF;
        }
      }
      .screen_footer{
        width: 100%;
        background: black;
        opacity: 0.1;
        height: 2rem;
      }
      .screen_top > div > div.weui-grids > a :hover{
        width: 100%;
        color: #1AAD19;
        border: 1px solid #1AAD19;
      }
    }

</style>

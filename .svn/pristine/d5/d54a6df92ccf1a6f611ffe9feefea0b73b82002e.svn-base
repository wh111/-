<!----------------------------------
****--@name     message
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
    <div class="message">
        <header-title>
            <slot>消息</slot>
        </header-title>
        <div class="stance"></div>
        <div class="myErrors_header" ref="scroller">
            <scroller  lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0">
                <div class="box2">

                    <flexbox v-for="(item,index) in data" :key="index"  @click.native="open('message_content',item.id,item.busType,item.busId)">
                        <flexbox-item :span="6">
                            <div style="font-size: 0.12rem;">{{item.title}}</div>
                        </flexbox-item>
                        <div style="display: flex;align-items: center;">
                            <span style="color: #737373;font-size: 0.12rem;">{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                        </div>
                        <div class="badge-value">
                            <!--<badge v-if="item.readStatus!=1"></badge>-->
                            <div style="width: 0.1rem;height: 0.1rem;background: red;border-radius: 100%" v-if="item.readStatus!=1"></div>
                        </div>
                    </flexbox>
                    <load-more tip="加载更多" :show-loading="false" v-if="this.num*10<this.totalCount"></load-more>
                </div>
            </scroller>

        </div>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import HeaderTitle from '../header'
  import { Badge, Group, Cell,Scroller, Divider, Spinner, XButton, LoadMore } from 'vux'
  import api from './api'
  // 当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        top:'0',
        showList1:true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        totalCount:0,
        loading:false,
        num: 1,
        data: [],
        temp:false,
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        this.messageList()
        this.num=1;
        this.data=[];
//        this.loading=false;
      },
      onScrollBottom () {
        if (this.onFetching) {
          if(this.num*10<this.totalCount){
            if(this.temp) {
              this.num++;
              this.temp=false
              this.messageList()
            }
          }else {

          }

        } else {
          this.onFetching = true
          setTimeout(() => {
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      messageList () {
        let options = {
          url: api.sysMsgList.path,
          params: {
            curPage: this.num,
            pageSize: 10,
          },
          /**
           * 服务端返回的状态码检查,默认状态码检查前执行
           * @param {*} data  服务器端返回的实际数据结构,根据不同业务格式不同
           * @param {object} res 服务器端返回的response值 {data:'**',status:{conde:0,msg:'请求数据成功!'}}
           */
          ajaxSuccess: (data, res) => {
            console.log(data['dataList'])
            this.temp=true;
              this.data= this.data.concat(data['dataList']);
              this.totalCount=data.totalCount
            console.log(this.data)
          }
        }
        this.ajax(options)
      },
      open (type,val,busType,busId) {
        this.$router.push({name: type,query:{id:val,busType:busType,busId:busId}})
      }
    },
    created () {
      this.init()
    },
    mounted () {
//      this.top = -this.$refs.scroller.offsetTop + ''
    },
    components: {HeaderTitle, Badge, Group, Cell,Scroller, Divider, Spinner, XButton,  LoadMore }
  }
</script>
<style lang="scss">
    .message {
        .myErrors_header {
            font-weight: bold;
            color: #363636;
            .vux-flexbox {
                box-sizing: border-box;
                padding: 0.18rem 0.1rem 0.18rem 0.16rem;
                border-bottom: 1px solid #EDF3EE;
                justify-content: space-between;
                align-items: center;
                font-size: 0.12rem;
            }
        }
    }
</style>

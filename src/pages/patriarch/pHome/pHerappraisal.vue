<!----------------------------------
****--@name     pHerappraisal
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
  <div class="pHerappraisal">
    <header-title>
      <slot>TA的测评</slot>
    </header-title>
    <div class="stance"></div>
    <div class="hello_img">
      <img src="../../../../sasmobile/img/03.jpg" alt="">
      <div>李明</div>
      <div>
        <span>北京市四中</span>
        <span>七年级一班</span>
      </div>
    </div>
    <div class="homework" v-for="(item,index) in data" :key="index" v-if="type == 1">
      <div v-if="item.title" :class="item.title !== '' ? 'active' : ''">{{item.title}}</div>
      <div>
        <div class="pelement">
          <ul>
            <li>{{item.concent}}</li>
            <li>
              <span>{{item.total}}</span>
              <span>{{item.day}}<span>{{item.time}}</span>{{item.hand}}</span>
              <span>{{item.overhand}}</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>{{item.promulgator}}</span>
              <span>{{item.teacher}}</span>
            </li>
          </ul>
        </div>
      </div>
      <p  v-if="item.name" class="btn">
        <button>{{item.name}}</button>
        <x-icon type="ios-arrow-forward" size="0.25rem"></x-icon>
      </p>
    </div>
  </div>
</template>
<script>
import HeaderTitle from '../header'
export default{
  data () {
    return {
      articles: [],
      type: 1,
      data: [
        {
          title: '12月',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30',
          id: 1
        },
        {
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          name: '查看更多',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          title: '11月',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30',
          id: 2
        },
        {
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          name: '查看更多',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          title: '10月',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30'
        },
        {
          name: '查看更多',
          concent: '第五单元简单的几何测量考验',
          total: '共5小题',
          day: '12日',
          time: '15:00',
          hand: '之前上交',
          overhand: '5人已上交',
          promulgator: '发布者',
          teacher: '王老师',
          retime: '发布时间',
          times: '11月13:30',
          id: 3
        }
      ]
    }
  },
  methods: {
    open (type) {
      if (type === 3) {
        this.$router.push({name: 'pHerquestion'})
      }
    }
  },
  created () {
  },
  components: {
    HeaderTitle
  }
}
</script>
<style lang="scss">
  @import '../../../pcss/patriarch/pHerappraisal';
</style>

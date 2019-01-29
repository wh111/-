<!--
****--@file     judge_show
****--@date     2017/12/5 9:40
****--@author   YC
****--@describe 判断题-查看
-->
<template>
    <div>
        <div class="questionBox">
            <!-- 顶部 -->
            <div class="qHeader"></div>
            <!-- 主体部分 -->
            <div class="qContent">
                <!-- 问题标题 -->
                <div class="qcTitle" :class="{'hasDo':hasDo}">
                    <!-- 问题显示区域 -->
                    <span v-if="index" class="qctIndex">{{ index }}.</span>
                    <div class="qctTextBox" v-html="questionData.title" :style="{paddingRight:hasDo + 0.1 + 'rem'}"></div>
                    <div class="qctTodoBox" :style="{width:hasDo + 'rem'}">
                        <slot name="todo"></slot>
                    </div>
                </div>
                <!-- 问题选项 -->
                <div class="qcMain">
                    <div class="qcmSel" v-for="(str,index) in questionData.questionsOptions" :key="index">
                        <span class="qcmSelItem">{{ index | getCharCode }}.</span>
                        <div class="qcmSelText" v-html="str"></div>
                    </div>
                </div>
                <!-- 答案及解析 -->
                <div class="qcFooter" v-if="showAnswer">
                    <div>
                        <div :span="22/24">
                            <div class="qcfItem">
                                <span>正确答案：</span>
                                <span class="qcfiAnswer">{{ parseInt(question.answer) | answerText }}</span>
                            </div>
                            <!-- 学生答案 -->
                            <template v-if="questionData.studentAnswer !== undefined">
                                <div class="qcfItem">
                                    <span>学生答案：</span>
                                    <span class="qcfiAnswer" v-if="questionData.studentAnswer !== null">{{
                                        questionData.studentAnswer | answerText }}</span>
                                    <span class="qcfiAnswer" v-else></span>
                                </div>
                                <div class="qcfItem error"
                                     :class="{'success':questionData.answerResult==1}">
                                    <template v-if="questionData.answerResult==1">
                                        <icon type="success-circle"></icon> 正确
                                    </template>
                                    <template v-else>
                                        <icon type="cancel"></icon>错误
                                    </template>
                                </div>
                            </template>
                        </div>
                        <!--<div :span="2/24" align="right">-->
                            <!--<slot name="answerRight">-->
                                <!--<x-button type="text" class="qcfShowExp" @click.native="showExp">查看解析 <i-->
                                        <!--:class="showExpStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>-->
                                <!--</x-button>-->
                            <!--</slot>-->
                        <!--</div>-->
                    </div>
                    <div class="qcfExpCon" v-if="showExpStatus">
                        <div><span class="analysis">解析：</span>  <span class="detail" v-html="questionData.answerExplain"></span></div>
                    </div>
                </div>
            </div>
            <!--&lt;!&ndash; 底部 &ndash;&gt;-->
            <!--<div class="qFooter">-->
                <!--<div style="text-align: right;">-->
                    <!--<slot name="answerRight"> </slot>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="qAnswerBox" v-if="showInput">
            <div>
                选择答案：
                <x-button style="border: none" v-for="(item,index) in 2" :key="index"
                           :class="answerVal === index?'active':''" @click.native="choice(index)">{{ index | answerText
                    }}
                </x-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../assets/css/question";
</style>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    let Util = null;
    export default {
      name: 'questionJudgmentShow',
      /**
         * index    题号
         * question 题目对象
         * hasDo 标题操作
         */
        props: ['index', 'question', 'hasDo', 'showAnswer', 'showInput'],
        data() {
            return {
                answerVal: '',
                showExpStatus: true, // 显示解析
                optionsSpan: 24, // 选项展示比例
                questionData: {
                    "score": "", // 分值
                    "title": "", // 题目内容：文字
                    "answer": "", // 正确答案：多个|隔开
                    "answerExplain": "", // 答案解析
                    "questionsOptions": [] // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                if(this.question instanceof Object) {
                    this.questionData = this.$util._.defaultsDeep({}, this.question);
                }
                this.answerVal = '';
                if(this.questionData.studentAnswer !== undefined && this.questionData.studentAnswer !== null) {
                    this.choice(Number(this.questionData.studentAnswer))
                }
            },
            showExp() {
                this.showExpStatus = !this.showExpStatus
            },
            choice(index) {
                this.answerVal = index;
                this.$emit('answer', this.answerVal || '0')
            }
        },
        watch: {
            question(val) {
                console.log(val)
                this.init()
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {}
    }
</script>

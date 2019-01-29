<!--
****--@file     choiceEvaluation_Byself
****--@date     2017/12/19 下午2:05
****--@author   jhd
****--@describe   自适应测评
-->
<template>
    <div class="adaptive-evaluation choice-evaluation">
        <div class="modal">
            <div class="logo-wrap">
                <router-link to="/">
                    <img src="../../assets/images/logo.png" alt="">
                </router-link>
            </div>
            <template v-if="questionData instanceof Object">
                <p class="title">
                    <span>第 {{ questionsSeq }} 题</span>
                    <span class="tip">还有<b
                            style="color: #fd7416;">{{ assessment.questionsCount - questionsSeq }}</b>题</span>
                </p>
                <div class="content">
                    <p class="con-title">
                        <span class="type">题型：{{ questionData.questionsTypeName }}</span>
                        <span class="right">竞赛时长：{{ hour }} 时 {{ minute }} 分 {{ second }} 秒</span>
                    </p>
                    <div class="con-main">
                        <question-show :showData="questionData" :showInput="true"
                                       @answer="setAnswer"></question-show>
                    </div>
                    <div class="con-btn" align="right">
                        <el-button v-if="assessment.questionsCount - questionsSeq == 0" :loading="loading"
                                   @click="submit">
                            提交
                        </el-button>
                        <template v-else>
                            <el-button :loading="loading" @click="next">下一题</el-button>
                            <el-button type="text" @click="cancel">提交</el-button>
                        </template>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="content">
                    <p v-if="questionData === null" class="nodataTip">
                        <span class="el-icon-loading"></span>
                        数据加载中
                    </p>
                    <!--<p v-else-if="questionData === false" class="nodataTip">谢谢，您已经参与过该任务！</p>-->
                    <p v-else class="nodataTip">您所选择的科目，目前没有测评试题！
                        <router-link to="/selfCenter/selfCenterdetail">返回个人中心</router-link>
                    </p>
                    <!--<p v-else class="nodataTip">数据被篡改，环境异常！</p>-->
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    import coProgress from '../../components/common/progress.vue'
    import api from './api'

    import questionShow from '../../components/questionShow/show'

    export default {
        data() {
            return {
                loading: false,

                grade: '', // 年级
                subject: '', // 科目
                chapterId: '', // 章节id
                isFirstAssessment: '', // 是否首次测评
                textbookVersionId: '', // 测评教材版本

                seasonId: '',
                gamesAnswerId: '',
                answer: '',
                questionsSeq: '0',

                timerInt: null, // 时间计时器
                hour: 0,//时
                minute: 0,//分
                second: 0,//秒

                questionData: null,
                assessment: {
                    "id": "", // 测评ID
                    "createTime": "", // 首测时间
                    "questionsCount": "" // 试题总数量
                },
                isLogin: this.$store.getters['app/isLogin'],
            }
        },

        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                // 检测路由参数是否正确（防止手动篡改）
                let {grade = '', subject = '', isFirstAssessment = '', textbookVersionId = ''} = this.$route.params;
                if(!grade || (grade && isNaN(grade)) || !isFirstAssessment || !~['1', '2'].indexOf(isFirstAssessment) || !subject || (subject && !/^[A-Z][a-z]+$/.test(subject)) || !textbookVersionId) {
                    this.questionData = -1;
                    return
                }
                this.grade = grade;
                this.subject = subject;
                this.isFirstAssessment = isFirstAssessment;
                this.textbookVersionId = textbookVersionId;
                this.chapterId = this.$route.query.chapterId || '';
                this.getAssessment()
            },
            getAssessment() {
                let type = 'addAssessment';
                if(this.chapterId) {
                    type = 'add'
                } else {
                    if(this.isFirstAssessment == 1) {
                        type = 'addFirstAssessment'
                    }
                }
                let opt = {
                    ajaxSuccess: res => {
                        this.assessment = res.data;
                        this.next();
                    },
                    ajaxParams: {
                        url: api[type].path,
                        method: api[type].method,
                        data: {
                            grade: this.grade,
                            subject: this.subject,
                            chapterId: this.chapterId,
                            textbookVersionId: this.textbookVersionId // 测评教材版本
                        }
                    }
                };
                this.ajax(opt)
            },
            timer() {//计时
                this.second = this.second + 1;
                if(this.second > 59) {
                    this.second = 0;
                    this.minute = this.minute + 1;
                }

                if(this.minute > 59) {
                    this.minute = 0;
                    this.hour = this.hour + 1;
                }
            },
            setAnswer(d) {
                this.answer = d;
            },
            next() {
                this.saveAnswer((data) => {
                    if(data) {
                        this.questionsSeq = +this.questionsSeq + 1;
                        this.questionData = data;
                        this.timerInt = setInterval(() => this.timer(), 1000);
                    } else {
                        if(this.questionsSeq > 1) {
                            this.lookTestRes()
                        } else {
                            this.questionData = data;
                        }
                    }
                })
            },
            submit() {
                if(this.answer === '') {
                    this.$Message.error('请先选择或填写答案！');
                    return
                }
                let questionsId = '';
                if(this.questionData) {
                    // 如果是组合题型则获取小题id
                    if(this.questionData.childQuestionsList instanceof Array && this.questionData.childQuestionsList.length) {
                        questionsId = this.questionData.childQuestionsList[0].id
                    } else {
                        questionsId = this.questionData.id
                    }
                }
                let opt = {
                    ajaxSuccess: () => this.lookTestRes(),
                    ajaxParams: {
                        url: api.submit.path,
                        method: api.submit.method,
                        data: {
                            assessmentAutoId: this.assessment.id, // 自适应测评id
                            questionsId, // 自适应测评id
                            answer: this.answer, // 自适应测评id
                        }
                    }
                }
                this.ajax(opt)
            },
            saveAnswer(call) {
                if(this.questionData && this.answer === '') {
                    this.$Message.error('请先选择或填写答案！');
                    return
                }
                let questionsId = '';
                if(this.questionData) {
                    // 如果是组合题型则获取小题id
                    if(this.questionData.childQuestionsList instanceof Array && this.questionData.childQuestionsList.length) {
                        questionsId = this.questionData.childQuestionsList[0].id
                    } else {
                        questionsId = this.questionData.id
                    }
                }
                let data = {
                    assessmentAutoId: this.assessment.id, // 自适应测评id
                    questionsId, // 自适应测评id
                    answer: this.answer, // 自适应测评id
                    questionsSeq: this.questionsSeq // 第几题
                };
                if(!this.isLogin) {
                    Object.assign(data, {
                        grade: this.grade, // 年级
                        subject: this.subject, // 科目
                        textbookVersionId: this.textbookVersionId, // 测评教材版本
                    });
                }
                let opt = {
                    ajaxSuccess: res => {
                        this.loading = false;
                        this.answer = '';
                        call(res.data)
                    },
                    ajaxParams: {
                        url: api['getNextQuestions' + (this.isLogin ? '' : 'NoLogin')].path,
                        method: api['getNextQuestions' + (this.isLogin ? '' : 'NoLogin')].method,
                        data
                    }
                };
                this.loading = true;
                clearInterval(this.timerInt);
                this.timerInt = null;
                this.ajax(opt)
            },
            lookTestRes() {
                if(this.isLogin) {
                    this.$router.push({
                        path: "/autoAssessmentResult",
                        query: {id: this.assessment.id, isFirst: this.isFirstAssessment}
                    })
                } else {
                    this.$util.setStore('loginGo', `/autoAssessmentResult?id=${this.assessment.id}&isFirst=${this.isFirstAssessment}&bind=true`);
                    this.$router.push({name: 'login'});
                    this.$notify({
                        type: 'success',
                        title: '提示',
                        dangerouslyUseHTMLString: true,
                        message: `评测成功，登录后可查看评测结果`
                    });
                }
            },
            cancel() {
                this.$confirm('未完成指定自适应测评试卷，提前提交将不保存此次测评记录；确定提交？').then(_ => {
                    this.$router.push('/evaluationByself')
                });
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        beforeDestroy() {
            clearInterval(this.timerInt);
            this.timerInt = null;
        },
        components: {
            coProgress, questionShow
        }
    }

</script>
<style lang="scss">
    @import "../../../src/assets/css/paper/question";

    .choice-evaluation {
        height: 950px;
        background-size: 100% 100%;
        background-image: url("../../assets/images/adaptiveEvaluation.jpg");
        .nodataTip {
            text-align: center;
            line-height: 500px;
        }
        .modal {
            .logo-wrap {
                position: absolute;
                top: 65px;
                left: 0px;
            }
            position: relative;
            width: 1200px;
            margin: 0 auto;
            padding-top: 150px;
            .title {
                font-size: 26px;
                background-color: #ebede1;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.54;
                letter-spacing: 0.1px;
                text-align: center;
                color: #313131;
                .tip {
                    float: right;
                    margin-right: 50px;
                    font-size: 16px;
                    line-height: 2.5;
                    letter-spacing: 0.1px;
                    text-align: left;
                    color: #313131;
                }
            }
        }
        .content {
            background: #ffffff;
            padding: 0 100px;
            min-height: 500px;
            position: relative;
        }
        .con-title {
            font-size: 14px;
            line-height: 3.57;
            text-align: left;
            .type {
                color: #11a63f;
            }
        }
        .con-main {
            min-height: 360px;
            max-height: 500px;
            overflow: auto;
        }
        .con-btn {
            padding: 20px 0;
            button {
                width: 140px;
                height: 46px;
                border-radius: 23px;
                line-height: 2.5;
                letter-spacing: 0.1px;
                color: #fefefe;
                background-color: #fd7416;
                border: none;
                cursor: pointer;
            }
        }
    }
</style>

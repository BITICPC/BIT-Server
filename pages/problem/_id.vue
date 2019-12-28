<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="9" lg="9" xl="7">
        <v-card>
          <v-row v-show="skeleton" justify="center" no-gutters>
            <v-col md="3" cols="7">
              <v-skeleton-loader type="article" boilerplate />
            </v-col>
          </v-row>
          <v-card-title v-show="!skeleton" class="headline mb-1 justify-center text-center">
            #{{ $route.params.id }}. {{ problem.title }}
          </v-card-title>
          <v-card-subtitle v-show="!skeleton" class="text-center">
            <v-row no-gutters>
              <v-col class="text-right">
                时间限制：
              </v-col>
              <v-col class="text-left">
                {{ problem.timeLimit }} ms
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="text-right">
                内存限制：
              </v-col>
              <v-col class="text-left">
                {{ problem.memoryLimit }} megabytes
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="text-right">
                评测模式：
              </v-col>
              <v-col class="text-left">
                {{ problem.judgeMode }}
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <v-tabs
              v-model="tabs"
              color="purple"
              class="mb-4"
              centered
              show-arrows
            >
              <v-tab href="#statement">
                <v-icon left small>
                  fas fa-book
                </v-icon>
                题面
              </v-tab>
              <v-tab href="#submit" :disabled="!isLogin">
                <v-icon left small>
                  fas fa-edit
                </v-icon>
                提交
              </v-tab>
              <v-tab href="#statistics" disabled>
                <v-icon left small>
                  fas fa-chart-pie
                </v-icon>
                统计
              </v-tab>
              <v-tab href="#discussion" disabled>
                <v-icon left small>
                  fas fa-comments
                </v-icon>
                讨论
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item value="statement">
                <div id="statement">
                  <h3 class="title purple--text">
                    题目描述
                  </h3>
                  <div class="content">
                    <v-skeleton-loader :loading="skeleton" type="list-item-three-line">
                      <div v-katex:auto v-highlight class="markdown-body" v-html="problem.legend" />
                    </v-skeleton-loader>
                  </div>
                </div>
                <div id="statement">
                  <h3 class="title purple--text">
                    输入格式
                  </h3>
                  <div class="content">
                    <v-skeleton-loader :loading="skeleton" type="list-item-two-line">
                      <div v-katex:auto v-highlight class="markdown-body" v-html="problem.input" />
                    </v-skeleton-loader>
                  </div>
                </div>
                <div id="statement">
                  <h3 class="title purple--text">
                    输出格式
                  </h3>
                  <div class="content">
                    <v-skeleton-loader :loading="skeleton" type="list-item-two-line">
                      <div v-katex:auto v-highlight class="markdown-body" v-html="problem.output" />
                    </v-skeleton-loader>
                  </div>
                </div>
                <div v-if="problem.samples.length > 0" id="statement">
                  <h3 class="title purple--text">
                    样例
                  </h3>
                  <v-row v-for="(sample, index) in problem.samples" :key="index">
                    <v-col class="pt-0" cols="12" md="6">
                      <v-card outlined>
                        <v-card-subtitle>
                          样例 {{ index + 1 }} 输入
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                v-clipboard:copy="sample.input"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onCopyError"
                                small
                                v-on="on"
                              >
                                mdi-clipboard-text-outline
                              </v-icon>
                            </template>
                            <span>单击复制</span>
                          </v-tooltip>
                        </v-card-subtitle>
                        <v-card-text class="sample">
                          {{ sample.input }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col class="pt-0" cols="12" md="6">
                      <v-card outlined>
                        <v-card-subtitle>
                          样例 {{ index + 1 }} 输出
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                v-clipboard:copy="sample.output"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onCopyError"
                                small
                                v-on="on"
                              >
                                mdi-clipboard-text-outline
                              </v-icon>
                            </template>
                            <span>单击复制</span>
                          </v-tooltip>
                        </v-card-subtitle>
                        <v-card-text class="sample">
                          {{ sample.output }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="!!problem.notes" id="statement">
                  <h3 class="title purple--text">
                    提示
                  </h3>
                  <div class="content">
                    <div v-katex:auto v-highlight class="markdown-body" v-html="problem.notes" />
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item value="submit">
                <v-form ref="code" @submit.prevent="submitCode(false)">
                  <v-card outlined tile>
                    <ace-editor
                      v-model="code"
                      :lang="selectLanguage.lang"
                      theme="chrome"
                      height="400"
                      style="font-size: 11pt;"
                    />
                  </v-card>
                  <v-card-actions class="pt-2 pb-0 px-0">
                    <v-select
                      v-model="selectLanguage"
                      style="max-width: 165px;"
                      color="purple"
                      item-color="purple"
                      menu-props="auto"
                      :disabled="submitStatus === 1"
                      :items="languageOptions"
                      :rules="languageRules"
                      :hint="selectLanguage.token"
                      item-text="title"
                      item-value="title"
                      label="评测语言"
                      no-data-text="没有可用的评测语言"
                      persistent-hint
                      return-object
                    />
                    <v-spacer />
                    <v-btn :loading="submitStatus == 1" :color="submitStatus == 2 ? 'error' : 'success'" type="submit" depressed>
                      <v-icon small left>
                        fas fa-paper-plane
                      </v-icon>
                      提交代码
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-tab-item>
              <v-tab-item value="statistics" />
              <v-tab-item value="discussion" />
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="3"
        lg="3"
        xl="2"
        class="pl-sm-0"
      >
        <v-card>
          <v-skeleton-loader :loading="skeleton" type="list-item-two-line, divider, list-item-three-line">
            <v-card-text>
              <b>{{ problem.totalSolvedUsers }} 人解决，</b>{{ problem.totalAttemptedUsers }} 人已尝试。<br>
              <b>{{ problem.acceptedSubmissions }} 份提交通过，</b>共 {{ problem.totalSubmissions }} 份提交。
            </v-card-text>
            <v-divider />
            <v-card-text>
              <b>创建：</b>{{ problem.creationTime }}<br>
              <b>修改：</b>{{ problem.lastUpdateTime }}<br>
              <b>最后提交：</b>{{ problem.lastSubmissionTime }}<br>
              <b>来源: </b>{{ problem.source }}
            </v-card-text>
          </v-skeleton-loader>
        </v-card>
        <v-card v-if="problem.tags.length > 0" class="mt-3">
          <v-card-subtitle>题目标签</v-card-subtitle>
          <v-card-text>
            <v-chip
              v-for="tag in problem.tags"
              :key="tag"
              :color="getTagColor(tag)"
              class="ma-1"
              dark
              small
            >
              {{ tag }}
            </v-chip>
          </v-card-text>
        </v-card>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card class="mt-3">
              <v-form ref="file" @submit.prevent="submitCode">
                <v-card-subtitle>提交代码</v-card-subtitle>
                <v-card-text>
                  <v-select
                    v-model="selectLanguage"
                    color="purple"
                    item-color="purple"
                    menu-props="auto"
                    :disabled="submitStatus === 1"
                    :items="languageOptions"
                    :rules="languageRules"
                    :hint="selectLanguage.token"
                    item-text="title"
                    item-value="title"
                    label="评测语言"
                    no-data-text="没有可用的评测语言"
                    persistent-hint
                    return-object
                  />
                  <v-file-input
                    v-model="codeFile"
                    prepend-icon=""
                    color="purple"
                    :disabled="submitStatus === 1"
                    :rules="[v => !!v || '请上传代码文件']"
                    accept=".c, .cpp, .java, .py, .rs"
                    label="代码文件"
                    show-size
                  />
                </v-card-text>
                <v-card-actions class="pt-0 pb-4">
                  <v-spacer />
                  <v-btn
                    :loading="submitStatus == 1"
                    :color="submitStatus == 2 ? 'error' : 'success'"
                    type="submit"
                    outlined
                    depressed
                    small
                  >
                    <v-icon class="mr-2" x-small>
                      fas fa-paper-plane
                    </v-icon>
                    提交代码
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-form>
              <v-fade-transition>
                <v-overlay v-if="hover && !isLogin" style="z-index: 0" absolute>
                  <span>您尚未登录：</span>
                  <v-row>
                    <v-col class="pr-1">
                      <v-btn class="subtitle-1" color="success" to="/login">
                        <v-icon left small>
                          fas fa-sign-in-alt
                        </v-icon>
                        登录
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn class="subtitle-1" color="primary" to="/join">
                        <v-icon left small>
                          fas fa-user-plus
                        </v-icon>
                        注册
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import api from '@/plugins/utils/api'
import problem from '@/plugins/utils/problem'
import common from '@/plugins/utils/common'

export default {
  data () {
    return {
      tabs: null,
      skeleton: false,
      problem: {
        id: '',
        title: '',
        legend: '',
        input: '',
        output: '',
        notes: '',
        samples: [],
        tags: [],
        difficulty: 0,
        timeLimit: 1000,
        memoryLimit: 256,
        judgeMode: 'Unknow',
        source: '未知',
        acceptedSubmissions: 0,
        totalSubmissions: 0,
        totalSolvedUsers: 0,
        totalAttemptedUsers: 0,
        creationTime: '',
        lastUpdateTime: '',
        lastSubmissionTime: ''
      },
      code: '',
      codeFile: null,
      selectLanguage: {
        id: '',
        title: '',
        lang: '',
        token: ''
      },
      languageOptions: [],
      languageRules: problem.languageRules,
      submitStatus: 0
    }
  },
  computed: {
    ...mapGetters(['language', 'isLogin', 'profile'])
  },
  mounted () {
    this.skeleton = true
    api.getPublicProblemDetail(this.$route.params.id).then((res) => {
      Object.keys(this.problem).forEach((element) => {
        if (res.data[element] !== null) {
          this.problem[element] = res.data[element]
        }
      })
      if (res.data.legend !== null) {
        this.problem.legend = common.md.render(res.data.legend)
      }
      if (res.data.input !== null) {
        this.problem.input = common.md.render(res.data.input)
      }
      if (res.data.output !== null) {
        this.problem.output = common.md.render(res.data.output)
      }
      if (res.data.notes !== null) {
        this.problem.notes = common.md.render(res.data.notes)
      }
      this.problem.judgeMode = problem.judgeMode[res.data.judgeMode]
      this.problem.creationTime = common.getTimeDifferent(res.data.creationTime)
      this.problem.lastUpdateTime = common.getTimeDifferent(res.data.lastUpdateTime)
      this.problem.lastSubmissionTime = res.data.totalSubmissions > 0 ? common.getTimeDifferent(res.data.lastSubmissionTime) : 'None'

      if (this.language !== null) {
        api.getLanguages().then((res) => {
          this.setLanguage(res.data)
          this.languageOptions = common.getLanguageOptions(res.data)
        })
      } else {
        this.languageOptions = common.getLanguageOptions(this.language)
      }
      this.skeleton = false
    }).catch(() => {
      this.newToast({
        text: '获取题目信息失败！',
        color: 'error',
        icon: 'mdi-alert'
      })
    })
  },
  methods: {
    ...mapActions(['newToast', 'setLanguage']),
    getTagColor: problem.getTagColor,
    onCopy (event) {
      this.newToast({
        text: '复制成功！',
        color: 'success',
        icon: 'mdi-check-circle'
      })
    },
    onCopyError (event) {
      this.newToast({
        text: '复制失败！',
        color: 'error',
        icon: 'mdi-alert'
      })
    },
    submitCode (fromFile = false) {
      this.submitStatus = 1
      if (!this.isLogin) {
        this.newToast({
          text: '您尚未登陆，无法提交代码！',
          color: 'error',
          icon: 'mdi-alert'
        })
        this.submitStatus = 2
        return
      }
      if (fromFile) {
        if (this.$refs.file.validate()) {
          const reader = new FileReader()
          reader.readAsText(this.codeFile)
          reader.onload = (e) => {
            api.createSubmission({
              problemId: this.problem.id,
              languageId: this.selectLanguage.id,
              code: e.target.result
            }, this.profile.jwt).then(() => {
              this.newToast({
                text: '提交成功，请留意评测结果。',
                color: 'blue',
                icon: 'mdi-information'
              })
              this.submitStatus = 0
              this.$router.push('/status')
            }).catch(() => {
              this.newToast({
                text: '提交失败！',
                color: 'error',
                icon: 'mdi-alert'
              })
              this.submitStatus = 2
            })
          }
          return
        }
        this.submitStatus = 2
        return
      }
      if (this.$refs.code.validate()) {
        if (this.code.length >= 3 && this.code.length <= 65536) {
          api.createSubmission({
            problemId: this.problem.id,
            languageId: this.selectLanguage.id,
            code: this.code
          }, this.profile.jwt).then(() => {
            this.newToast({
              text: '提交成功，请留意评测结果。',
              color: 'blue',
              icon: 'mdi-information'
            })
            this.submitStatus = 0
            this.$router.push('/status')
          }).catch(() => {
            this.newToast({
              text: '提交失败！',
              color: 'error',
              icon: 'mdi-alert'
            })
            this.submitStatus = 2
          })
          return
        } else {
          this.newToast({
            text: '代码不得小于 6 字节，不得超过 65536 字节。',
            color: 'error',
            icon: 'mdi-alert'
          })
        }
      }
      this.submitStatus = 2
    }
  }
}
</script>

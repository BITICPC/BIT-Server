<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-row v-show="skeleton" justify="center" no-gutters>
            <v-col md="3" cols="7">
              <v-skeleton-loader type="article" boilerplate />
            </v-col>
          </v-row>
          <v-card-title v-show="!skeleton" class="headline mb-1 justify-center">
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
            <v-tabs v-model="tabs" color="purple" class="mb-4" centered>
              <v-tab href="#statement">
                <v-icon class="mr-1" small>
                  fas fa-book
                </v-icon>
                题面
              </v-tab>
              <v-tab href="#statistics" disabled>
                <v-icon class="mr-1" small>
                  fas fa-chart-pie
                </v-icon>
                统计数据
              </v-tab>
              <v-tab href="#discussion" disabled>
                <v-icon class="mr-1" small>
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
              <v-tab-item value="statistics" />
              <v-tab-item value="discussion" />
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="pl-md-0">
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
              <b>最后提交：</b>
              <template v-if="problem.totalSubmissions > 0">
                {{ problem.lastSubmissionTime }}
              </template>
              <template v-else>
                None
              </template><br>
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import api from '@/plugins/utils/api'
import problem from '@/plugins/utils/problem'
import common from '@/plugins/utils/common'

export default {
  data () {
    return {
      tabs: null,
      skeleton: false,
      problem: {
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
      }
    }
  },
  mounted () {
    this.skeleton = true
    api.getPublicProblemDetail(this.$route.params.id).then((res) => {
      Object.keys(this.problem).forEach((element) => {
        if (res.data[element] !== null) {
          this.problem[element] = res.data[element]
        }
      })
      this.problem.legend = common.md.render(res.data.legend)
      this.problem.input = common.md.render(res.data.input)
      this.problem.output = common.md.render(res.data.output)
      if (res.data.notes) {
        this.problem.notes = common.md.render(res.data.notes)
      }
      this.problem.judgeMode = problem.judgeMode[res.data.judgeMode]
      this.problem.creationTime = common.getTimeDifferent(res.data.creationTime)
      this.problem.lastUpdateTime = common.getTimeDifferent(res.data.lastUpdateTime)
      this.problem.lastSubmissionTime = common.getTimeDifferent(res.data.lastSubmissionTime)
      this.skeleton = false
    })
  },
  methods: {
    ...mapActions(['newToast']),
    getTagColor: problem.getTagColor,
    onCopy (event) {
      this.newToast({
        text: '复制成功',
        color: 'success',
        icon: 'mdi-check-circle'
      })
    },
    onCopyError (event) {
      this.newToast({
        text: '复制失败',
        color: 'error',
        icon: 'mdi-alert'
      })
    }
  }
}
</script>

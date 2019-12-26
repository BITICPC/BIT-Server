<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              状态
            </th>
            <th class="text-center">
              题目
            </th>
            <th class="text-center">
              评测语言
            </th>
            <th class="text-center">
              提交时间
            </th>
            <th class="text-center">
              评测时间
            </th>
            <th class="text-center">
              评测结果
            </th>
            <th class="text-center">
              运行时间
            </th>
            <th class="text-center">
              运行内存
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td>
              <template v-if="submission.status === 'Pending'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="grey" small v-on="on">
                      mdi-help
                    </v-icon>
                  </template>
                  <span>等待评测</span>
                </v-tooltip>
              </template>
              <template v-else-if="submission.status === 'Judging'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="indigo lighten-1" v-on="on">
                      mdi-timer-sand
                    </v-icon>
                  </template>
                  <span>正在评测</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="success" v-on="on">
                      mdi-check
                    </v-icon>
                  </template>
                  <span>评测完成</span>
                </v-tooltip>
              </template>
            </td>
            <td>{{ submission.title }}</td>
            <td>{{ submission.language }}</td>
            <td>{{ submission.creationTime }}</td>
            <td>{{ submission.judgeTime }}</td>
            <td>
              <span :class="submission.verdict.class">{{ submission.verdict.title }}</span>
            </td>
            <td>{{ submission.time }}</td>
            <td>{{ submission.memory }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <ace-editor
      v-model="submission.code"
      theme="chrome"
      :lang="submission.aceLang"
      :options="aceOptions"
      height="600"
      class="mt-2"
      style="font-size: 11pt;"
    />
    <template v-if="submission.testCases.length > 0">
      <v-list-item class="pl-0">
        <v-list-item-icon class="mr-2">
          <v-icon large>
            mdi-format-list-numbered
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>评测报告</v-list-item-title>
          <v-list-item-subtitle>只显示前512个字节</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-for="(testcase, index) in submission.testCases" :key="index">
        <div :class="index > 0 ? 'pt-4' : null"><b>测试点 #{{ index + 1 }}：</b>运行时间 {{ testcase.time }} ms，运行内存 {{ testcase.memory }} MB，程序返回值 {{ testcase.exitCode }}，评测结果 <span :class="verdictStatus[testcase.verdict].class">{{ verdictStatus[testcase.verdict].title }}</span></div>
        <v-card v-if="!!testcase.inputView && testcase.inputView.length > 0" outlined>
          <v-card-subtitle>标准输入</v-card-subtitle>
          <v-card-text class="sample">
            {{ testcase.inputView }}
          </v-card-text>
        </v-card>
        <v-card v-if="!!testcase.answerView && testcase.answerView.length > 0" class="mt-2" outlined>
          <v-card-subtitle>标准输出</v-card-subtitle>
          <v-card-text class="sample">
            {{ testcase.answerView }}
          </v-card-text>
        </v-card>
        <v-card v-if="!!testcase.outputView && testcase.outputView.length > 0" class="mt-2" outlined>
          <v-card-subtitle>用户输出</v-card-subtitle>
          <v-card-text class="sample">
            {{ testcase.outputView }}
          </v-card-text>
        </v-card>
        <v-card v-if="!!testcase.comment && testcase.comment.length > 0" class="mt-2" outlined>
          <v-card-subtitle>答案检查器输出</v-card-subtitle>
          <v-card-text class="sample">
            {{ testcase.comment }}
          </v-card-text>
        </v-card>
      </div>
    </template>
  </div>
</template>
<script>
import common from '@/plugins/utils/common'

export default {
  props: {
    submission: {
      type: Object,
      default () {
        return {
          status: '',
          creationTime: '',
          judgeTime: '',
          author: '',
          title: '',
          verdict: '',
          language: '',
          aceLang: 'text',
          time: '',
          memory: '',
          problemId: '',
          submissionId: '',
          code: 'Source code is not available',
          testCases: []
        }
      }
    }
  },
  data () {
    return {
      aceOptions: {
        readOnly: true
      },
      verdictStatus: common.verdictStatus
    }
  }
}
</script>

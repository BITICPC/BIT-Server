<template>
  <b-container id="problem">
    <br />
    <b-row>
      <b-col>
        <h3>#{{ $route.params.id }}. {{ problem.title }}</h3>
        <b-row>
          <b-col class="text-right">
            <b>时间限制：</b>
          </b-col>
          <b-col class="text-left">{{ problem.timeLimit }} ms</b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b>内存限制：</b>
          </b-col>
          <b-col class="text-left">{{ problem.memoryLimit }} megabytes</b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b>评测模式：</b>
          </b-col>
          <b-col class="text-left">
            <template v-if="problem.judgeMode == 'STANDARD'">Standard I/O</template>
            <template v-else>Special Judge</template>
          </b-col>
        </b-row>

        <div class="mt-3">
          <b-button-group>
            <b-button variant="primary">提交</b-button>
            <b-button variant="success">提交记录</b-button>
            <b-button variant="info">统计</b-button>
            <b-button variant="warning">讨论</b-button>
          </b-button-group>
        </div>
        <br />

        <b-card>
          <template v-slot:header>
            <b>题目描述</b>
          </template>
          <b-card-text v-html="problem.legend" />
        </b-card>
        <br />

        <b-card>
          <template v-slot:header>
            <b>输入格式</b>
          </template>
          <b-card-text v-html="problem.input" />
        </b-card>
        <br />

        <b-card>
          <template v-slot:header>
            <b>输出格式</b>
          </template>
          <b-card-text v-html="problem.output" />
        </b-card>
        <br />

        <b-card>
          <template v-slot:header>
            <b>样例</b>
          </template>
          <b-card-text v-for="(sample, index) in problem.samples" :key="index">
            <h6>样例 {{ ++index }} 输入</h6>
            <div class="sample" v-html="sample.input" />
            <h6>样例 {{ index }} 输出</h6>
            <div class="sample" v-html="sample.output" />
          </b-card-text>
        </b-card>
        <br />

        <b-card v-if="problem.notes">
          <template v-slot:header>
            <b>提示</b>
          </template>
          <b-card-text v-html="problem.notes" />
        </b-card>
        <br />
      </b-col>

      <b-col class="bd-toc col-xl-3 d-none d-xl-block">
        <b-card no-body>
          <b-card-body>
            <b-card-text>
              <b>{{ problem.totalSolvedUsers }} 人解决，</b>{{ problem.totalAttemptedUsers }} 人已尝试。<br>
              <b>{{ problem.acceptedSubmissions }} 份提交通过，</b>共 {{ problem.totalSubmissions }} 份提交。
            </b-card-text>
          </b-card-body>
          
          <b-list-group flush>
            <b-list-group-item>
              <b-card-text>
                <b>创建：</b>{{ problem.creationTime }}<br>
                <b>修改：</b>{{ problem.lastUpdateTime }}<br>
                <b>最后提交: </b>{{ problem.lastSubmissionTime }}<br>
                <b>来源: </b>{{ problem.source }}
              </b-card-text>
            </b-list-group-item>
          </b-list-group>
        </b-card><br>

        <b-card sub-title="题目标签">
          <b-card-text >
            <b-badge :variant="`${getColor(tag)}`" v-for="tag in problem.tags" :key="tag">{{ tag }}</b-badge>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from '@/components/api'

export default {
  data() {
    return {
      problem: []
    };
  },
  methods: {
    getColor (tag) {
      let pink = ['模拟', '构造', '二分', '贪心', '数学', '数论', '数据结构']
      let olive = ['字符串', '平衡树', '矩阵', '最大流', '费用流', '上下界网络流']
      let black = ['测试']
      if (pink.includes(tag)) {
        return 'pink'
      } else if (olive.includes(tag)) {
        return 'olive'
      } else if (black.includes(tag)) {
        return 'black'
      }
      return 'blue'
    }
  },
  mounted () {
    api.getPublicProblemDetail(this.$route.params.id).then(res => {
      this.problem = res.data
      console.log(res.data)

      let dateNow = this.$op.moment(new Date())
      let minutes = dateNow.diff(this.$op.moment(res.data.creationTime), 'minute')
      let d = Math.floor(minutes / 1440)
      let h = Math.floor(minutes / 60) % 24
      let m = minutes % 60
      if (d > 30) this.problem.creationTime = d + ' 月前'
      else if (d > 0) this.problem.creationTime = d + ' 天前'
      else if (h > 0) this.problem.creationTime = h + ' 小时前'
      else if (m > 0) this.problem.creationTime = m + ' 分钟前'
      else this.problem.creationTime = '刚刚'

      minutes = dateNow.diff(this.$op.moment(res.data.lastUpdateTime), 'minute')
      d = Math.floor(minutes / 1440)
      h = Math.floor(minutes / 60) % 24
      m = minutes % 60
      if (d > 30) this.problem.lastUpdateTime = d + ' 月前'
      else if (d > 0) this.problem.lastUpdateTime = d + ' 天前'
      else if (h > 0) this.problem.lastUpdateTime = h + ' 小时前'
      else if (m > 0) this.problem.lastUpdateTime = m + ' 分钟前'
      else this.problem.lastUpdateTime = '刚刚'

      minutes = dateNow.diff(this.$op.moment(res.data.lastSubmissionTime), 'minute')
      d = Math.floor(minutes / 1440)
      h = Math.floor(minutes / 60) % 24
      m = minutes % 60
      if (d > 30) this.problem.lastSubmissionTime = d + ' 月前'
      else if (d > 0) this.problem.lastSubmissionTime = d + ' 天前'
      else if (h > 0) this.problem.lastSubmissionTime = h + ' 小时前'
      else if (m > 0) this.problem.lastSubmissionTime = m + ' 分钟前'
      else this.problem.lastSubmissionTime = '刚刚'
    })
  }
};
</script>

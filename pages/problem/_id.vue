<template>
  <b-container id="problem"><br>
    <h3>#{{ $route.params.id }}. {{ problem.title }}</h3>
    <b-row>
      <b-col class="text-right"><strong>时间限制：</strong></b-col>
      <b-col class="text-left">{{ problem.timeLimit }} ms</b-col>
    </b-row>
    <b-row>
      <b-col class="text-right"><strong>内存限制：</strong></b-col>
      <b-col class="text-left">{{ problem.memoryLimit }} megabytes</b-col>
    </b-row>
    <b-row>
      <b-col class="text-right"><strong>评测模式：</strong></b-col>
      <b-col class="text-left"><template v-if="problem.judgeMode == 'STANDARD'">Standard I/O</template>
      <template v-else>Special Judge</template></b-col>
    </b-row>

    <div class="mt-3">
      <b-button-group>
        <b-button variant="primary">提交</b-button>
        <b-button variant="success">提交记录</b-button>
        <b-button variant="info">统计</b-button>
        <b-button variant="warning">讨论</b-button>
      </b-button-group>
    </div><br>

    <b-card>
      <template v-slot:header>
        <strong>题目描述</strong>
      </template>
      <b-card-text>{{ problem.legend }}</b-card-text>
    </b-card><br>

    <b-card>
      <template v-slot:header>
        <strong>输入格式</strong>
      </template>
      <b-card-text>{{ problem.input }}</b-card-text>
    </b-card><br>

    <b-card>
      <template v-slot:header>
        <strong>输出格式</strong>
      </template>
      <b-card-text>{{ problem.output }}</b-card-text>
    </b-card><br>

     <b-card>
      <template v-slot:header>
        <strong>样例</strong>
      </template>
      <b-card-text v-for="(sample, index) in problem.samples" :key="index">
        <h6>样例 {{ ++index }} 输入</h6>
        <div class="sample">{{ sample.input }}</div>
        <h6>样例 {{ index }} 输出</h6>
        <div class="sample">{{ sample.output }}</div>
      </b-card-text>
    </b-card><br>

  </b-container>
</template>
<script>
export default {
    data () {
      return {
        problem: {
          title: '诸神眷顾的幻想乡',
          legend: 'hello world',
          input: 'input description',
          output: 'output description',
          samples: [{
            input: '1 2',
            output: '3'
          }],
          notes: 'notes',
          difficulty: 80,
          tags: [
            "字符串",
            "模拟",
            "数据结构"
          ],
          timeLimit: 1000,
          memoryLimit: 256,
          judgeMode: 'STANDARD',
          totalSubmissions: 100,
          acceptedSubmissions: 80,
          testReady: true
        }
      }
    }
}
</script>

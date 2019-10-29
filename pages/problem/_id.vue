<template>
  <b-container id="problem">
    <br />
    <b-row>
      <b-col>
        <h3>#{{ $route.params.id }}. {{ problem.title }}</h3>
        <b-row>
          <b-col class="text-right">
            <strong>时间限制：</strong>
          </b-col>
          <b-col class="text-left">{{ problem.timeLimit }} ms</b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <strong>内存限制：</strong>
          </b-col>
          <b-col class="text-left">{{ problem.memoryLimit }} megabytes</b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <strong>评测模式：</strong>
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
            <strong>题目描述</strong>
          </template>
          <b-card-text>{{ problem.legend }}</b-card-text>
        </b-card>
        <br />

        <b-card>
          <template v-slot:header>
            <strong>输入格式</strong>
          </template>
          <b-card-text>{{ problem.input }}</b-card-text>
        </b-card>
        <br />

        <b-card>
          <template v-slot:header>
            <strong>输出格式</strong>
          </template>
          <b-card-text>{{ problem.output }}</b-card-text>
        </b-card>
        <br />

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
        </b-card>
        <br />

        <b-card v-if="problem.notes">
          <template v-slot:header>
            <strong>提示</strong>
          </template>
          <b-card-text>{{ problem.notes }}</b-card-text>
        </b-card>
        <br />
      </b-col>

      <b-col class="bd-toc col-xl-3 d-none d-xl-block">
        <b-card no-body>
          <b-card-body>
            <b-card-text>
              <strong>{{ problem.acceptedSubmissions }} 份提交通过，</strong>共 {{ problem.totalSubmissions }} 份提交。
            </b-card-text>
          </b-card-body>
          
          <b-list-group flush>
            <b-list-group-item>
              <b-card-text>
                <strong>创建：</strong><br>
                <strong>修改：</strong><br>
                <strong>最后提交: </strong><br>
                <strong>来源: </strong>
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
export default {
  data() {
    return {
      problem: {
        title: "诸神眷顾的幻想乡",
        legend: "hello world",
        input: "input description",
        output: "output description",
        samples: [
          {
            input: "1 2",
            output: "3"
          }
        ],
        notes: "notes",
        difficulty: 80,
        tags: ["字符串", "模拟", "数据结构", "生成函数"],
        timeLimit: 1000,
        memoryLimit: 256,
        judgeMode: "STANDARD",
        totalSubmissions: 100,
        acceptedSubmissions: 80,
        testReady: true
      }
    };
  },
  methods: {
    getColor (tag) {
      let pink = ['模拟', '构造', '二分', '贪心', '数学', '数论', '数据结构']
      let olive = ['字符串', '平衡树', '矩阵', '最大流', '费用流', '上下界网络流']
      if (pink.includes(tag)) {
        return 'pink'
      } else if (olive.includes(tag)) {
        return 'olive'
      }
      return 'blue'
    }
  }
};
</script>

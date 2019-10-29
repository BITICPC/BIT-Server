<template>
  <b-container><br><b-row>
    <div class="col-8">
      <b-table striped :bordered="true" :items="problemset" :fields="fields" :filter="filter" :busy="isBusy" :show-empty="true">
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:empty="scope">
          <div class="text-center text-info my-2">
            <strong>当前题库中尚未添加任何题目!</strong>
          </div>
        </template>
        <template v-slot:cell(problem)="data">
          <b-link :to="`/problem/${data.value.ID}`">{{ data.value.name }}</b-link>
          <div style="float:right;">
            <b-badge :variant="`${getColor(tag)}`" v-for="tag in data.value.tags" :key="tag">{{ tag }}</b-badge>
          </div>
        </template>
        <template v-slot:cell(problem.totalAccepted)="data">
          <i class="fas fa-user"></i> x {{ data.value }}
        </template>
        <template v-slot:cell(problem.difficulty)="data">
          <b class="text-info">{{ data.value }}</b>
        </template>
      </b-table>
    </div>

    <div class="text-left col-auto">
      <b-card header-tag="header">
        <template v-slot:header>
          <h6 class="mb-0"><strong>题目筛选</strong></h6>
        </template>
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </b-input-group-prepend>
          <b-form-input v-model="filter" type="search" placeholder="请输入关键字"></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''" variant="outline-secondary">清除</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-card>
    </div>
  </b-row></b-container>
</template>

<script>
import api from '@/components/api'

export default {
  data () {
    return {
      problemset: [],
      fields: [
        {
          key: 'problem.ID',
          label: '#',
          sortable: true,
          thStyle: 'width: 60px;',
          class: 'text-center'
        },
        {
          key: 'problem',
          label: '题目名称',
          sortable: false,
        },
        {
          key: 'problem.difficulty',
          label: '难度',
          thStyle: 'width: 60px;',
          sortable: false,
          class: 'text-center'
        },
        {
          key: 'problem.totalAccepted',
          label: '解出数量',
          sortable: true,
          thStyle: 'width: 100px;',
          class: 'text-center'
        }
      ],
      isBusy: false,
      filter: null
    }
  },
  mounted () {
    this.isBusy = true
    api.getPublicProblemset({
      by: 'Id',
      limit: 20
    }).then(res => {
      this.isBusy = false
      res.data.forEach(problem => {
        this.problemset.push({
          problem: {
            ID: problem.archiveId,
            name: problem.title,
            tags: problem.tags,
            difficulty: problem.difficulty,
            totalAccepted: problem.acceptedSubmissions
          }
        })
      })
      console.log(res)
    })
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
}
</script>
<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md10>
        <v-card>
          <v-row>
            <v-col>
              <v-card-title>
                题目列表
              </v-card-title>
              <v-card-subtitle>
                Problem list
              </v-card-subtitle>
            </v-col>
            <v-col>
              <v-text-field
                v-model="search"
                color="purple"
                label="请输入关键字"
                append-icon="mdi-magnify"
                class="mr-4"
                single-line
                hide-details
              />
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="problemset"
            :page.sync="page.index"
            :items-per-page="page.itemsPerPage"
            :search="search"
            :loading="loading"
            @page-count="page.count = $event"
            loading-text="正在加载数据，请稍等..."
            hide-default-footer
          >
            <template v-slot:item.problem.name="item">
              <nuxt-link :to="`/problem/${item.item.problem.id}`">
                {{ item.value }}
              </nuxt-link>
            </template>
            <template v-slot:item.problem.tags="item">
              <v-chip
                v-for="tag in item.value"
                :key="tag"
                :color="getTagColor(tag)"
                class="ma-1"
                dark
                small
              >
                {{ tag }}
              </v-chip>
            </template>
            <template v-slot:item.problem.difficulty="item">
              <v-rating
                :value="item.value / 2"
                color="warning"
                length="3"
                half-increments
                readonly
                dense
              />
            </template>
            <template v-slot:item.problem.totalAccepted="item">
              <v-icon>mdi-account</v-icon>x{{ item.value }}
            </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page.index" :length="page.count" color="purple" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import api from '@/components/utils/api'
import problem from '@/components/utils/problem'

export default {
  data () {
    return {
      problemset: [],
      headers: [
        {
          text: '题号',
          align: 'center',
          sortable: true,
          filterable: true,
          value: 'problem.id'
        },
        {
          text: '题目名称',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'problem.name'
        },
        {
          text: '标签',
          align: 'center',
          sortable: false,
          filterable: false,
          value: 'problem.tags'
        },
        {
          text: '难度',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'problem.difficulty'
        },
        {
          text: '解出数量',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'problem.totalAccepted'
        }
      ],
      page: {
        index: 1,
        count: 0,
        itemsPerPage: 10
      },
      search: '',
      loading: false
    }
  },
  mounted () {
    this.loading = true
    api.getPublicProblemList({
      by: 'Id'
    }).then((res) => {
      res.data.forEach((item) => {
        this.problemset.push({
          problem: {
            id: item.archiveId,
            name: item.title,
            tags: item.tags,
            difficulty: item.difficulty,
            totalAccepted: item.acceptedSubmissions
          }
        })
      })
    }).finally(() => { this.loading = false })
  },
  methods: {
    getTagColor: problem.getTagColor
  }
}
</script>

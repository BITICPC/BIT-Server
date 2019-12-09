<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10" xl="8">
        <v-card>
          <!-- <v-card-title>
            题目列表
          </v-card-title>
          <v-card-subtitle>
            Problem list
          </v-card-subtitle> -->
          <v-data-table
            :headers="headers"
            :items="problemset"
            :options.sync="options"
            :search="search"
            :loading="loading"
            loading-text="正在加载数据，请稍等..."
            disable-filtering
            hide-default-footer
          >
            <template v-slot:item.name="item">
              <nuxt-link :to="`/problem/${item.item.id}`">
                {{ item.value }}
              </nuxt-link>
            </template>
            <template v-slot:item.tags="item">
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
            <template v-slot:item.difficulty="item">
              <v-rating
                :value="item.value / 2"
                color="warning"
                length="3"
                half-increments
                readonly
                dense
              />
            </template>
            <template v-slot:item.totalAccepted="item">
              <v-icon>mdi-account</v-icon>x{{ item.value }}
            </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page.index" :length="page.count" color="purple" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from '@/plugins/utils/api'
import problem from '@/plugins/utils/problem'

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
          value: 'id'
        },
        {
          text: '题目名称',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'name'
        },
        {
          text: '标签',
          align: 'center',
          sortable: false,
          filterable: false,
          value: 'tags'
        },
        {
          text: '难度',
          width: '120',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'difficulty'
        },
        {
          text: '解出数量',
          width: '120',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'totalAccepted'
        }
      ],
      options: {},
      page: {
        index: 1,
        count: -1,
        itemsPerPage: 10
      },
      search: '',
      loading: false
    }
  },
  watch: {
    'page.index' () {
      this.getProblemlist()
    },
    options: {
      handler () {
        this.getProblemlist()
      }
    }
  },
  methods: {
    getTagColor: problem.getTagColor,
    getSortBy () {
      if (this.options.sortBy.length > 0) {
        if (this.options.sortBy[0] === 'difficulty') {
          return 'Difficulty'
        } else if (this.options.sortBy[0] === 'totalAccepted') {
          return 'TotalSolvedUsers'
        }
      }
      return 'ArchiveId'
    },
    getSortDesc () {
      return this.options.sortDesc.length > 0 ? this.options.sortDesc[0] : false
    },
    getProblemlist () {
      this.loading = true
      this.problemset = []
      api.getPublicProblemList({
        by: this.getSortBy(),
        descend: this.getSortDesc(),
        page: this.page.index - 1,
        itemsPerPage: this.page.itemsPerPage
      }).then((res) => {
        res.data.forEach((item) => {
          this.problemset.push({
            id: item.archiveId,
            name: item.title,
            tags: item.tags,
            difficulty: item.difficulty,
            totalAccepted: item.acceptedSubmissions
          })
        })
        if (this.page.count === -1) {
          this.page.count = Math.ceil(res.headers['x-bitwaves-count'] / this.page.itemsPerPage)
        }
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

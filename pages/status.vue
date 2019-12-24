<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="status"
            :loading="loading"
            loading-text="正在加载数据，请稍等..."
            no-data-text="没有任何提交记录"
            disable-filtering
            hide-default-footer
          >
            <template v-slot:item.status="item">
              <template v-if="item.value === 'Pending'">
                <v-icon color="grey" small>
                  mdi-help
                </v-icon>
              </template>
              <template v-else-if="item.value === 'Judging'">
                <v-progress-circular :width="3" :size="16" color="primary" indeterminate />
              </template>
              <template v-else>
                <v-icon color="success" small>
                  mdi-check
                </v-icon>
              </template>
            </template>
            <template v-slot:item.author="item">
              <nuxt-link :to="`/user/${item.value}`">
                {{ item.value }}
              </nuxt-link>
            </template>
            <template v-slot:item.title="item">
              <nuxt-link :to="`/problem/${item.item.problemId}`">
                {{ item.value }}
              </nuxt-link>
            </template>
            <template v-slot:item.verdict="item">
              <span :class="item.value.class">{{ item.value.title }}</span>
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
import common from '@/plugins/utils/common'

export default {
  data () {
    return {
      status: [],
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'status'
        },
        {
          text: '时间',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'creationTime'
        },
        {
          text: '送交者',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'author'
        },
        {
          text: '题目',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'title'
        },
        {
          text: '评测状态',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'verdict'
        },
        {
          text: '评测语言',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'language'
        },
        {
          text: '运行时间',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'time'
        },
        {
          text: '运行内存',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'memory'
        }
      ],
      page: {
        index: 1,
        count: -1,
        itemsPerPage: 15
      },
      loading: false
    }
  },
  watch: {
    'page.index' () {
      this.getStatus()
    }
  },
  mounted () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      this.loading = true
      this.status = []
      const params = {
        page: this.page.index - 1,
        itemsPerPage: this.page.itemsPerPage
      }
      Object.keys(this.$route.query).forEach((element) => {
        params[element] = this.$route.query[element]
      })
      api.getSubmissions(params).then((res) => {
        res.data.forEach((item) => {
          this.status.push({
            status: item.status,
            creationTime: common.getTimeFormat(item.creationTime),
            author: item.author,
            title: item.problemArchiveId + '. ' + item.problemTitle,
            verdict: common.verdictStatus[item.status === 'Finished' ? item.verdict : item.status],
            language: item.language,
            time: (item.status === 'Finished' ? item.time : '0') + ' ms',
            memory: (item.status === 'Finished' ? item.memory : '0') + ' MB',
            problemId: item.problemArchiveId
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

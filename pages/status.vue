<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-dialog v-model="dialog" width="1110">
            <v-card>
              <v-card-title>
                提交记录
                <v-spacer />
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <SubmissionDetail :submission="submissionDetail" />
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-data-table
            :headers="headers"
            :items="status"
            :loading="loading"
            :items-per-page="page.itemsPerPage"
            loading-text="正在加载数据，请稍等..."
            no-data-text="没有任何提交记录"
            disable-filtering
            hide-default-footer
          >
            <template v-slot:item.status="item">
              <template v-if="item.value === 'Pending'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="grey" small v-on="on">
                      mdi-help
                    </v-icon>
                  </template>
                  <span>等待评测</span>
                </v-tooltip>
              </template>
              <template v-else-if="item.value === 'Judging'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-progress-circular :width="3" :size="16" color="indigo lighten-1" indeterminate v-on="on" />
                  </template>
                  <span>正在评测</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="success" small v-on="on">
                      mdi-check
                    </v-icon>
                  </template>
                  <span>评测完成</span>
                </v-tooltip>
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
            <template v-slot:item.language="item">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a v-on="on" @click="showSubmissionDetail(item.item)">{{ item.value }}</a>
                </template>
                <span>查看详细内容</span>
              </v-tooltip>
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
import { mapActions, mapGetters } from 'vuex'
import SubmissionDetail from '@/components/common/submission'
import api from '@/plugins/utils/api'
import common from '@/plugins/utils/common'

export default {
  components: {
    SubmissionDetail
  },
  data () {
    return {
      status: [],
      headers: [
        {
          text: '状态',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'status'
        },
        {
          text: '提交时间',
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
          text: '评测结果',
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
      loading: false,
      dialog: false,
      submissionDetail: {
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
  },
  computed: {
    ...mapGetters(['profile'])
  },
  watch: {
    'page.index' () {
      this.getStatus()
    },
    $route (to, from) {
      this.getStatus()
    }
  },
  mounted () {
    this.getStatus()
  },
  methods: {
    ...mapActions(['newToast']),
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
            judgeTime: common.getTimeFormat(item.judgeTime),
            author: item.author,
            title: item.problemArchiveId + '. ' + item.problemTitle,
            verdict: common.verdictStatus[item.status === 'Finished' ? item.verdict : item.status],
            language: item.language,
            aceLang: common.mapAceLang(item.language),
            time: (item.status === 'Finished' ? item.time : '0') + ' ms',
            memory: (item.status === 'Finished' ? item.memory : '0') + ' MB',
            problemId: item.problemArchiveId,
            submissionId: item.id
          })
        })
        if (this.page.count === -1) {
          this.page.count = Math.ceil(res.headers['x-bitwaves-count'] / this.page.itemsPerPage)
        }
      }).finally(() => { this.loading = false })
    },
    showSubmissionDetail (submission) {
      Object.keys(submission).forEach((element) => {
        this.submissionDetail[element] = submission[element]
      })
      this.submissionDetail.testCases = []
      api.getSubmissionDetail(submission.submissionId, this.profile.jwt).then((res) => {
        if (res.data.judgeResult !== null) {
          this.submissionDetail.testCases = res.data.judgeResult.testCases
        }
        this.submissionDetail.code = res.data.code
        this.dialog = true
      }).catch(() => {
        this.newToast({
          text: '无法加载详细信息！',
          color: 'error',
          icon: 'mdi-alert'
        })
      })
    }
  }
}
</script>

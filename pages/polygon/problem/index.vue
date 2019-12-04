<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="10">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="problemset"
            :search="search"
            :loading="loading"
            :items-per-page="page.itemsPerPage"
            loading-text="正在加载数据，请稍等..."
            disable-sort
            disable-filtering
            hide-default-footer
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Problem List</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <!-- <v-text-field
                  v-model="search"
                  color="purple"
                  label="请输入关键字"
                  append-icon="mdi-magnify"
                  class="hidden-sm-and-down"
                  single-line
                  hide-details
                /> -->
                <v-spacer />
                <v-dialog v-model="dialog" persistent max-width="360px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">
                      <v-icon left>
                        mdi-plus
                      </v-icon>
                      New Problem
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Create Problem Form</v-card-title>
                    <v-card-text>
                      <v-form ref="form">
                        <v-textarea
                          v-model="inputTitle"
                          :rules="nameRules"
                          row-height="1"
                          label="Problem Name"
                          auto-grow
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="grey darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="success darken-1"
                        text
                        @click="createNewProblem"
                      >
                        Submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.problem.working="item">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn :to="`/polygon/problem/${item.value}`" icon v-on="on">
                    <v-icon color="success">
                      mdi-square-edit-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon color="info">
                      mdi-chart-bar
                    </v-icon>
                  </v-btn>
                </template>
                <span>Statistics</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon color="error">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page.index" :length="page.count" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import api from '@/components/utils/api'
import problem from '@/components/utils/problem'

export default {
  layout: 'polygon',
  middleware: 'login',
  data () {
    return {
      problemset: [],
      headers: [
        {
          text: 'Archive ID',
          align: 'center',
          filterable: false,
          value: 'problem.id'
        },
        {
          text: 'Title',
          align: 'center',
          filterable: true,
          value: 'problem.name'
        },
        {
          text: 'Owner',
          align: 'center',
          filterable: true,
          value: 'problem.owner'
        },
        {
          text: 'Created',
          align: 'center',
          filterable: false,
          value: 'problem.created'
        },
        {
          text: 'Updated',
          align: 'center',
          filterable: false,
          value: 'problem.updated'
        },
        {
          text: 'Working',
          align: 'center',
          filterable: false,
          value: 'problem.working'
        }
      ],
      page: {
        index: 1,
        count: -1,
        itemsPerPage: 15
      },
      search: '',
      loading: false,
      dialog: false,
      inputTitle: '',
      nameRules: problem.nameRules
    }
  },
  computed: {
    ...mapGetters(['jwt'])
  },
  watch: {
    'page.index' () {
      this.getProblemset()
    }
  },
  mounted () {
    this.getProblemset()
  },
  methods: {
    ...mapActions(['newToast']),
    getProblemset () {
      this.loading = true
      this.problemset = []
      api.getProblemList({
        page: this.page.index - 1,
        itemsPerPage: this.page.itemsPerPage
      }, this.jwt).then((res) => {
        res.data.forEach((item) => {
          this.problemset.push({
            problem: {
              id: item.archiveId !== null ? item.archiveId : '*',
              name: item.title,
              owner: item.author,
              created: item.creationTime.substr(0, 10) + ' ' + item.creationTime.substr(12, 7),
              updated: item.lastUpdateTime.substr(0, 10) + ' ' + item.lastUpdateTime.substr(12, 7),
              working: item.id
            }
          })
        })
        if (this.page.count === -1) {
          this.page.count = Math.ceil(res.headers['x-bitwaves-count'] / this.page.itemsPerPage)
        }
      }).finally(() => { this.loading = false })
    },
    close () {
      this.dialog = false
      this.inputTitle = ''
      this.$refs.form.resetValidation()
    },
    createNewProblem () {
      if (this.$refs.form.validate()) {
        api.createProblem({
          title: this.inputTitle
        }, this.jwt).then(() => {
          this.newToast({
            text: 'A new problem has been created successfully.',
            color: 'success',
            icon: 'mdi-check-circle'
          })
          this.page.count = -1
          this.getProblemset()
        }).catch(() => {
          this.newToast({
            text: 'Failed to create a new problem.',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.close() })
      }
    }
  }
}
</script>

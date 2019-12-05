<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="12">
        <v-card>
          <v-tabs>
            <v-tab :to="`/polygon/problem/${$route.params.id}`" exact>
              General info
            </v-tab>
            <v-tab :to="`/polygon/problem/${$route.params.id}/statement`" exact>
              Statement
            </v-tab>
            <v-tab disabled>
              Tests
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-form ref="statement" @submit.prevent="updateStatement">
              <v-text-field
                v-model="problem.title"
                class="mb-2"
                :rules="nameRules"
                :loading="loading"
                label="Name"
              />
              <span class="subtitle-1">Legend</span>
              <vue-simplemde v-model="problem.legend" preview-class="markdown-body" :highlight="true" :configs="configs" />
              <span class="subtitle-1">Input</span>
              <vue-simplemde v-model="problem.input" preview-class="markdown-body" :highlight="true" :configs="configs" />
              <span class="subtitle-1">Output</span>
              <vue-simplemde v-model="problem.output" preview-class="markdown-body" :highlight="true" :configs="configs" />
              <span class="subtitle-1">Notes</span>
              <vue-simplemde v-model="problem.notes" preview-class="markdown-body" :highlight="true" :configs="configs" />
              <v-btn :loading="loading" color="success" type="submit">
                <v-icon left>
                  mdi-check
                </v-icon>
                Save
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import hljs from 'highlight.js'
import api from '@/components/utils/api'
import problem from '@/components/utils/problem'
import simplemde from '@/plugins/vue-simplemde'
window.hljs = hljs

export default {
  layout: 'polygon',
  middleware: 'login',
  data: () => ({
    problem: {
      title: '',
      legend: '',
      input: '',
      output: '',
      notes: ''
    },
    nameRules: problem.nameRules,
    configs: simplemde.configs,
    loading: false
  }),
  computed: {
    ...mapGetters(['jwt'])
  },
  mounted () {
    this.getStatement()
  },
  methods: {
    ...mapActions(['newToast']),
    getStatement () {
      this.loading = true
      api.getProblemDetail(this.$route.params.id, this.jwt).then((res) => {
        Object.keys(this.problem).forEach((element) => {
          if (res.data[element] !== null) {
            this.problem[element] = res.data[element]
          }
        })
      }).finally(() => { this.loading = false })
    },
    updateStatement () {
      if (this.$refs.statement.validate()) {
        this.loading = true
        api.editProblemDetail(this.$route.params.id, this.problem, this.jwt).then(() => {
          this.newToast({
            text: 'Successfully updated.',
            color: 'success',
            icon: 'mdi-check-circle'
          })
          window.scrollTo(0, 0)
        }).catch(() => {
          this.newToast({
            text: 'Failed to modify the statement.',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>

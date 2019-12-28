<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" xl="9">
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
              <vue-easymde v-model="problem.legend" preview-class="markdown-body" :highlight="true" :configs="mdeConfigs" />
              <span class="subtitle-1">Input</span>
              <vue-easymde v-model="problem.input" preview-class="markdown-body" :highlight="true" :configs="mdeConfigs" />
              <span class="subtitle-1">Output</span>
              <vue-easymde v-model="problem.output" preview-class="markdown-body" :highlight="true" :configs="mdeConfigs" />
              <span class="subtitle-1">Notes</span>
              <vue-easymde v-model="problem.notes" preview-class="markdown-body" :highlight="true" :configs="mdeConfigs" />
              <v-btn :loading="loading" color="success" type="submit" depressed>
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
import renderMathInElement from 'katex/contrib/auto-render/auto-render'
import hljs from 'highlight.js'
import api from '@/plugins/utils/api'
import problem from '@/plugins/utils/problem'
import common from '@/plugins/utils/common'

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
    loading: false
  }),
  computed: {
    ...mapGetters(['profile']),
    mdeConfigs () {
      return {
        spellChecker: false,
        uploadImage: true,
        imageUploadFunction: (file, onSuccess, onError) => {
          if (!file.type.includes('image/')) {
            onError('The image type is invalid.')
            return
          }
          if (file.size > 1024 * 1024 * 14) {
            onError('The image size should no more than 14 MB.')
            return
          }
          const formData = new FormData()
          formData.append('content', file)
          api.uploadContent(formData, this.profile.jwt).then((res) => {
            onSuccess('http://10.1.139.91/contents/' + res.data.id + '?attachment=false')
          }).catch(() => {
            onError('Failed to upload the image.')
          })
        },
        previewClass: 'editor-preview markdown-body',
        previewRender: (plainText, preview) => {
          setTimeout(() => {
            preview.innerHTML = common.md.render(plainText)
            renderMathInElement(window.document.body)
            window.document.querySelectorAll('pre code').forEach((block) => {
              hljs.highlightBlock(block)
            })
          }, 100)
          return 'Loading...'
        }
      }
    }
  },
  mounted () {
    this.getStatement()
  },
  methods: {
    ...mapActions(['newToast']),
    getStatement () {
      this.loading = true
      api.getProblemDetail(this.$route.params.id, this.profile.jwt).then((res) => {
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
        api.editProblemDetail(this.$route.params.id, this.problem, this.profile.jwt).then(() => {
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

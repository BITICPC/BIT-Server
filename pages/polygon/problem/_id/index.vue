<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="9">
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
            <v-form ref="form" @submit.prevent="updateProfile">
              <v-text-field
                placeholder="stdin"
                label="Input file:"
                hint="Input file name or &quot;stdin&quot; for standard input"
                disabled
              />
              <v-text-field
                placeholder="stdout"
                label="Output file:"
                hint="Output file name or &quot;stdout&quot; for standard output"
                disabled
              />
              <v-text-field
                v-model="problem.timeLimit"
                :rules="timeRules"
                :loading="loading"
                type="number"
                suffix="ms"
                label="Time Limit:"
                hint="Time limit per test (between 500 ms and 10000 ms)"
              />
              <v-text-field
                v-model="problem.memoryLimit"
                :rules="memoryRules"
                :loading="loading"
                type="number"
                suffix="megabytes"
                label="Memory Limit:"
                hint="Memory limit (between 32 megabytes and 1024 megabytes)"
              />
              <v-autocomplete
                v-model="problem.judgeMode"
                :rules="[v => !!v || 'This field is required']"
                :loading="loading"
                :items="judgeOptions"
                label="Judge Mode:"
                hint="The mode to judge the problem (from &quot;standard I/O&quot; or &quot;interactive&quot; or &quot;special judge&quot;)"
                class="mb-2"
              />
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
      <v-col class="pt-md-0 pb-0 pl-md-0" cols="12" md="3">
        <v-card>
          <v-card-title>
            Problem profile
          </v-card-title>
          <v-card-subtitle>id={{ $route.params.id }}</v-card-subtitle>
          <v-divider />
          <v-list>
            <v-list-item dense>
              <v-list-item-content class="font-weight-bold">
                Name
              </v-list-item-content>
              <v-list-item-content class="align-end">
                {{ problem.title }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="font-weight-bold">
                Archive ID
              </v-list-item-content>
              <v-list-item-content class="align-end">
                <template v-if="!!problem.archiveId">
                  {{ problem.archiveId }}
                </template>
                <template v-else>
                  <span class="grey--text">
                    Not public
                  </span>
                </template>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="font-weight-bold">
                Statement
              </v-list-item-content>
              <v-list-item-content class="align-end">
                <template v-if="!!problem.legend && !!problem.input && !!problem.output">
                  <span class="success--text">
                    Yes
                  </span>
                </template>
                <template v-else>
                  <span class="error--text">
                    Not ready
                  </span>
                </template>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="font-weight-bold">
                Tests
              </v-list-item-content>
              <v-list-item-content class="align-end">
                <template v-if="problem.testReady">
                  <span class="success--text">
                    Yes
                  </span>
                </template>
                <template v-else>
                  <span class="error--text">
                    None
                  </span>
                </template>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="font-weight-bold">
                Difficulty
              </v-list-item-content>
              <v-list-item-content>
                <v-rating
                  v-model="problem.difficulty"
                  color="warning"
                  length="3"
                  half-increments
                  dense
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-card-text>
            <span class="subheading">Tags</span><br>
            <v-chip
              v-for="(tag, index) in problem.tags"
              :key="tag"
              :color="getTagColor(tag)"
              class="mr-1 mt-1"
              dark
              close
              @click:close="removeTag(index)"
            >
              {{ tag }}
            </v-chip>
            <v-form ref="tag">
              <v-textarea
                v-model="inputTag"
                class="mt-1"
                :rules="tagRules"
                :error-messages="getErrorByAttributes('tag')"
                :loading="inputTagLoading"
                row-height="1"
                label="Add one new tag"
                append-icon="mdi-plus"
                auto-grow
                @click:append="addTag"
                @blur="resetTagValidation"
              />
            </v-form>
          </v-card-text>
        </v-card>
        <template v-if="!!problem.archiveId">
          <v-dialog v-model="dialog" persistent max-width="320">
            <template v-slot:activator="{ on }">
              <v-btn class="mt-3 warning" block v-on="on">
                Change into private
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Confirmation
              </v-card-title>
              <v-card-text>
                Please confirm that you want to make this problem to be private.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="grey darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="editProblemArchive(false)">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-else>
          <v-dialog v-model="dialog" persistent max-width="320">
            <template v-slot:activator="{ on }">
              <v-btn class="mt-3 blue" dark block v-on="on">
                Make public
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                Making public Form
              </v-card-title>
              <v-card-text>
                <v-form ref="archive">
                  <v-text-field
                    v-model="inputArchiveId"
                    :rules="[v => !!v || 'Field should not be empty']"
                    :loading="inputArchiveIdLoading"
                    :error-messages="getErrorByAttributes('archiveId')"
                    type="number"
                    color="purple"
                    label="Archive ID"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="grey darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="editProblemArchive(true)">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <v-btn class="mt-3 error" block>
          Discard
        </v-btn>
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
  data: () => ({
    problem: {
      title: 'unknow',
      legend: null,
      input: null,
      output: null,
      archiveId: null,
      timeLimit: null,
      memoryLimit: null,
      judgeMode: null,
      testReady: false,
      difficulty: -1,
      tags: []
    },
    timeRules: problem.timeRules,
    memoryRules: problem.memoryRules,
    tagRules: [
      v => !!v || 'Tag should not be empty'
    ],
    judgeOptions: ['文本比较', 'Special Judge', '交互模式'],
    loading: false,
    tagDictionary: [],
    inputTag: '',
    inputTagLoading: false,
    dialog: false,
    errorCode: 200,
    inputArchiveId: null,
    inputArchiveIdLoading: false
  }),
  computed: {
    ...mapGetters(['jwt'])
  },
  watch: {
    'problem.difficulty' (value, oldValue) {
      if (oldValue >= 0) {
        api.editProblemDetail(this.$route.params.id, {
          difficulty: this.problem.difficulty * 2
        }, this.jwt).catch(() => {
          this.newToast({
            text: 'Failed to change the difficulty.',
            color: 'error',
            icon: 'mdi-alert'
          })
        })
      }
    }
  },
  mounted () {
    this.getGeneralInfo()
  },
  methods: {
    ...mapActions(['newToast']),
    getGeneralInfo () {
      this.loading = true
      api.getProblemDetail(this.$route.params.id, this.jwt).then((res) => {
        Object.keys(this.problem).forEach((element) => {
          if (res.data[element] !== null) {
            this.problem[element] = res.data[element]
          }
          this.problem.judgeMode = problem.judgeMode[res.data.judgeMode]
          this.problem.difficulty = res.data.difficulty / 2
        })
      }).finally(() => { this.loading = false })
    },
    updateProfile () {
      if (this.$refs.form.validate()) {
        this.loading = true
        api.editProblemDetail(this.$route.params.id, {
          timeLimit: this.problem.timeLimit,
          memoryLimit: this.problem.memoryLimit,
          judgeMode: problem.mapJudgeMode[this.problem.judgeMode]
        }, this.jwt).then(() => {
          this.newToast({
            text: 'Successfully updated.',
            color: 'success',
            icon: 'mdi-check-circle'
          })
        }).catch(() => {
          this.newToast({
            text: 'Failed to save your changes.',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    },
    getErrorByAttributes (field) {
      if (field === 'tag' && this.problem.tags.includes(this.inputTag)) {
        return 'Tag already exists.'
      }
      if (field === 'archiveId' && this.errorCode === 409) {
        return 'The archive ID conflicts with others.'
      }
      return null
    },
    close () {
      this.dialog = false
      this.inputArchiveId = null
      this.$refs.archive.resetValidation()
    },
    editProblemArchive (value) {
      if (value) {
        if (this.$refs.archive.validate()) {
          this.inputArchiveIdLoading = true
          this.errorCode = 200
          api.addIntoPublicProblemList({
            id: this.$route.params.id,
            archiveId: this.inputArchiveId
          }, this.jwt).then(() => {
            this.problem.archiveId = this.inputArchiveId
            this.newToast({
              text: 'Successfully updated.',
              color: 'success',
              icon: 'mdi-check-circle'
            })
            this.close()
          }).catch((err) => {
            if (err !== undefined) {
              this.errorCode = err.status
            }
            this.newToast({
              text: 'Failed to modify archive attribute.',
              color: 'error',
              icon: 'mdi-alert'
            })
          }).finally(() => { this.inputArchiveIdLoading = false })
        }
      } else {
        api.deleteFromPublicProblemList([this.problem.archiveId], this.jwt).then(() => {
          this.problem.archiveId = null
          this.newToast({
            text: 'Successfully updated.',
            color: 'success',
            icon: 'mdi-check-circle'
          })
        }).catch(() => {
          this.newToast({
            text: 'Failed to modify archive attribute.',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.dialog = false })
      }
    },
    getTagColor: problem.getTagColor,
    resetTagValidation () {
      if (this.inputTag.length === 0) {
        this.$refs.tag.resetValidation()
      }
    },
    addTag () {
      if (this.$refs.tag.validate() && this.getErrorByAttributes('tag') === null) {
        this.inputTagLoading = true
        api.addProblemTag(this.$route.params.id, [this.inputTag], this.jwt).then(() => {
          this.problem.tags.push(this.inputTag)
          this.inputTag = ''
          this.resetTagValidation()
        }).catch(() => {
          this.newToast({
            text: 'Failed to add the new tag.',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.inputTagLoading = false })
      }
    },
    removeTag (index) {
      api.deleteProblemTag(this.$route.params.id, [this.problem.tags[index]], this.jwt).then(() => {
        this.problem.tags.splice(index, 1)
      }).catch(() => {
        this.newToast({
          text: 'Failed to remove this tag.',
          color: 'error',
          icon: 'mdi-alert'
        })
      })
    }
  }
}
</script>

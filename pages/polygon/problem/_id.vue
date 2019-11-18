<template>
  <b-container id="polygon"><br>
    <b-row>
      <b-col>
        <b-tabs pills><br>
          <b-alert v-model="formErrors.hasError" variant="warning">
            <h5>Attention please</h5>
            <li v-for="errMessage in formErrors.errMessage" :key="errMessage">{{ errMessage }}</li>
          </b-alert>
          <b-tab title="General info" active>
            <b-form @submit="saveChanges">
              <b-form-group label="Input file:" description='Input file name or "stdin" for standard input'>
                <b-form-input placeholder="stdin" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Output file:" description='Output file name or "stdout" for standard output'>
                <b-form-input placeholder="stdout" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Time Limit:" description="Time limit per test (between 250 ms and 15000 ms)">
                <b-input-group append="ms">
                  <b-form-input placeholder="1000" type="number" v-model="problem.timeLimit"></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Memory Limit:" description="Memory limit (between 4 MB and 1024 MB)">
                <b-input-group append="MB">
                  <b-form-input placeholder="256" type="number" v-model="problem.memoryLimit"></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Judge Mode:" description='The mode to judge the problem (from "standard I/O" or "interactive" or "special judge")'>
                <b-form-select v-model="problem.judgeMode" :options="judgeOptions">
                  <!-- <template v-slot:first>
                    <option :value="null" disabled>-- Please select one mode --</option>
                  </template> -->
                </b-form-select>
              </b-form-group>
              <b-button type="submit" variant="success"><i class="fas fa-check"></i> Save</b-button>
            </b-form>
          </b-tab>
          <b-tab title="Statement">
            <b-form @submit="saveChanges">
              <b-form-group label="Name:">
                <b-form-input v-model="problem.title"></b-form-input>
              </b-form-group>
              <b-form-group label="Legend:">
                <div class="mavonEditor">
                  <mavon-editor :boxShadow="false" :toolbars="markdownOption" v-model="problem.legend"/>
                </div>
              </b-form-group>
              <b-form-group label="Input format:">
                <div class="mavonEditor">
                  <mavon-editor :boxShadow="false" :toolbars="markdownOption" v-model="problem.input"/>
                </div>
              </b-form-group>
              <b-form-group label="Output format:">
                <div class="mavonEditor">
                  <mavon-editor :boxShadow="false" :toolbars="markdownOption" v-model="problem.output"/>
                </div>
              </b-form-group>
              <b-form-group label="Note:">
                <div class="mavonEditor">
                  <mavon-editor :boxShadow="false" :toolbars="markdownOption" v-model="problem.notes"/>
                </div>
              </b-form-group>
              <b-button type="submit" variant="success"><i class="fas fa-check"></i> Save</b-button>
            </b-form>
          </b-tab>
          <!-- <b-tab title="Files"></b-tab> -->
          <!-- <b-tab title="Checker"></b-tab> -->
          <b-tab title="Tests"></b-tab>
          <!-- <b-tab title="Solution files"></b-tab> -->
        </b-tabs>
      </b-col>

      <b-col class="bd-toc col-xl-3 d-none d-xl-block">
        <b-card header="Problem profile">
          <b-card-text>
            <li>Problem: {{ problem.title }}</li>
            <li>Statement: 
              <template v-if="statementValidation">
                <b-badge variant="success">Yes</b-badge>
              </template>
              <template v-else>
                <b-badge variant="danger">None</b-badge>
              </template>
            </li>
            <li>Tests: 
              <template v-if="!!problem.tests">
                <b-badge variant="success">Yes</b-badge>
              </template>
              <template v-else>
                <b-badge variant="danger">None</b-badge>
              </template>
            </li>
          </b-card-text>
            <hr>
          <b-list-group flush>
            <!-- <b-list-group-item> -->
              <b-card-text>
                <b-row>
                  <b-col cols="3" style="padding-right: 0px;">Tags:</b-col>
                  <b-col>
                    <b-badge :variant="`${getTagColor(tag)}`" v-for="(tag, index) in problem.tags" :key="index">{{ tag }}<button type="button" class="close" v-on:click="eraseTag(index)">×</button></b-badge>
                  </b-col>
                </b-row>
                <div style="margin-top: 10px;"><b-form-select v-model="tagSelected" :options="tagOptions" size="sm">
                  <template v-slot:first>
                    <option :value="null" disabled>-- Please select one tag --</option>
                  </template>
                </b-form-select></div>
                <b-row style="margin-top: 10px;">
                  <b-col cols="5" style="padding-right: 0px;">Difficulty:</b-col>
                  <b-col><b-form-input size="sm" placeholder="0" type="number" v-model="problem.difficulty" min="1" max="10"></b-form-input></b-col>
                </b-row>
              </b-card-text>
            <!-- </b-list-group-item> -->
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from '@/components/common/api'
import problem from '@/components/common/problem'
import mavon from '@/plugins/vue-mavon-editor'

export default {
  layout: 'polygon',
  data () {
    return {
      problem: {
        title: '',
        legend: '',
        input: '',
        output: '',
        notes: '',
        difficulty: 0,
        tags: [],
        timeLimit: 1000,
        memoryLimit: 256,
        judgeMode: ''
      },
      formErrors: {
        hasError: false,
        errMessage: []
      },
      markdownOption: mavon.markdownOption,
      tagOptions: problem.tags,
      tagSelected: null,
      judgeOptions: problem.judgeMode
    }
  },
  mounted () {
    api.getProblemDetail(this.$route.params.id, this.$store.state.user.jwt).then(res => {
      Object.keys(this.problem).forEach(element => {
        if (res.data[element] !== null) {
          this.problem[element] = res.data[element]
        }
      })
      this.validation()
    })
  },
  computed: {
    tags () {
      return this.problem.tags
    },
    difficulty () {
      return this.problem.difficulty
    }
  },
  watch: {
    tagSelected (value) {
      if (this.problem.tags.indexOf(value) === -1) {
        this.problem.tags.push(value)
      }
    },
    tags (value) {
      api.editProblemDetail(this.$route.params.id, this.problem, this.$store.state.user.jwt)
    },
    difficulty (value) {
      api.editProblemDetail(this.$route.params.id, this.problem, this.$store.state.user.jwt)
    }
  },
  methods: {
    getTagColor: problem.getTagColor,
    eraseTag (index) {
      this.problem.tags.splice(index, 1)
    },
    statementValidation () {
      return this.problem.title.length > 0 && this.problem.legend.length > 0 && this.problem.input.length > 0 && this.problem.output.length > 0;
    },
    validation () {
      this.formErrors.errMessage = []
      if (!this.statementValidation()) {
        this.formErrors.errMessage.push('problem statement should not be empty.')
      }
      if (!this.problem.tests) {
        this.formErrors.errMessage.push('There are no test points available for this problem.')
      }
      return this.formErrors.hasError = this.formErrors.errMessage.length > 0
    },
    saveChanges (event) {
      event.preventDefault()
      api.editProblemDetail(this.$route.params.id, this.problem, this.$store.state.user.jwt).then(res => {
        this.$bvToast.toast('Changes has been saved successfully.', {
          title: 'Polygon message',
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
          solid: true
        })
      }).catch(err => {
        this.$bvToast.toast('Failed to save your changes.', {
          title: 'Polygon message',
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          solid: true
        })
      })
      this.validation()
      window.scrollTo(0,0);
    }
  }
}
</script>
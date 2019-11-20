<template>
  <b-container><br>
    <b-row align-h="between" style="margin-left: auto; ">
      <b-input-group style="width: 20em; padding-bottom: 15px">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-search"></i></span>
        </b-input-group-prepend>
        <b-form-input v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''" variant="outline-secondary">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <div style="padding-bottom: 15px; padding-right: 15px;"><b-button variant="secondary" v-b-modal.modal-prevent-closing><i class="fas fa-plus-circle"></i> Add Problem</b-button></div>
    </b-row>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create Problem Form"
      ok-title="Submit"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name:"
          label-for="name-input"
          invalid-feedback="Name is required at least 2 words."
        >
          <b-form-input
            id="name-input"
            v-model="problem.title"
            :state="nameState"
            required />
        </b-form-group>
        <b-form-group
          :state="judgeModeState"
          label="Judge Mode:"
          label-for="judge-mode-input"
          invalid-feedback="Judge mode is required"
        >
          <b-form-select
            id="judge-mode-input"
            v-model="problem.judgeMode"
            :options="judgeOptions"
            required />
        </b-form-group>
      </form>
    </b-modal>

    <b-table
      striped
      responsive
      class="text-center"
      :bordered="true"
      :items="problemset"
      :fields="fields"
      :filter="filter"
      :busy="isBusy"
      :show-empty="true"
      :stickyColumn="true"
      sort-by="id"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(working)="data">
        <b-button-group>
          <b-button variant="outline-success" size="sm" :to="`/polygon/problem/${data.value}`">Enter</b-button>
          <b-button variant="outline-info" size="sm">Statistics</b-button>
          <b-button variant="outline-danger" size="sm">Delete</b-button>
        </b-button-group>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import api from '@/components/common/api'
import problem from '@/components/common/problem'

export default {
  layout: 'polygon',
  data () {
    return {
      problemset: [],
      fields: [
        {
          key: "id",
          label: "#",
          sortable: true,
          thStyle: "width: 60px;"
        },
        {
          key: "title",
          label: "Title"
        },
        {
          key: "owner",
          label: "Owner",
          thStyle: "width: 100px;"
        },
        {
          key: "created",
          label: "Created",
          thStyle: "width: 200px;"
        },
        {
          key: "updated",
          label: "Updated",
          thStyle: "width: 200px;"
        },
        {
          key: "working",
          label: "Working",
          thStyle: "width: 240px;"
        }
      ],
      isBusy: false,
      filter: null,
      problem: {
        title: '',
        judgeMode: null
      },
      judgeOptions: problem.judgeMode,
      nameState: null,
      judgeModeState: null
    }
  },
  mounted () {
    this.updateProblemList()
  },
  computed: {
    name () {
      return this.problem.title
    },
    judgeMode () {
      return this.problem.judgeMode
    }
  },
  watch: {
    name (value) {
      this.nameState = value.length > 1
    },
    judgeMode (value) {
      this.judgeModeState = !!this.judgeMode
    }
  },
  methods: {
    updateProblemList () {
      this.isBusy = true
      api.getProblemList({
        page: 0,
        itemsPerPage: 20
      }, this.$store.state.user.jwt).then(res => {
        this.problemset = []
        res.data.forEach(problem => {
          this.problemset.push({
            id: problem.archiveId !== null ? problem.archiveId : '*',
            title: problem.title,
            owner: problem.author,
            created: problem.creationTime.substr(0, 10) + ' ' + problem.creationTime.substr(12, 7),
            updated: problem.lastUpdateTime.substr(0, 10) + ' ' + problem.lastUpdateTime.substr(12, 7),
            working: problem.id
          })
        })
        this.isBusy = false
      }).catch(err => {
        this.isBusy = false
      })
    },
    resetModal () {
      this.problem.title = ''
      this.problem.judgeMode = null
      this.nameState = this.judgeModeState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.nameState || !this.judgeModeState) {
        if (this.nameState === null) this.nameState = false
        if (this.judgeModeState === null) this.judgeModeState = false
        this.$bvToast.toast('Failed to create a new problem.', {
          title: 'Polygon message',
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          solid: true
        })
        return
      }
      api.createProblem(this.problem, this.$store.state.user.jwt).then(res => {
        this.$bvToast.toast('A new problem has been created successfully.', {
          title: 'Polygon message',
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
          solid: true
        })
        this.updateProblemList()
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }).catch(err => {
        this.$bvToast.toast('Failed to create a new problem.', {
          title: 'Polygon message',
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          solid: true
        })
      })
    }
  }
}
</script>
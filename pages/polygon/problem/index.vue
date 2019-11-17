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
      <div style="padding-bottom: 15px; padding-right: 15px;"><b-button variant="secondary"><i class="fas fa-plus-circle"></i> Add Problem</b-button></div>
    </b-row>

    <b-table
      striped
      class="text-center"
      :bordered="true"
      :items="problemset"
      :fields="fields"
      :filter="filter"
      :busy="isBusy"
      :show-empty="true"
      :sticky-header="true"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(working)="data">
        <b-button-group>
          <b-button variant="outline-primary" size="sm" :to="`/polygon/problem/${data.value}`">Enter</b-button>
          <b-button variant="outline-warning" size="sm">Statistics</b-button>
          <b-button variant="outline-danger" size="sm">Delete</b-button>
        </b-button-group>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import api from '@/components/api'

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
      filter: null
    }
  },
  mounted () {
    this.isBusy = true
    api.getProblemList({
      page: 0,
      itemsPerPage: 20
    }, this.$store.state.user.jwt).then(res => {
      res.data.forEach(problem => {
        this.problemset.push({
          id: problem.archiveId,
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
  }
}
</script>
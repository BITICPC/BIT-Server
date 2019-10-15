<template>
    <div class="container"><br>
      <b-input-group style="width: 20em; margin-right: 77px;">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-search"></i></span>
        </b-input-group-prepend>
        <b-form-input v-model="filter" type="search" placeholder="请输入查找的用户名"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''" variant="outline-secondary">清除</b-button>
        </b-input-group-append>
      </b-input-group><br>

      <!-- <b-table style="text-align: center;" primary-key="username" id="table-transition" striped :bordered="true" :items="ranklist" :fields="fields" :tbody-transition-props="transProps" :filter="filter" :per-page="perPage" :current-page="currentPage"> -->

      <b-table style="text-align: center;" striped :bordered="true" :items="ranklist" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :busy="isBusy">
        <template v-slot:table-busy>
          <div class="text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(index)="user">{{ (currentPage - 1) * perPage + user.index + 1 }}</template>
        <template v-slot:cell(signature)="user"><span v-html="user.value"></span></template>
      </b-table>

      <b-pagination v-model="currentPage" align="center" :total-rows="rows" :per-page="perPage"></b-pagination>
    </div>
</template>

<script>
import api from '@/components/api'

export default {
  data () {
    return {
      ranklist: [],
      transProps: {
        name: 'flip-list'
      },
      fields: [
        {
          key: 'index',
          label: '#',
          sortable: false,
          thStyle: 'width: 60px;'
        },
        {
          key: 'username',
          label: '用户名',
          sortable: true,
          thStyle: 'width: 150px;'
          
        },
        {
          key: 'signature',
          label: '个性签名',
          sortable: false
        },
        {
          key: 'accepted',
          label: '通过数量',
          sortable: true,
          thStyle: 'width: 100px;'
        },
        {
          key: 'attempted',
          label: '尝试数量',
          sortable: false,
          thStyle: 'width: 100px;'
        }
      ],
      isBusy: false,
      filter: null,
      perPage: 6,
      currentPage: 1
    }
  },
  mounted () {
    this.isBusy = true
    api.getRanklist({
      by: 'TotalProblemsAccepted',
      limit: 20
    }).then(res => {
      res.data.forEach(user => {
        this.ranklist.push({
          username: user.username,
          signature: '这个家伙很懒，什么都没有写',
          accepted: user.totalProblemsAccepted,
          attempted: user.totalProblemsAttempted
        })
      })
      this.isBusy = false
    })
  },
  computed: {
    rows () {
      return this.ranklist.length
    }
  }
}
</script>
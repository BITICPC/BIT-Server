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

      <b-table style="text-align: center;" id="table-transition" primary-key="username"
        striped :bordered="true" :items="ranklist" :fields="fields" :tbody-transition-props="transProps" :filter="filter">
        <template v-slot:cell(index)="user">{{ user.index + 1 }}</template>
        <template v-slot:cell(signature)="user"><span v-html="user.value"></span></template>
      </b-table>
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
          sortable: false
        },
        {
          key: 'username',
          label: '用户名',
          sortable: true
          
        },
        {
          key: 'signature',
          label: '个性签名',
          sortable: false
        },
        {
          key: 'accepted',
          label: '通过数量',
          sortable: true
        },
        {
          key: 'attempted',
          label: '尝试数量',
          sortable: true
        }
      ],
      filter: null
    }
  },
  mounted () {
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
      // console.log(this.ranklist)
    })
  }
}
</script>
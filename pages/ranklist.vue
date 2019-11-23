<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            用户排名
            <v-spacer />
            <v-text-field
              v-model="search"
              label="请输入关键字"
              append-icon="mdi-magnify"
              single-line
              hide-details
            />
          </v-card-title>
          <v-card-subtitle>
            User ranklist
          </v-card-subtitle>
          <v-data-table
            :headers="headers"
            :items="ranklist"
            :page.sync="page.index"
            :items-per-page="page.itemsPerPage"
            :search="search"
            :loading="loading"
            @page-count="page.count = $event"
            loading-text="正在加载数据，请等待..."
            hide-default-footer
          >
            <!-- <template v-slot:item="user">
              <tr :align="user.headers[0].align">
                <td>{{ options.itemsPerPage * (options.page - 1) + user.index + 1  }}
                <td>{{ user.item.username }}</td>
                <td>{{ user.item.signature }}</td>
                <td>{{ user.item.accepted }}</td>
                <td>{{ user.item.attempted }}</td>index
              </tr>
            </template> -->
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page.index" :length="page.count" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import api from '@/components/utils/api'

export default {
  data () {
    return {
      ranklist: [],
      headers: [
        {
          text: '排名',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'index'
        },
        {
          text: '用户名',
          align: 'center',
          sortable: true,
          filterable: true,
          value: 'username'
        },
        {
          text: '个性签名',
          align: 'center',
          sortable: false,
          filterable: true,
          value: 'signature'
        },
        {
          text: '通过数量',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'accepted'
        },
        {
          text: '尝试数量',
          align: 'center',
          sortable: true,
          filterable: false,
          value: 'attempted'
        }
      ],
      page: {
        index: 1,
        count: 0,
        itemsPerPage: 10
      },
      search: '',
      loading: false
    }
  },
  mounted () {
    this.loading = true
    api.getRanklist({
      by: 'TotalProblemsAccepted',
      limit: 1000
    }).then((res) => {
      res.data.forEach((user, index) => {
        this.ranklist.push({
          index: index + 1,
          username: user.username,
          signature: '这个家伙很懒，什么都没有写',
          accepted: user.totalProblemsAccepted,
          attempted: user.totalProblemsAttempted
        })
      })
    }).finally(() => { this.loading = false })
  }
}
</script>

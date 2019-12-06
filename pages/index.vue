<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="9">
        <v-card>
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon>
                mdi-bullhorn
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>公告版</v-list-item-title>
              <v-list-item-subtitle>Announcements</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-data-table
            :headers="announcementHeaders"
            :items="announcements"
            :loading="loading"
            loading-text="正在加载数据，请稍等..."
            disable-sort
            disable-filtering
            hide-default-footer
          >
            <template v-slot:item.title="item">
              <nuxt-link :to="`/article/${item.item.id}`">
                {{ item.value }}
              </nuxt-link>
            </template>
            <template v-slot:item.author="item">
              <nuxt-link :to="`/user/${item.value}`">
                {{ item.value }}
              </nuxt-link>
            </template>
          </v-data-table>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey darken-1"
              to="/article"
              text
            >
              <v-icon left>
                mdi-arrow-right
              </v-icon>
              查看全部公告
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="pt-md-0 pb-0 pl-md-0">
        <v-card>
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon>
                mdi-poll
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>用户排名</v-list-item-title>
              <v-list-item-subtitle>User ranklist</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-data-table
            :headers="ranklistHeaders"
            :items="ranklist"
            :loading="loading"
            loading-text="正在加载数据，请稍等..."
            disable-sort
            disable-filtering
            hide-default-footer
          >
            <template v-slot:item.username="item">
              <nuxt-link :to="`/user/${item.value}`">
                {{ item.value }}
              </nuxt-link>
            </template>
          </v-data-table>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey darken-1"
              to="/ranklist"
              text
            >
              <v-icon left>
                mdi-account
              </v-icon>
              查看全部用户
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from '@/components/utils/api'
import common from '@/components/utils/common'

export default {
  data () {
    return {
      announcements: [],
      announcementHeaders: [
        {
          text: '标题',
          value: 'title'
        },
        {
          text: '发布时间',
          align: 'center',
          width: '150',
          value: 'time'
        },
        {
          text: '作者',
          align: 'center',
          width: '150',
          value: 'author'
        }
      ],
      ranklist: [],
      ranklistHeaders: [
        {
          text: '#',
          value: 'rank'
        },
        {
          text: '用户名',
          align: 'center',
          value: 'username'
        },
        {
          text: '解题数量',
          align: 'center',
          value: 'accepted'
        }
      ],
      loading: false
    }
  },
  mounted () {
    this.loading = true
    api.getAnnouncements({
      page: 0,
      itemsPerPage: 5
    }).then((res) => {
      res.data.forEach((item) => {
        this.announcements.push({
          id: item.id,
          title: item.title,
          author: item.author,
          time: common.getTimeDifferent(item.creationTime)
        })
      })
    })
    api.getRanklist({
      by: 'TotalProblemsAccepted',
      descend: true,
      page: 0,
      itemsPerPage: 5
    }).then((res) => {
      res.data.forEach((user, index) => {
        this.ranklist.push({
          rank: index + 1,
          username: user.username,
          accepted: user.totalProblemsAccepted
        })
      })
    }).finally(() => { this.loading = false })
  }
}
</script>

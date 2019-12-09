<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="11" xl="9">
        <v-breadcrumbs class="pl-0 pt-0 py-3" :items="items" divider=">">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="articles"
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
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page.index" :length="page.count" color="purple" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from '@/plugins/utils/api'

export default {
  data () {
    return {
      items: [
        {
          text: '讨论'
        },
        {
          text: '全局板块',
          to: '/article'
        }
      ],
      headers: [
        {
          text: '标题',
          class: 'subtitle-2 font-weight-bold',
          value: 'title'
        },
        {
          text: '作者',
          class: 'subtitle-2 font-weight-bold',
          align: 'center',
          width: '150',
          value: 'author'
        },
        {
          text: '发布时间',
          class: 'subtitle-2 font-weight-bold',
          align: 'center',
          width: '180',
          value: 'time'
        }
      ],
      articles: [],
      page: {
        index: 1,
        count: -1,
        itemsPerPage: 10
      },
      loading: false
    }
  },
  watch: {
    'page.index' () {
      this.getArticles()
    }
  },
  mounted () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      this.loading = true
      this.articles = []
      api.getAnnouncements({
        page: this.page.index - 1,
        itemsPerPage: this.page.itemsPerPage
      }).then((res) => {
        res.data.forEach((item) => {
          this.articles.push({
            id: item.id,
            title: item.title,
            author: item.author,
            time: item.creationTime.substr(0, 10) + ' ' + item.creationTime.substr(12, 7)
          })
        })
        if (this.page.count === -1) {
          this.page.count = Math.ceil(res.headers['x-bitwaves-count'] / this.page.itemsPerPage)
        }
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

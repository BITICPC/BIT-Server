<template>
  <div class="container">
    <br>

    <div class="input-group" style="width: 20em; margin-right: 77px;">
      <div class="input-group-prepend"><span class="input-group-text table-head"><i class="fas fa-search"></i></span></div>
      <input type="text" class="form-control" placeholder="用户名" aria-label="username" aria-describedby="searchBtn" v-model="targetName">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="searchBtn" @click="searchUser()">查找用户</button>
      </div>
    </div>

    <br>

  <table class="table table-bordered ranklist">
    <thead><tr class="table-head">
      <th scope="col" style="width: 60px;">#</th>
      <th scope="col" style="width: 150px;">用户名</th>
      <th scope="col">个性签名</th>
      <th scope="col" style="width: 100px;">通过数量</th>
    </tr></thead>
    <tbody>
      <tr v-for="(user, index) in ranklist" :key="index">
        <td>{{ ++index }}</td>
        <td>{{ user.username }}</td>
        <td> 这个家伙很懒，什么都没有写 </td>
        <td>{{ user.totalAccepted }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      ranklist: {},
      targetName: ''
    }
  },
  mounted () {
    api.getRanklist({
      by: 'TotalProblemsAccepted',
      limit: 20
    }).then(res => {
      this.ranklist = res.data
    })
  },
  methods: {
    searchUser () {
      if (this.targetName.length) {
        api.getUserInfo(this.targetName).then(res => {
          this.ranklist = {}
          this.ranklist[0] = {
            username: res.data.username,
            totalAccepted: res.data.totalAccepted
          }
        }).catch(() => {
          this.ranklist = {}
        })
      } else {
        api.getRanklist({
          by: 'TotalProblemsAccepted',
          limit: 20
        }).then(res => {
          this.ranklist = res.data
        })
      }
    }
  }
}
</script>

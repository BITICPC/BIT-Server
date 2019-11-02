<template>
  <b-container><br>
    <b-row align-h="between" style="margin-left: auto; ">
      <b-input-group style="width: 20em; padding-bottom: 15px">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-search"></i></span>
        </b-input-group-prepend>
        <b-form-input v-model="filter" type="search" placeholder="请输入关键字"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''" variant="outline-secondary">清除</b-button>
        </b-input-group-append>
      </b-input-group>
      <div style="padding-bottom: 15px"><b-button variant="secondary"><i class="fas fa-plus-circle"></i> 添加题目</b-button></div>
    </b-row>

    
  </b-container>
</template>
<script>
import api from '@/components/api'

export default {
  layout: 'polygon',
  data () {
    return {
      problemset: []
    }
  },
  mounted () {
    api.getProblemList({
      page: 0,
      itemsPerPage: 20
    }, this.$store.state.user.jwt).then(res => {
      console.log(res.data)
    })
  }
}
</script>
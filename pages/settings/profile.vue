<template>
  <div class="container">
    <b-form @submit="saveProfile">
      <h5 class="control-label">昵称</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="Nickname" v-model="formProfile.nickname" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">学校</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-school"></i></span>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="Official School" v-model="formProfile.school" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">学号</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-id-card"></i></span>
        </b-input-group-prepend>
        <b-form-input type="number" placeholder="Student's ID" v-model="formProfile.studentId" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">个人主页</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-blog"></i></span>
        </b-input-group-prepend>
        <b-form-input type="url" placeholder="https://blog.example.com/" v-model="formProfile.blogUrl"></b-form-input>
      </b-input-group>

      <h5 class="control-label">邮箱</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-envelope"></i></span>
        </b-input-group-prepend>
        <b-form-input type="email" placeholder="example@bitoj.com" v-model="formProfile.email" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">手机号</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-phone"></i></span>
        </b-input-group-prepend>
        <b-form-input type="number" placeholder="Mobile Phone Number" v-model="formProfile.phone" required></b-form-input>
      </b-input-group>

      <b-button type="submit" variant="primary"><i class="fas fa-cloud-upload-alt"></i> 保存</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formProfile: {
        nickname: '',
        school: '',
        studentId: '',
        blogUrl: '',
        email: '',
        phone: ''
      },
      formStatus: {
        hasError: false,
        hasSucceed: false,
        message: []
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['setProfile']),
    init () {
      let profile = this.$store.state.user.profile
      // console.log(this.$store.state)
      Object.keys(this.formProfile).forEach(element => {
        if (profile[element] !== undefined) {
          if (this.formProfile[element] !== undefined) {
            this.formProfile[element] = profile[element]
          }
        }
      })
    },
    validation () {
      this.formStatus.message = []
      this.formStatus.hasSucceed = false
      if (this.formProfile.school.length < 3) {
        this.formStatus.message.push('学校名长度必须大于2位')
      }
      if (this.formProfile.studentId.length !== 10) {
        this.formStatus.message.push('学号格式错误')
      }
      if (this.formProfile.phone.length !== 11) {
        this.formStatus.message.push('手机号格式错误')
      }
      return this.formStatus.hasError = this.formStatus.message.length > 0
    },
    saveProfile (event) {
      event.preventDefault()
      if (!this.validation()) {
        this.setProfile(this.formProfile).then(() => {
          this.formStatus.hasSucceed = true
          this.formStatus.message = ['修改个人资料成功！']
          this.$emit('status', this.formStatus)
        })
      } else {
        this.$emit('status', this.formStatus)
      }
    }
  }
}
</script>
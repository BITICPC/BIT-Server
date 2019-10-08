<template>
  <div class="container">
    <br>

    <div class="alert alert-success" role="alert" v-if="showSucceed">修改成功！</div>

    <div class="alert alert-warning" role="alert" v-if="Object.keys(editError).length">
      <h5><Strong>保存失败</strong></h5>
        <ul>
          <li v-for="errNickname in editError.Nickname" :key="errNickname">{{ errNickname }}</li>
          <li v-for="errSchool in editError.School" :key="errSchool">{{ errSchool }}</li>
          <li v-for="errStudentId in editError.StudentId" :key="errStudentId">{{ errStudentId }}</li>
          <li v-for="errEmail in editError.Email" :key="errEmail">{{ errEmail }}</li>
        </ul>
    </div>

    <div class="card"><div class="card-body"><div class="row">
      <div class="col-3">
        <div class="card"><img class="card-img-top user-ico" src="/static/img/user_ico.jpg" alt="Card image cap"></div>

        <br>

        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
          <a class="nav-link setting active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">个人资料</a>
          <a class="nav-link setting" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab" aria-controls="v-pills-account" aria-selected="false">账号信息</a>
          <a class="nav-link setting" id="v-pills-security-tab" data-toggle="pill" href="#v-pills-security" role="tab" aria-controls="v-pills-security" aria-selected="false">安全设置</a>
        </div>
      </div>

      <div class="col-9">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <div class="container-fluid">
              <h3>个人资料设置</h3><br>

              <div class="row">
                <div class="col-6">
                  <h5 class="control-label">昵称</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
                    <input type="text" class="form-control" placeholder="Nickname" v-model="formProfile.nickname">
                  </div>

                  <h5 class="control-label">学校</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-school"></i></span></div>
                    <input type="text" class="form-control" placeholder="Official School" v-model="formProfile.school">
                  </div>

                  <h5 class="control-label">学号</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-id-card"></i></span></div>
                    <input type="number" class="form-control" placeholder="Student's ID" v-model="formProfile.studentId">
                  </div>

                  <br><button type="button" class="btn btn-success" @click="saveProfile()"><i class="fas fa-cloud-upload-alt"></i> 保存</button>
                </div>

                <div class="col-6">
                  <h5 class="control-label">个人主页</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-blog"></i></span></div>
                    <input type="url" class="form-control" placeholder="https://blog.example.com/" v-model="formProfile.blogUrl">
                  </div>

                  <h5 class="control-label">邮箱</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
                    <input type="email" class="form-control" placeholder="example@bitoj.com" v-model="formProfile.email">
                  </div>

                  <h5 class="control-label">手机号</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i></span></div>
                    <input type="number" maxlength="11" class="form-control" placeholder="Mobile Phone Number" v-model="formProfile.phone">
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
            <div class="container-fluid">
              <h3>账号信息设置</h3><br>

              <div class="row">
                <div class="col-6">
                  <h5 class="control-label">用户名</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
                    <input type="text" class="form-control" placeholder="Username" v-model="formAccount.username" disabled>
                  </div>

                  <h5 class="control-label">新密码</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-lock"></i></span></div>
                    <input type="password" class="form-control" placeholder="New Password" v-model="formAccount.password">
                  </div>

                  <h5 class="control-label">确认密码</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-question"></i></span></div>
                    <input type="password" class="form-control" placeholder="Password Confirmation">
                  </div>

                  <br><button type="button" class="btn btn-success"><i class="fas fa-cloud-upload-alt"></i> 确认</button>
                </div>

                <div class="col-6"></div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab">

          </div>
        </div>
      </div>

    </div></div></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formProfile: {
        nickname: '',
        phone: '',
        email: '',
        school: '',
        studentId: '',
        blogUrl: ''
      },
      formAccount: {
        username: '',
        password: ''
      },
      editError: {},
      showSucceed: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['setProfile']),
    init () {
      let profile = this.$store.state.user.profile
      // console.log(profile)
      Object.keys(profile).forEach(element => {
        if (profile[element] !== undefined) {
          if (this.formProfile[element] !== undefined) {
            this.formProfile[element] = profile[element]
          }
          if (this.formAccount[element] !== undefined) {
            this.formAccount[element] = profile[element]
          }
        }
      })
    },
    saveProfile () {
      let params = Object.assign({}, this.formProfile)
      this.setProfile(params).then(() => {
        this.showSucceed = true
        this.editError = {}
      }).catch(err => {
        this.showSucceed = false
        this.editError = err
      })
    }
  }
}
</script>

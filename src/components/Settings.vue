<template>
  <div class="container">
    <br><br>

    <div class="card"><div class="card-body"><div class="row">
      <div class="col-3">
        <div class="card"><img class="card-img-top user-ico" src="/static/img/user_ico.jpg" alt="Card image cap"></div>

        <br>

        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
          <a class="nav-link setting active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Profile</a>
          <a class="nav-link setting" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab" aria-controls="v-pills-account" aria-selected="false">Account</a>
          <a class="nav-link setting" id="v-pills-security-tab" data-toggle="pill" href="#v-pills-security" role="tab" aria-controls="v-pills-security" aria-selected="false">Security</a>
        </div>
      </div>

      <div class="col-9">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <div class="container-fluid">
              <h3>Profile Setting</h3><br>

              <div class="row">
                <div class="col-6">
                  <h5 class="control-label">Nickname</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
                    <input type="text" class="form-control" placeholder="your nickname">
                  </div>

                  <h5 class="control-label">School</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-school"></i></span></div>
                    <input type="text" class="form-control" placeholder="official school">
                  </div>

                  <h5 class="control-label">Student's ID</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-id-card"></i></span></div>
                    <input type="number" class="form-control" placeholder="ID card number" v-model="formProfile.studentId">
                  </div>

                  <br><button type="button" class="btn btn-success" @click="saveProfile()"><i class="fas fa-cloud-upload-alt"></i> Save</button>
                </div>

                <div class="col-6">
                  <h5 class="control-label">Blog</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-blog"></i></span></div>
                    <input type="url" class="form-control" placeholder="https://blog.example.com/">
                  </div>

                  <h5 class="control-label">E-mail</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
                    <input type="email" class="form-control" placeholder="example@bitoj.com">
                  </div>

                  <h5 class="control-label">Phone Number</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i></span></div>
                    <input type="number" maxlength="11" class="form-control" placeholder="mobile phone number" v-model="formProfile.phone">
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
            <div class="container-fluid">
              <h3>Account Setting</h3><br>

              <div class="row">
                <div class="col-6">
                  <h5 class="control-label">Username</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
                    <input type="text" class="form-control" placeholder="user name" v-model="profile.username" disabled>
                  </div>

                  <h5 class="control-label">New Password</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
                    <input type="password" class="form-control" placeholder="new password">
                  </div>

                  <h5 class="control-label">Confirmation</h5>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-question"></i></span></div>
                    <input type="password" class="form-control" placeholder="confirm your password">
                  </div>

                  <br><button type="button" class="btn btn-success"><i class="fas fa-cloud-upload-alt"></i> Save</button>
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
import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  data () {
    return {
      formProfile: {
        phone: '',
        studentId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    saveProfile () {
      let params = Object.assign({}, this.formProfile)
      // console.log(params)
      api.changeUserInfo(this.profile.username, params).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

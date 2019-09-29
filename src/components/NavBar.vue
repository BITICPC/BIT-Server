<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <router-link class="navbar-brand hidden-sm-down" to="/">BIT Online Judge</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuDefault" aria-controls="menuDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><router-link class="nav-link" to="/home"><i class="fas fa-home"></i> Home</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/problem"><i class="fas fa-book-open"></i> Problems</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/contest"><i class="fas fa-trophy"></i> Contests</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/status"><i class="fas fa-file-code"></i> Status</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/rank"><i class="fas fa-list-ol"></i> Rank</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/about"><i class="fas fa-question-circle"></i> About</router-link></li>
        </ul>

        <template v-if="!isLogin">
          <router-link class="nav-link justify-content-center" to="/Login"><button type="button" class="btn btn-outline-secondary btn-sm"><i class="fas fa-sign-in-alt"></i> Login</button></router-link>

          <router-link class="nav-link justify-content-center" to="/join"><button type="button" class="btn btn-outline-info btn-sm"><i class="fas fa-user-plus"></i> Sign up</button></router-link>
        </template>
        <template v-else>
          <ul class="navbar-nav ml-auto"><li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i class="fas fa-user"></i> {{ user.username }}</a>
            <div class="dropdown-menu">
              <a class="dropdown-item disabled" href='#'>User</a>
              <a class="dropdown-item" href="#" ><i class="fas fa-history"></i> Submissions</a>
              <a class="dropdown-item" href="#" ><i class="fas fa-user-cog"></i> Settings</a>
              <a class="dropdown-item" href="#" ><i class="fas fa-sign-out-alt fa-fw"></i> Logout</a>
            </div>
          </li></ul>
        </template>
    </div></nav>
</template>

<script>
export default {
  
}
</script>
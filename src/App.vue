<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <a class="navbar-brand hidden-sm-down">BIT Online Judge</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuDefault" aria-controls="menuDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active"><router-link class="nav-link" to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/problem"><i class="fas fa-book-open"></i> Problems</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/contest"><i class="fas fa-trophy"></i> Contests</router-link></li>
          <li class="nav-item "><router-link class="nav-link" to="/standing"><i class="fas fa-list-ol"></i> Standing</router-link></li>
        </ul>
        <router-link class="nav-link justify-content-center" to="/Login"><button type="button" class="btn btn-outline-secondary btn-sm"><i class="fas fa-sign-in-alt"></i> Login</button></router-link>

        <router-link class="nav-link justify-content-center" to="/join"><button type="button" class="btn btn-outline-info btn-sm"><i class="fas fa-user-plus"></i> Sign up</button></router-link>
    </div></nav>
    <!-- <div class="container"><img src="./assets/vuelogo.png"></div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

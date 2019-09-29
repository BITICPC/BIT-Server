<template>
    <div class="container">
        <br>
        <h2>登录 <small>Please Sign in</small></h2>
        <br>

        <h5 class="control-label">用户名 <small>Username</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
            <input type="text" class="form-control" placeholder="Username">
        </div>

        <h5 class="control-label">密码 <small>Password</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
            <input type="password" class="form-control" placeholder="Password">
        </div>

        <div class="col-sl-10">
            <div class="checkbox"><label><input type="checkbox"> 保持登陆状态</label></div>
            <button type="submit" class="btn btn-success"><i class="fas fa-cloud-upload-alt"></i> Submit</button>
            </div>
    </div>
</template>

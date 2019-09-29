<template>
    <div class="container">
        <br><h2>注册 <small>Registration</small></h2><br>

        <h5 class="control-label">用户名 <small>User Name</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
            <input type="text" class="form-control" placeholder="User Name">
        </div>

        <h5 class="control-label">手机号 <small>Phone Number</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i></span></div>
            <input type="number" maxlength="11" class="form-control" placeholder="Phone Number">
        </div>

        <h5 class="control-label">密码 <small>Password</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
            <input type="password" class="form-control" placeholder="Password">
        </div>

        <h5 class="control-label">确认密码 <small>Confirmation</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-question"></i></span></div>
            <input type="password" class="form-control" placeholder="Confirmation">
        </div>

        <button type="submit" class="btn btn-success"><i class="fas fa-registered"></i> Submit</button>

    </div>
</template>

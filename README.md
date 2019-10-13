# BitServer

> BitServer 是 BIT Online Judge 的前端 Web 应用，使用基于 Vue.js 的 Nuxt.js 框架进行编写。

## Todo Lists

文档：<https://docs.qq.com/doc/DSmlhbWdZbkpjVkpr>

### UI

- [x] 使用基于 Nuxt.js 的 Bootstrap-Vue

### Login

- [ ] 加入 Session、Cookie 使登录可持久化
- [x] 前端加入注册、登录和修改信息的错误提示

### Profile

- [x] 支持信息修改并更新
- [ ] 个性签名
- [ ] 密码修改
- [ ] 安全板块
  - [ ] 邮箱验证
  - [ ] 手机验证

### Ranklist

- [x] 使用关键字检索
- [x] 使用关键属性排序
- [x] 分页

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

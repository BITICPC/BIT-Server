# BitServer

BitServer 是 BIT Online Judge 的前端 Web 应用，采用 Vue.js 框架进行编写。

## Todo Lists

文档：<https://docs.qq.com/doc/DSmlhbWdZbkpjVkpr>

### UI

- [x] 考虑重构 Bootstrap 4 或者换新的 UI（？？？发出问号）
  - 重构进度：1/3

### Login

- [ ] 加入 Session、Cookie 使登录可持久化
- [ ] 错误提示不够人性化

### Profile

- [ ] 个性签名
- [ ] 邮箱验证
- [ ] 手机验证
- [ ] 完善安全板块（现在没想好放啥）

### Ranklist

- [ ] 使用关键字检索

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

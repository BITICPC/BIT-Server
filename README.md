# BitServer

> BitServer 是 BIT Online Judge 的前端 Web 应用，使用基于 Vue.js 的 Nuxt.js 框架进行编写。

- [x] ~~Bootstrap-Vue 写不下去了...正在使用 Vuetify 重构 UI 中。~~ Done!

文档：https://docs.qq.com/doc/DSmlhbWdZbkpjVkpr

进度：https://github.com/orgs/BITICPC/projects/2

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

## Docker

This project has been dockerized. To build a docker image from source, execute the following command at the root directory of this project:

```shell
$ docker build .
```

The docker image built can be started by the following command:

```shell
$ docker run -d -p 80:3000 <image-id>
```

If you want to bind the HTTP server to a different local address, start the image by the following command:

```shell
$ docker run -d -p <local-address>:80:3000 <image-id>
```

where `<local-address>` is the local address of the host machine that the HTTP server will be bound to.

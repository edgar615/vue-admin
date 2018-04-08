# WEB

https://juejin.im/post/59097cd7a22b9d0065fb61d2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```
npm install --registry=https://registry.npm.taobao.org
```
scss
```
npm install node-sass sass-loader --save-dev
```
```
会自动安装bulma
npm install buefy
```
```
npm install bulma
```
```
安装扩展
npm install bulma-extensions 全部
npm install bulma-divider 具体的扩展
```
树插件
```
npm install vue-simple-tree
```
layer提示框插件
```
npm install vue-layer
```
```
 /**
    * 样式命名规范
    * - 要么使用 scoped
    * - 要么所有样式都基于组件的名称来做 BEM 的命名规范
    *   例如: app.vue 组件的名字为 app
    *         那么样式应该是 .app {} .app__element {} .app--modifier {}
    */
   /*
    .app,
    .app__main-box,
    .app__router-nav-box,
    .app__main-content-box {
        height: 100%;
    }
    .app__navbar {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
    }
    .app__main-box {
        padding-top: 0px;
    }
    .app__router-nav-box {
        overflow: auto;
    }
    .app__main-content-box {
        overflow: auto;
        padding-top: 5px;
    }
  */
```

富文本编辑器

```
npm install vue-html5-editor
```

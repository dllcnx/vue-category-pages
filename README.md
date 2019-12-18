# smx-vue-template

## 第一步
```
npm install
```

### 启动服务
```
npm run serve
```

### 生产编译
```
npm run build    普通多页面编译,所有独有资源不具体区分
npm run build-s  分离多页面编译,所有独有资源分离存放
```


### vue脚手架配置
 [配置参考](https://cli.vuejs.org/zh/config/)


注意事项:

在build-s分离编译模式下,如果要添加发布路径.需要修改两个地方:

1. vue.config.js里面的publicPath.
2. script里面splitBuild.js里面的publicPath变量(不加前后/).

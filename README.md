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
在build-s分离编译模式下,不支持publicPath的'./'和''配置(资源路径会出现问题).

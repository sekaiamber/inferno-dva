# inferno-with-dva-example

Example of inferno with dva.

## 关于deploy时报错

当执行`npm run deploy`时，调用Prd环境编译，会报错：

```shell
ERROR in index.452ed022.js from Terser
TypeError: Cannot read property 'minify' of undefined
    at minify (/Users/xuxiaomeng/work/inferno-dva/node_modules/_terser-webpack-plugin@1.2.1@terser-webpack-plugin/dist/minify.js:175:23)
    at TaskRunner.boundWorkers (/Users/xuxiaomeng/work/inferno-dva/node_modules/_terser-webpack-plugin@1.2.1@terser-webpack-plugin/dist/TaskRunner.js:68:40)
    at enqueue (/Users/xuxiaomeng/work/inferno-dva/node_modules/_terser-webpack-plugin@1.2.1@terser-webpack-plugin/dist/TaskRunner.js:89:14)
    at tasks.forEach (/Users/xuxiaomeng/work/inferno-dva/node_modules/_terser-webpack-plugin@1.2.1@terser-webpack-plugin/dist/TaskRunner.js:109:9)
...
```

这是`terser`升级到`3.16.0`时修改了export语法，导致`terser-webpack-plugin`取不到`terser`了。

解决方案：

1. `node_modules`找到`terser-webpack-plugin`的目录。
2. 找到`dist/minify.js`。
3. 找到`_terser.default.minify`，修改为`_terser.minify`。

# UMI 区块指南

## 区块仓库
1. 该仓库为自定义区块的存放仓库，该项目中，每一个区块作为顶级子目录，区块内部有统一的目录结构
1. 区块目录以`Horizon`样板区块为参考，有`package.json`依赖文件和`src`代码目录

## 区块开发
开发一个区块分为以下几个步骤
1. 本地拉取`umi-blocks`整个项目代码目录
1. 在根目录下建立自定义区块目录，例如命名为`Yosemite`，为了简化配置，可以直接复制`Horizon`样板区块中的文件列表到新自定义区块，然后更新相关名称
1. 在新区块目录下进行代码开发，主要目标是实现功能逻辑和页面模板可复用
1. 调试和运行区块，在根目录下执行`yarn start {区块名称}`命令，即可运行区块页面。例如`yarn start Yosemite`
1. 发布区块，将代码使用git提交，然后push到`umi-blocks`仓库即可。
1. 至此，一个完整的区块开发流程完成，恭喜💐

## 区块使用
在项目中使用自定义区块分为以下几个步骤
1. 项目中添加`@umijs/plugin-blocks`开发依赖，`package.json`的`devDependecies`中添加`"@umijs/plugin-blocks": "^2.2.1",`
1. 确定区块名称和仓库地址，要到代码目录地址，例如上一节开发的`Yosemite`区块，访问链接是`https://github.com/wittontech/umi-blocks/tree/master/Yosemite`
1. 使用添加区块命令`umi block add  https://github.com/wittontech/umi-blocks/tree/master/Yosemite --closeFastGithub=true --path=/places/yosemite`
   > `--closeFastGithub`指定我们使用自定义GitHub仓库，否则会走默认区块仓库查找，必然找不到，***非常重要***。`--path`指定该区块在新项目中的route
1. 如果顺利不报错，区块就安装好了，会在`src/pages/`目录下找到下载的区块代码，然后根据需求自定义即可
1. ***Happy Coding Forever***

正所谓万事开头难，配置rollup最难的一步也正是开头的第一步。不过没关系。

微笑面对危险，梦想成真不会遥远！

鼓起勇气坚定向前，奇迹一定会出现！

![image](https://user-gold-cdn.xitu.io/2019/7/2/16bb0bc8e547a185?w=213&h=240&f=jpeg&s=8396)

## 开始游戏（初始化项目）
> npm init

没错骚年，一路回车，你已经成功完成了本文最难以及最核心的一步——初始化了一个项目。相信你在剩余的几个简单步骤中必定势如破竹，一路到底。

## 创建角色&场景（初始化文件目录）
![image](https://user-gold-cdn.xitu.io/2019/7/2/16bb0bc8f8ab5837?w=512&h=390&f=png&s=72493)

接下来按照这个文件树创建相应的场景与角色（文件夹&文件）。是不是没有骗你，soeasy~

build文件夹下是rollup的三元猛将。相信用过歪脖派壳（webpack）的小伙伴对这种配置文件都比较熟悉。

大哥刘备rollup.config.js,是rollup打包的通用配置文件，也就是说无论你想干啥肯定是要先过大哥这一关，人家必定是大哥（三人中的核心，主要技能是控制打包流程、代码转换、cmd规范的js转换、eslint代码规范）。

二哥关羽rollup.config.dev.js,是rollup在开发环境的配置文件，也就是说在平时开发的时候是一定会与关二哥打交道的，不过也不用担心什么，关二哥义字当先，必先帮你打平开发环境的天下。（主要技能是启动本地服务、开启热重载）

三弟张飞rollup.config.prod.js,是rollup构建生产文件的配置文件。人送外号猛张飞，一人走上rollup生产的长坂坡。（主要是技能是混淆生产代码）

dist文件夹是张飞输出的地方（生产构建后会将打包的相关资源放到这里）

example是关羽打副本的地方（开发时，用于调试）

src 则是刘备选择打开城门的入口（打包的入口）

package.json 里边记录着武器库（各种依赖&balabala）

到此，本片教程完结。![image](https://user-gold-cdn.xitu.io/2019/7/2/16bb0bc8e5df0358?w=240&h=240&f=gif&s=24181)

奥对，上述只是对打造rollup脚手架的幻想，毕竟想象很丰富，现实很骨感。
那么接下来，我们就先对三元猛将进行技能加点以及武器配备。

## 分配武器&点技能点(安装各种依赖&rollup插件)

### 首先给队伍中的核心，刘备大哥备rollup.config.js配发武器点击技能点 
武器篇
```
npm i -D rollup // 核心武器，rollup基础模块，没安它还玩个球。
npm i -D rollup-plugin-babel // 副武器，用于转换代码。
npm i -D @babel/core  @babel/preset-env @babel/plugin-transform-classes // 副武器必要镶嵌的强化宝石 分别是babel核心、自动辨别加载相应babel模块、class转换
npm i -D rollup-plugin-node-resolve // 辅助武器，用于识别无法识别node_modules的模块
npm i -D rollup-plugin-commonjs // 辅助武器，用于将node_modules中的cmd规范的模块转换为es语法
npm i -D rrollup-plugin-eslint // 代码规范检查插件
// 一键安装武器
npm i -D rollup rollup-plugin-babel @babel/core  @babel/preset-env @babel/plugin-transform-classes  rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-eslint
```
技能加点篇 rollup.config.js
```
const path = require('path');
// 装载武器
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {eslint} = require('rollup-plugin-eslint')
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

// 
module.exports = [
  {
    input: resolveFile('src/index.js'), // 打包文件入口
    output: {
      file: resolveFile('dist/index.js'),  // 输出文件
      format: 'umd', // 以何种模式输出
      name: 'Demo', // umd输出模式必填name
    },
    plugins: [ // 武器插槽装载上述武器（各种插件）
      resolve(), 
      commonjs(),
      eslint({
        include: ['src/**'],
        exclude: ['node_modules/**']
      }),
      babel({
        babelrc: false,
        presets: [
          ['@babel/preset-env', { modules: false }]
        ],
        plugins: [
          ["@babel/plugin-transform-classes", {
            "loose": true
          }]
        ]
      }),
    ],
  },
]
```
TIPS之eslint，如果童鞋们需要配合IDE进行eslint代码检查,那么我们还需要安装为此打造的武器。
```
// 安装eslint
npm i -g eslint
// 然后在我们在项目的根目录执行
eslint --init // 根据需求进行选择，然后会生成一个.eslintrc.**的文件，这里边就是eslint的配置。这样就可以配合你的IDE进行代码检查了并且rollup-plugin-eslint会自动加载这个配置文件。更多eslint配置请查看eslint文档奥~
```
### 接下来时给二哥关羽rollup.config.dev.js配备
武器篇
```
npm i -D rollup-plugin-serve // 用于启动本地server
npm i -D rollup-plugin-livereload // 配合rollup-plugin-serve 监听开发文件自动刷新浏览器，再也不用手动刷新了~
```
技能加点篇 rollup.config.dev.js
```
process.env.NODE_ENV = 'development'; // 设置环境变量为开发模式

// 加载武器
const path = require('path');
const serve = require('rollup-plugin-serve'); 
const configList = require('./rollup.config'); // 叫上大哥一起干仗
const livereload = require('rollup-plugin-livereload');
const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

// 与大哥刘备合体（合并rollup.config.js中的基础配置）
configList.map((config, index) => {

  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({  // 装备serve武器并配置参数
          port: 3000,
          contentBase: [resolveFile('')]
        }),
        livereload(resolveFile('dist')) // 启动重载，并且监听dist目录
      ]
    ]
  }

  return config;
})


module.exports = configList;
```
### 接下来时给三弟张飞rollup.config.prod.js配备
武器篇
```
npm i -D rollup-plugin-uglify // 混淆代码专用
// TIPS：上述武器不支持es模块打包，所以想输出uglify的es模块需要使用下边的武器哦~
npm i -D rollup-plugin-uglify-es
```
技能加点篇
```
process.env.NODE_ENV = 'production'; // 设置环境变量为生产
// 加载武器
// const { uglify } = require('rollup-plugin-uglify');
import uglify from 'rollup-plugin-uglify-es';
const configList = require('./rollup.config'); // 同样叫上大哥刘备一起干仗

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

// 与大哥刘备合体（合并rollup.config.js中的基础配置）
configList.map((config, index) => {

  config.output.sourcemap = false;
  config.plugins = [
    ...config.plugins,
    ...[
      uglify() // 装备uglify武器
    ]
  ]

  return config;
})

module.exports = configList;
```
那么到现在，三元大将的的武器&技能已经点好，那么如何让他们听命于你，听从指挥呢？
你只需要对着他们说月棱镜威力，变身！~（此次自带BGM） 就可以啦！~

## 配置启动命令让三位宝宝听话
找到一直不太起眼的package.json,其中有一个scripts字段
```
  "scripts": {
    "build": "node_modules/.bin/rollup -c ./build/rollup.config.prod.js", // 构建命令，调用张飞 rollup -c 指定配置文件
    "dev": "node_modules/.bin/rollup -w -c ./build/rollup.config.dev.js", // 启动生产命令，调用关羽 rollup -w  开启监听模式，文件变化随时知道
  },
```
为什么没有调用大哥刘备的命令，因为调用张飞与关羽的时候他们都会叫上大哥哦。
在调用之前，我们先构建一个简单的副本，要不把他们叫出来也没什么意义。

副本入口src/index.js
```
class Demo {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log(this.name)
  }
}

export default Demo
```
副本demo页面 example/index.html
```
<html>
  <head>
  </head>
  <body>
    <p>hello mozlee</p>
    <script src="./../dist/index.js"></script>
    <script>
      var demo = new Demo('MozLee');
      demo.sayName();
    </script>
  </body>
</html>
```

现在我们试试我们的命令好不好使

调用关羽
![image](https://user-gold-cdn.xitu.io/2019/7/2/16bb0bc8f8834d7b?w=826&h=271&f=gif&s=27695)
打开http://localhost:3000的控制台。发现了控制台输出了MozLee。成功调用关羽。
那么关羽其他的技能大家可以自己试试奥。（热重载）

调用张飞
![image](https://user-gold-cdn.xitu.io/2019/7/2/16bb0bc8f8b9f627?w=826&h=271&f=gif&s=20851)
打包成功，看一下输出文件dist/index.js 如下。
```
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self,e.Demo=n())}(this,function(){"use strict";return function(){function e(e){this.name=e}return e.prototype.sayName=function(){console.log(this.name)},e}()});
```
已经生成了混淆的代码，调用张飞成功。
至此，我们算是完成了rollup的常用配置，可以说打通了rollup的入门级副本。

## 最后说点什么
文中各类武器都有更详细的配置，需要大家自己去参看对应的文档，不在文中一一例举。

另付其他搭建rollup参考文档
- [rollupjs中文官方文档](https://www.rollupjs.com/guide/zh)
- [Rollup.js 实战学习笔记](https://chenshenhai.github.io/rollupjs-note/)
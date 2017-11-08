# 使用必读

> 本手册适用于半新人阅读。本项目支持IE9及以上浏览器。在使用或修改该项目前，你必须熟读该文档，以保证你不会再接下来的修改中出现BUG或其他未知问题。该文档尽力包含你所能想到的各种配置问题。而项目本身的写法和部分语法使用则不在该文档讨论范围内。请使用命令行工具或其他自带命令行工具的编译器进行命令输入。本说明所有命令均为windows系统下的格式。Mac及Linux用户自行请增加命令前置符。

***

## **STEP1 项目安装**
本项目开发和打包均依赖nodeJS，所以你需要搜索并下载安装nodeJS。安装这里并没什么好说的，只要不停的下一步下一步即可，并没有什么环境变量和其他依赖。

在安装完成nodeJS后，需要对npm做准备设置，以保证你能够访问npm服务器，以下为具体命令。

``` bash
# 针对不能直连外网的环境需设置npm代理，username和password为你平时的上网账号和密码
npm config set proxy="http://username:password@your.proxy:port"
npm config set https-proxy="http://username:password@your.proxy:port"

# 如果由于墙的原因导致访问国外服务器速度过慢，则可考虑进行以下设置
npm config set registry "https://registry.npm.taobao.org"

# 如果能够直连外网，则建议使用淘宝的cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

```

在网络代理设置完毕后，即可进行项目环境依赖的安装，以下为具体命令

``` bash
# 安装项目依赖
npm install

# 开启本地服务，默认为localhost:8080
npm run dev

# 项目打包，构建生产环境
npm run build

# 打包过程中想查看具体报告则可以通过以下命令实现
npm run build --report
```
到此为止，你已经完成了项目环境的搭建。

***

## **STEP2 项目结构**
本项目的开发代码目录结构如下，在编码时请按照规则放置代码

``` bash
./root
├── ...
│   ├── mock/                               // 模拟请求
├── src                                     
│   ├── components                          
│   │   ├── platformCom                     // 平台通用组件
│   │   │   ├── ...
│   │   │   ├── install.js                  // 平台组件全局注册
│   │   ├── customCom                       // 项目组件
│   │   │   ├── global/                     // 项目全局组件
│   │   │   │   ├── ...     
│   │   │   │   ├── install.js              // 项目全局组件安装
│   │   │   ├── locale/                     // 项目局部组件
│   ├── lang                                // 国际化文件
│   │   ├── en.js                           
│   │   ├── zh-cn.js
│   │   ├── ...
│   ├── page                                // 项目页面
│   │   ├── ...                             // 页面名称
│   │   │   ├── *.vue                       // vue文件
│   │   │   ├── ...                         
│   ├── resources                           // 静态资源
│   │   ├── ...                             
│   ├── util                                // 通用工具
│   │   ├── http.js                         // ajax全局设置
│   │   ├── i18n.js                         // 国际化全局设置
│   │   ├── amap.js                         // 高德地图注册
│   │   ├── ...
│   ├── store                               // vuex状态管理
│   │   ├── modules/                        // vuex的modules
│   │   ├── state.js                        
│   │   ├── getter.js                       
│   │   ├── mutations.js                    
│   │   ├── actions.js                      
│   │   ├── store.js                        
│   ├── router
│   │   ├── asyncRouter.js                  // 异步路由表
│   │   ├── directAccess.js                 // 直接访问路由表(预留)
│   │   ├── index.js                        // vue-router路由配置
│   ├── index.html                          // 单文件入口渲染模板
│   ├── index.vue                           // 首页vue
│   ├── main.js                             // webpack入口文件
├── ...
```

***

## **STEP3 项目配置及开发**

1. 修改本地测试服务端口地址

    打开 `config\index.js`， 修改 `dev.port`即可

2. 增加全局引用变量或文件统一路径

    一般情况，打开 `build\webpack.base.conf.js`，修改 `resolve.alias` 并增加新的属性。别名使用遵循webpack规则。
    
    当配置正确却报错“无法找到对应的文件”，需在vue文件的引用资源路径前加~
    >[#issues/193](https://github.com/vuejs/vue-loader/issues/193)  
    vue-html-loader and css-loader translates non-root URLs to relative paths. In order to treat it like a module path, prefix it with ~:
    > ``` bash 
    ><img class="logo" src="~assets/logo.png">
    >```

3. 自定义主题或颜色
    
    打开 `resources\css` 文件夹。 `reset.css` 文件为浏览器重定义样式，不要修改。 `theme\theme.scss` 内包含基本框架结构及框架尺寸设置及你想应用的颜色主题。 `theme`文件夹内的子文件夹用以存放不同的主题颜色

4. 入口文件修改

    请注意，并不建议修改入口文件。如果目录无法满足项目需求，执意需要修改入口文件，请修改 `build\webpack.base.conf.js` 中的 `entry.app` 字段，路径为你更改后的入口路径（必须是JS文件）。
    
    其中入口文件的以下代码代表引用同级的vue文件。
    ``` bash
    import App from './index'
    ```
    确定入口文件渲染到的html文件路径由 `build\webpack.dev.conf.js` 中的 `HtmlWebpackPlugin.template` 及  `build\webpack.prod.conf.js` 中的 `HtmlWebpackPlugin.template` 决定。

    修改后的入口文件必须保证所引用的资源路径正确

5. ajax返回数据模拟

    项目引入了MockJS，可对所有的ajax请求进行截获，保证独立于后台开发进度。Mock数据在 `mock` 文件夹内，参照已有文件进行编写即可。MockJS详细使用方法请参考 [MockJS官网](http://mockjs.com)。请注意，在构建生产版本时取消MockJS引用，否则报错。

6. http错误页面配置

    在 `src\page\error` 进行内容配置。其中404跳转页面配置入口在 `src\router\router` 中，当请求地址不存在于当前路由表中时，将会自动跳转到404。其余通过http请求错误造成的页面跳转在 `util\http.js` 中配置。请注意，不要轻易的跳转到500错误，因为一般性500错误并不是真正的错误，只是数据有问题，应当在页面中通过其他方式进行提示。

7. 关于浏览器兼容性问题

    由于引用框架的问题，本项目并仅支持IE9及以上浏览器。CSS方面由于引入了autoprefixer，所以可以放心使用标准CSS，兼容性由程序自动完成。如果需要修改需要支持的浏览器版本，在 `package.json`中 `browserslist`下修改对应的浏览器版本即可。对于某些CSS3支持情况的具体信息请前往 [Can I Use](http://caniuse.com/) 搜索并查看。

***

## **常用参考资料**

VueJS官网： [http://cn.vuejs.org/](http://cn.vuejs.org/)

Vuex官网： [https://vuex.vuejs.org/zh-cn/](https://vuex.vuejs.org/zh-cn/)

Vue-router官网： [https://router.vuejs.org/zh-cn/](https://router.vuejs.org/zh-cn/)

Webpack官网： [https://doc.webpack-china.org/](https://doc.webpack-china.org/)

ElementUI官网： [http://element.eleme.io/#/zh-CN](http://element.eleme.io/#/zh-CN)

Vue-i18n文档： [http://kazupon.github.io/vue-i18n/en](http://kazupon.github.io/vue-i18n/en)

MockJS官网： [http://mockjs.com](http://mockjs.com)

Can I Use： [http://caniuse.com/](http://caniuse.com/)

MDN： [https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

ES6文档： [http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)

Axios文档： [https://github.com/mzabriskie/axios](https://github.com/mzabriskie/axios)

Lodash文档： [https://lodash.com/docs/4.17.4](https://lodash.com/docs/4.17.4)

NodeJS文档： [http://nodejs.cn/api/](http://nodejs.cn/api/)
    
..
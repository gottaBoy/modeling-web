# @ibiz-template/vue3-util

基于vue3开发的通用组件包，web端和移动端均可使用，旨在为vue3组件提供工具方法和与vue3技术深度耦合的功能支持。不仅包含丰富的vue3通用组件实现，还提供了钩子、工具函数、类型定义供web端和移动端特定端组件库使用。

## 📂 项目结构

```javascript
|─ ─ vue3-util
    |─ ─ src                                                                项目工程文件夹      
        |─ ─ common                                                         通用组件文件夹
            |─ ─ badge                                                      徽章组件
            |─ ─ code-list                                                  代码表组件
            |─ ─ control-base                                               部件容器组件
            |─ ─ control-loading-placeholder                                部件加载占位符组件
            |─ ─ control-shell                                              部件壳组件
            |─ ─ custom-render                                              自定义绘制组件
            |─ ─ icon                                                       图标绘制组件
            |─ ─ router-view                                                路由视图组件
            |─ ─ view-shell                                                 视图壳组件
        |─ ─ control                                                        部件相关文件夹
            |─ ─ panel                                                      面板相关文件夹
                |─ ─ panel                                                  面板组件
                |─ ─ view-layout-panel                                      视图布局面板组件
        |─ ─ hooks                                                          钩子相关文件夹
            |─ ─ app                                                        应用钩子
        |─ ─ interface                                                      通用组件库(vue3)所有接口文件
        |─ ─ locale                                                         多语言文件夹
        |─ ─ panel-component                                                面板组件文件夹
            |─ ─ auth-wxmp-qrcode                                           微信扫码组件
            |─ ─ grid-container                                             面板栅格容器组件
            |─ ─ multi-data-container                                       多项数据容器组件
            |─ ─ multi-data-container-raw                                   多项数据容器仅数据组件
            |─ ─ nav-pos                                                    导航占位组件
            |─ ─ panel-container                                            面板常规容器组件
            |─ ─ panel-container-group                                      面板分组容器组件
            |─ ─ panel-container-image                                      面板图片背景容器组件
            |─ ─ panel-container-tabs                                       面板分页部件组件
            |─ ─ panel-ctrl-pos                                             面板控件占位组件
            |─ ─ panel-ctrl-view-page-caption                               面板页面标题位组件
            |─ ─ panel-field                                                面板属性识别绘制组件
            |─ ─ panel-item-render                                          面板项绘制器组件
            |─ ─ panel-rawitem                                              面板直接内容组件
            |─ ─ panel-tab-page                                             面板分页组件
            |─ ─ scroll-container                                           滚动条容器组件
            |─ ─ single-data-container                                      单项数据容器组件
            |─ ─ teleport-placeholder                                       传送占位组件
        |─ ─ plugin                                                         插件相关文件夹
            |─ ─ plugin-factory                                             插件工厂
        |─ ─ props                                                          组件props预定义文件夹
            |─ ─ common.ts                                                  必填props类型类
            |─ ─ editor                                                     编辑器props预定义文件夹
        |─ ─ types                                                          类型定义文件夹
        |─ ─ use                                                            通用钩子文件夹
            |─ ─ autofocus-blur                                             自动聚焦与失焦钩子
            |─ ─ click-outside                                              点击组件外部监听事件钩子
            |─ ─ codeList-listen                                            代码表监听钩子
            |─ ─ control                                                    部件相关文件夹
                |─ ─ use-control-controller                                 初始化部件控制器钩子
            |─ ─ event                                                      监听JS原生事件钩子
            |─ ─ focus-blur                                                 聚焦与失焦钩子
            |─ ─ namespace                                                  css命名空间钩子
            |─ ─ popover                                                    弹出框管理钩子
            |─ ─ route                                                      路由处理钩子
            |─ ─ storage                                                    本地缓存钩子
            |─ ─ util                                                       钩子处理通用工具
            |─ ─ view                                                       视图相关文件夹
                |─ ─ use-view-controller                                    初始化视图控制器钩子
                |─ ─ use-view-operation                                     监听视图操作钩子
            |─ ─ vue                                                        vue处理钩子
        |─ ─ util                                                           通用工具文件夹
            |─ ─ control                                                    部件工具
            |─ ─ overlay-container                                          全局弹出承载组件
            |─ ─ overlay-popover-container                                  飘窗组件呈现容器
            |─ ─ overlay-view-util                                          打开视图弹出框组件工具
            |─ ─ render                                                     绘制器工具
            |─ ─ route                                                      路由处理工具文件夹
            |─ ─ router-callback                                            路由回调工具文件夹
            |─ ─ store                                                      全局数据缓存工具文件夹
            |─ ─ install.ts                                                 组件注册工具
        |─ ─ view                                                           视图文件夹
            |─ ─ app-data-upload-view                                       应用导入视图适配器
            |─ ─ app-redirect-view                                          应用重定向视图适配器
            |─ ─ common                                                     视图组件
            |─ ─ de-redirect-view                                           实体重定向视图组件
            |─ ─ html-view                                                  实体html视图组件
            |─ ─ portal-view                                                应用门户视图及实体数据看板视图组件
            |─ ─ todo-redirect                                              待办重定向视图组件
    |─ ─ test                                                               测试文件夹
        |─ ─ utils                                                          工具测试文件夹
            |─ ─ render                                                     绘制器工具测试
            |─ ─ route                                                      路由处理工具测试
            |─ ─ router-callback                                            路由回调工具测试
            |─ ─ store                                                      全局数据缓存工具文件夹测试
        |─ ─ index.test.ts                                                  入口文件测试
        |─ ─ setup.ts                                                       测试环境初始化文件

```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)
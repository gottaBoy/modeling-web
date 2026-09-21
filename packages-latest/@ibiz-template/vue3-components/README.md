# @ibiz-template/vue3-components

web端基于vue3和element-plus实现的界面组件，包含视图组件、部件组件、编辑器组件、面板项组件、通用vue组件、web端视图引擎、路由、应用构建等组件。

## 📂 项目结构

```
├── src
│   ├── common                                                  公共组件
│   │   ├── action-toolbar                                      行为工具栏
│   │   ├── anchor-container                                    锚点容器
│   │   │   ├── anchor-bar-list                                 锚点工具栏
│   │   ├── button-list                                         按钮组
│   │   ├── carousel                                            轮播
│   │   ├── carousel-card                                       轮播-卡片
│   │   ├── col                                                 布局组件-列
│   │   ├── control-navigation                                  部件内容导航组件
│   │   ├── coop-alert                                          消息提示组件
│   │   ├── cropping                                            裁剪框组件
│   │   ├── custom-filter-condition                             自定义查询条件组件
│   │   ├── custom-theme                                        自定义主题组件
│   │   ├── data-import                                         数据导入
│   │   ├── data-import2                                        数据导入2
│   │   ├── data-import2-select                                 数据导入2-下拉模式
│   │   ├── data-import2-table                                  数据导入2-表格模式
│   │   ├── doing-notice                                        待办消息通知组件
│   │   ├── emoji-select                                        表情选择组件
│   │   ├── extend-action-timeline                              扩展时间线
│   │   ├── fullscreen-toolbar                                  全屏工具栏
│   │   ├── gantt-setting                                       甘特图设置组件
│   │   ├── grid-setting                                        表格设置组件
│   │   ├── index.ts                                            公共组件注册文件
│   │   ├── map-chart                                           地图图表
│   │   ├── map-chart-user                                      地图图表-用户样式1
│   │   ├── nav-split                                           导航分割面板组件
│   │   ├── no-data                                             无数据组件
│   │   ├── pagination                                          分页栏组件
│   │   ├── pql-editor                                          PQL编辑器
│   │   ├── quick-edit                                          打开编辑组件
│   │   ├── rawitem                                             直接内容组件
│   │   ├── row                                                 布局组件-行
│   │   ├── sort-bar                                            排序组件
│   │   ├── split                                               分割面板
│   │   ├── split-trigger                                       分割面板线
│   │   └── view-message                                        视图消息组件
│   ├── control                                                 部件组件
│   │   ├── app-menu                                            应用菜单
│   │   ├── app-menu-icon-view                                  应用菜单-快捷菜单
│   │   ├── calendar                                            日历
│   │   ├── caption-bar                                         视图标题栏
│   │   ├── chart                                               图表
│   │   ├── context-menu                                        上下文菜单
│   │   ├── dashboard                                           门户看板
│   │   ├── data-view                                           数据视图
│   │   ├── drbar                                               关系栏组件
│   │   ├── drtab                                               关系分页组件
│   │   ├── exp-bar                                             导航栏
│   │   │   ├── calendar-exp-bar                                日历导航栏
│   │   │   ├── chart-exp-bar                                   图表导航栏
│   │   │   ├── data-view-exp-bar                               数据视图导航栏
│   │   │   ├── grid-exp-bar                                    表格导航栏
│   │   │   ├── list-exp-bar                                    列表导航栏
│   │   │   └── tree-exp-bar                                    树导航栏
│   │   ├── form                                                表单
│   │   │   ├── edit-form                                       编辑表单
│   │   │   ├── form                                            表单
│   │   │   ├── form-detail                                     表单详情
│   │   │   │   ├── form-button                                 表单按钮
│   │   │   │   ├── form-button-list                            表单按钮组
│   │   │   │   ├── form-druipart                               表单关系界面
│   │   │   │   ├── form-group-panel                            表单分组面板
│   │   │   │   ├── form-item                                   表单项
│   │   │   │   ├── form-mdctrl                                 表单多数据部件
│   │   │   │   ├── form-page                                   表单页面
│   │   │   │   ├── form-rawitem                                表单直
│   │   │   │   ├── form-tab-page                               表单页面
│   │   │   │   ├── form-tab-panel                              表单分组面板
│   │   │   └── search-form                                     搜索表单
│   │   ├── gantt                                               甘特图
│   │   ├── grid                                                表格
│   │   │   ├── grid                                            表格
│   │   │   ├── grid-column                                     表格列
│   │   │   │   ├── grid-field-column                           表格属性列
│   │   │   │   ├── grid-field-edit-column                      表格编辑列
│   │   │   │   ├── grid-group-column                           表格分组列
│   │   │   │   ├── grid-ua-column                              表格操作列
│   │   │   └── row-edit-popover                                表格行编辑气泡
│   │   ├── kanban                                              看板
│   │   ├── list                                                列表
│   │   ├── map                                                 地图
│   │   ├── medit-view-panel                                    多表单编辑视图面板
│   │   ├── pickup-view-panel                                   选择视面板班
│   │   ├── report-panel                                        报表面面板
│   │   │   ├── report-detail                                   报表详情
│   │   │   │   ├── bi-report-panel                             bi报表面板
│   │   │   │   ├── user-report-panel                           用户样式1报表面板
│   │   │   │   └── user2-report-panel                          用户样式2报表面板
│   │   ├── search-bar                                          搜索栏
│   │   │   ├── filter-mode-select                              下拉模式选择
│   │   │   ├── filter-tree                                     搜索条件数树树
│   │   │   ├── quick-search-select                             快速搜索选择
│   │   │   └── search-groups                                   搜索组
│   │   ├── tab-exp-panel                                       分页导航面板
│   │   ├── toolbar                                             工具栏
│   │   ├── tree                                                树
│   │   ├── tree-grid                                           树形表格
│   │   ├── tree-grid-ex                                        树形表格-增强
│   │   │   ├── tree-grid-ex-column                             树形表格-增强-扩展列
│   │   │   │   ├── tree-grid-ex-edit-column                    树形表格-增强-编辑列
│   │   │   │   ├── tree-grid-ex-field-column                   树形表格-增强-字段列
│   │   │   │   └── tree-grid-ex-ua-column                      树形表格-增强-属性列
│   ├── editor                                                  编辑器
│   │   ├── array                                               数组编辑器
│   │   ├── autocomplete                                        自动填充
│   │   ├── carousel                                            轮播图
│   │   ├── cascader                                            级联选择器
│   │   ├── check-box                                           选项框
│   │   ├── check-box-list                                      多选框列表
│   │   ├── code                                                代码框编辑器
│   │   ├── color-picker                                        颜色选择器
│   │   ├── data-picker                                         数据选择
│   │   │   ├── ibiz-mpicker                                    地址框
│   │   │   ├── ibiz-picker                                     数据选择器单选
│   │   │   ├── ibiz-picker-dropdown                            数据选择器-下拉
│   │   │   ├── ibiz-picker-embed-view                          数据选择器-嵌入视图
│   │   │   ├── ibiz-picker-link                                数据选择器-链接
│   │   │   ├── ibiz-picker-select-view                         数据选择器-下拉视图
│   │   ├── date-picker                                         日期选择器
│   │   ├── date-range                                          日期范围选择器
│   │   ├── date-range-select                                   日期范围选择器-指定类型（天，周，月，季度，年）
│   │   ├── dropdown-list                                       下拉列表
│   │   ├── html                                                富文本编辑器
│   │   ├── list-box                                            选项列表框
│   │   ├── markdown                                            markdown
│   │   ├── not-supported-editor                                不支持的编辑器
│   │   ├── number-range                                        数值范围
│   │   ├── preset                                              预设直接内容编辑器
│   │   ├── radio-button-list                                   单选按钮列表
│   │   ├── rate                                                评分器
│   │   ├── raw                                                 直接内容
│   │   ├── slider                                              滑动条
│   │   ├── span                                                标签
│   │   ├── stepper                                             步进器
│   │   ├── switch                                              开关
│   │   ├── text-box                                            文本框
│   │   ├── upload                                              文件上传
│   │   └── user
│   │       ├── ibiz-searchcond-edit                            searchcond编辑器
│   ├── ibiz-vue3.ts                                            vue3组件挂载文件
│   ├── index.ts                                                组件导出文件
│   ├── interface                                               接口
│   ├── locale                                                  国际化
│   │   ├── en                                                  国际化-英文
│   │   └── zh-CN                                               国际化-中文
│   ├── panel-component                                         面板组件
│   │   ├── auth-captcha                                        人机识别组件
│   │   ├── auth-sso                                            第三方登录组件
│   │   ├── auth-userinfo                                       用户信息
│   │   ├── coop-pos                                            协同消息占位
│   │   ├── data-import                                         数据导入
│   │   ├── index-actions                                       首页行为操作
│   │   ├── nav-breadcrumb                                      导航面包屑
│   │   ├── nav-pos-index                                       首页导航占位
│   │   ├── nav-tabs                                            导航分页栏
│   │   ├── panel-app-header                                    面板-应用头部
│   │   ├── panel-app-login-view                                面板-应用登录视图
│   │   ├── panel-app-title                                     面板-应用标题
│   │   ├── panel-button                                        面板-按钮
│   │   ├── panel-button-list                                   面板-按钮组
│   │   ├── panel-exp-header                                    面板-导航头部
│   │   ├── panel-index-view-search                             面板-首页搜索框
│   │   ├── panel-remember-me                                   面板-登录页记住我
│   │   ├── panel-static-carousel                               面板--静态轮播图
│   │   ├── panel-tab-panel                                     面板-分页面板
│   │   ├── panel-view-content                                  面板-视图内容区
│   │   ├── panel-view-header                                   面板-视图头部区
│   │   ├── searchform-buttons                                  面板-搜索表单-按钮
│   │   ├── short-cut                                           面板-缩放快捷工具栏
│   │   ├── split-container                                     面板-分割容器
│   │   ├── user-action                                         面板-首页用户操作
│   │   ├── user-message                                        面板-首页用户消息
│   ├── shims-vue.d.ts                                          vue类型定义文件
│   ├── util                                                    UI工具类
│   │   ├── ai-util                                             ai工具类
│   │   ├── app-drawer                                          抽屉
│   │   ├── app-float-window                                    悬浮窗
│   │   ├── app-modal                                           模态框
│   │   ├── app-popover                                         气泡框
│   │   ├── app-util                                            工具方法文件，提供登录，登出，更改密码，切换主题，打开AI框等方法
│   │   ├── confirm-util                                        确认框
│   │   ├── fullscreen                                          全屏工具类
│   │   ├── keydown-util                                        提供enter键自动聚集某元素的方法
│   │   ├── loading-util                                        全局加载动画工具
│   │   ├── message-util                                        消息通知
│   │   ├── modal-util                                          简洁确认操作框
│   │   ├── notice-util                                         通知提示框
│   │   ├── notification-util                                   消息通知工具（界面右上角显示可关闭的全局通知）
│   │   ├── open-view-util                                      打开视图方式工具类
│   │   ├── overlay-controller                                  组件绘制工具，可指定组件的绘制形式（气泡，模态，抽屉，飘窗）
│   │   ├── pagination                                          分页组件使用方法
│   │   ├── render-util                                         绘制工具类（包含逻辑中绘制视图、绘制部件等功能）
│   │   ├── wang-editor-util                                    表情解析方法
│   │   └── xlsx-util                                           excel文件操作工具类
│   ├── view
│   │   ├── 403-view                                            403页面
│   │   ├── 404-view                                            404页面
│   │   ├── error-view                                          错误页
│   │   ├── index.ts                                            视图页导出文件
│   │   ├── login-view                                          登录页面
│   │   ├── share-view                                          分享页面
│   │   ├── sub-app-ref-view                                    子应用引用视图
│   │   └── wf-step-trace-view                                  流程跟踪视图
│   ├── view-engine                                             视图引擎
│   │   ├── app-data-upload-view.engine.ts                      应用数据上传视图引擎
│   │   ├── calendar-exp-view.engine.ts                         日历导航视图引擎
│   │   ├── calendar-view.engine.ts                             日历视图引擎
│   │   ├── chart-exp-view.engine.ts                            图表导航视图引擎
│   │   ├── chart-view.engine.ts                                图表视图引擎
│   │   ├── custom-view.engine.ts                               自定义视图引擎
│   │   ├── data-view-exp-view.engine.ts                        数据卡片导航视图引擎
│   │   ├── data-view.engine.ts                                 数据视图引擎
│   │   ├── de-index-view-engine.ts                             实体首页视图引擎
│   │   ├── edit-view.engine.ts                                 编辑视图引擎
│   │   ├── edit-view2.engine.ts                                编辑视图2（左右关系）引擎
│   │   ├── edit-view3.engine.ts                                编辑视图3（分页关系）引擎
│   │   ├── edit-view4.engine.ts                                编辑视图4（上下关系）引擎
│   │   ├── exp-view.engine.ts                                  导航视图引擎基类
│   │   ├── form-pickup-data-view.engine.ts                     表单选择数据视图引擎
│   │   ├── gantt-view.engine.ts                                甘特视图引擎
│   │   ├── grid-exp-view.engine.ts                             表格导航视图引擎
│   │   ├── grid-view.engine.ts                                 表格视图引擎
│   │   ├── index-view.engine.ts                                首页视图引擎
│   │   ├── index.ts                                            视图引擎导出文件
│   │   ├── kanban-view.engine.ts                               看板视图引擎
│   │   ├── list-exp-view.engine.ts                             列表导航视图引擎
│   │   ├── list-view.engine.ts                                 列表视图引擎
│   │   ├── login-view.engine.ts                                登录视图引擎
│   │   ├── map-view.engine.ts                                  地图视图引擎
│   │   ├── medit-view9.engine.ts                               多表单编辑视图引擎
│   │   ├── mpickup-view-engine.ts                              多数据选择视图引擎
│   │   ├── mpickup-view2-engine.ts                             多数据选择视图（左右关系）引擎
│   │   ├── opt-view.engine.ts                                  选项操作视图引擎
│   │   ├── panel-view-engine.ts                                面板视图引擎
│   │   ├── pickup-data-view.engine.ts                          选择数据视图引擎
│   │   ├── pickup-grid-view.engine.ts                          选择表格视图引擎
│   │   ├── pickup-tree-view.engine.ts                          选择树视图引擎
│   │   ├── pickup-view.engine.ts                               选择视图引擎
│   │   ├── pickup-view2.engine.ts                              选择视图（左右关系）引擎
│   │   ├── portal-view-engine.ts                               门户视图引擎
│   │   ├── report-view.engine.ts                               报表视图引擎
│   │   ├── sub-app-ref-view.engine.ts                          子应用引用视图引擎
│   │   ├── tab-exp-view.engine.ts                              分页导航视图引擎
│   │   ├── tab-search-view.engine.ts                           分页搜索视图引擎
│   │   ├── tree-exp-view.engine.ts                             树导航视图引擎
│   │   ├── tree-grid-ex-view.engine.ts                         树表格增强视图引擎
│   │   ├── tree-grid-view.engine.ts                            树表格视图引擎
│   │   ├── tree-view.engine.ts                                 树视图引擎
│   │   ├── wf-dyna-action-view.engine.ts                       工作流动态操作视图引擎
│   │   ├── wf-dyna-edit-view.engine.ts                         工作流动态编辑视图
│   │   ├── wf-dyna-edit-view3.engine.ts                        工作流动态编辑视图3
│   │   ├── wf-dyna-start-view.engine.ts                        工作流动态启动视图
│   │   ├── wf-step-data-view.engine.ts                         流程处理记录视图引擎
│   │   └── wizard-view-engine.ts                               向导视图引擎
│   └── web-app
│       ├── App.scss                                            App组件样式文件
│       ├── App.tsx                                             App组件
│       ├── attach-environment-config.ts                        环境配置
│       ├── components
│       │   ├── modal-router-shell                              路由模态壳
│       │   └── router-shell                                    路由壳
│       ├── create-vue-app.ts                                   创建vue3实例
│       ├── guard                                               路由守卫
│       ├── index.ts                                            路由，权限，组件挂载方法导出文件
│       ├── main.ts                                             入口文件
│       ├── router                                              路由
│       └── util
│           └── unauthorized-handler                            无权限登录处理

```

## 📦 开发

1. 安装依赖

进入 @ibiz-template/vue3-components 工作空间后，执行以下命令安装依赖：

```bash
pnpm i
```

2. 链接依赖项目

终端执行 shell 脚本：./scripts/link.sh ，该脚本会将该包中用到ibiz-template下的几个包 link 到本包内：

```bash
./scripts/link.sh
```

3. 运行项目

执行以下命令运行当前项目：

```bash
pnpm dev
```

4. 链接到全局

执行以下命令链接到全局，供主项目使用：

```bash
pnpm link --global
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)
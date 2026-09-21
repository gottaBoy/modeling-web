# @ibiz/model-core

高度抽象的前端应用层模型对象接口规范，旨在为前端应用提供一套标准化的接口规范，涵盖应用、视图、视图布局、部件、编辑器等核心模型对象。

## 📦 安装

使用 npm 或 pnpm 安装：

```bash
npm install @ibiz/model-core
# 或
pnpm add @ibiz/model-core
```

## 📂 项目结构

```
├── src
│   ├── app
│   │   ├── appmenu                                                            应用菜单模型
│   │   ├── bi                                                                 智能报表相关模型
│   │   ├── codelist                                                           代码表模型
│   │   ├── control                                                            计数器、门户部件模型
│   │   ├── dataentity                                                         应用实体相关模型
│   │   ├── func                                                               应用功能模型
│   │   ├── logic                                                              应用预置逻辑模型
│   │   ├── mob                                                                应用端特有视图模型
│   │   ├── msg                                                                应用视图消息模型
│   │   ├── res                                                                应用引用资源模型、包含插件引用、输入提示数据集等模型
│   │   ├── theme                                                              应用主题模型
│   │   ├── util                                                               应用功能配置模型，包含搜索条件存储、搜索条件存储等模型
│   │   ├── valuerule                                                          应用值规则模型
│   │   ├── view                                                               应用视图模型
│   │   ├── wf                                                                 工作流相关模型，包含工作流、工作流版本等模型
│   │   ├── iapp-lan.ts                                                        应用多语言模型
│   │   ├── iapp-resource.ts                                                   应用资源模型
│   │   ├── iapplication.ts                                                    前端应用模型
│   │   └── isub-app-ref.ts                                                    子应用引用模型
│   ├── codelist                                                               代码表相关模型，包含代码表项等模型
│   ├── control                                                                部件模型
│   │   ├── calendar                                                           日历部件
│   │   ├── captionbar                                                         标题栏部件
│   │   ├── chart                                                              图表部件
│   │   ├── counter                                                            计数器相关模型
│   │   ├── custom                                                             自定义部件
│   │   ├── dashboard                                                          数据看板部件
│   │   ├── datainfobar                                                        信息栏部件
│   │   ├── dataview                                                           卡片部件
│   │   ├── drctrl                                                             dr部件，包含分页导航、数据关系栏等部件
│   │   ├── editor                                                             编辑器模型
│   │   ├── expbar                                                             导航部件，包含表格导航、卡片导航、树导航等部件
│   │   ├── form                                                               表单部件，包含编辑表单、搜索表单等部件
│   │   ├── grid                                                               表格部件
│   │   ├── layout                                                             界面布局模型
│   │   ├── list                                                               列表部件
│   │   ├── map                                                                地图部件
│   │   ├── menu                                                               菜单部件
│   │   ├── panel                                                              面板部件
│   │   ├── rawitem                                                            直接内容模型
│   │   ├── reportpanel                                                        报表面板部件
│   │   ├── searchbar                                                          搜索栏部件
│   │   ├── titlebar                                                           标题栏模型
│   │   ├── toolbar                                                            工具栏部件
│   │   ├── tree                                                               树部件
│   │   ├── viewpanel                                                          视图布局面板模型
│   │   ├── wizardpanel                                                        向导面板部件
│   ├── data                                                                   数据项相关模型
│   ├── dataentity                                                             实体相关模型
│   │   ├── ac                                                                 实体自填模式
│   │   ├── action                                                             实体行为
│   │   ├── dataexport                                                         数据导出
│   │   ├── dataimport                                                         数据导入
│   │   ├── datamap                                                            数据映射
│   │   ├── defield                                                            实体属性
│   │   ├── der                                                                实体关系
│   │   ├── ds                                                                 数据查询
│   │   ├── logic                                                              实体逻辑
│   │   ├── mainstate                                                          实体主状态
│   │   ├── print                                                              实体打印
│   │   ├── priv                                                               实体操作标识
│   │   ├── report                                                             实体报表
│   │   ├── uiaction                                                           界面行为
│   │   └── wizard                                                             实体向导
│   ├── msg                                                                    消息相关模型，如消息模板
│   ├── res                                                                    系统资源相关模型，如语言资源、系统样式表、系统图片、系统插件等
│   ├── security                                                               访问控制相关模型，如统一资源等
│   ├── valuerule                                                              值规则相关模型
│   ├── view                                                                   视图相关模型，如视图引擎、界面行为组等
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)


# 版本变更日志

这个项目的所有关键变化都将记录在此文件中.

此日志格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
并且此项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unreleased]

## [0.1.21] - 2024-04-23

### Added

- 增加向导表单上一步启用脚本代码、下一步启用脚本代码、完成启用脚本代码

## [0.1.19] - 2024-03-28

### Added

- 实体行为行为模式增加SAVE
- 工具栏项（界面行为类型）增加边框样式和按钮样式
- 实体关系主从关系类型增加限定版本、自定义、自定义2、自定义3、自定义4

## [0.1.18] - 2024-03-20

### Added

- 树节点增加支持行编辑仅提交变化值

## [0.1.17] - 2024-03-19

### Added

- 关系界面组成员增加启用判断数据访问标识和启用模式
- 实体表格、树节点增加支持行编辑仅提交变化值

## [0.1.13] - 2024-02-27

### Added

- IAppDETreeGridView 新增参数 gridRowActiveMode、enableRowEdit、rowEditDefault
- IAppViewLogic 新增参数 appDEUIActionId
- 面板容器支持定义行为组展开模式，表单、面板支持按钮列表元素

## [0.1.12] - 2024-02-21

### Added

- 系统计数器、应用计数器新增参数 navigateContexts、navigateParams、uniqueTag
- 实体界面行为组新增参数 appDataEntityId
- 编辑表单新增参数 appCounterRefId
- 表单新增参数 counterId、counterMode、appCounterRefId

## [0.1.11] - 2024-02-04

### Added

- IApplication 新增 bottomInfo、headerInfo、title、caption、subCaption

## [0.1.10] - 2024-02-04

### Added

- IAppUILogicRefViewBase 新增 openMode
- IAppDEEditView 新增 markOpenDataMode、enableDirtyChecking


## [0.1.9] - 2024-01-29

### Added

- IModelObject 补充 modelId、modelType 转换，满足开发态下跳转配置界面参数需求

## [0.1.8] - 2024-01-25

### Added

- 新增文件上传 osscat 相关

## [0.1.7] - 2024-01-24

### Added

- IDEUIAction 补充 asyncAction 标识

## [0.1.6] - 2024-01-23

### Added

- 新增视图打开模式: INDEXVIEWTAB_POPUP：顶级容器分页（非模态弹出）、 INDEXVIEWTAB_POPUPMODAL：顶级容器分页（模态弹出）
- ISearchBar 新增分组模式 groupMode
- 消息模板支持 markdown

## [0.1.5] - 2024-01-18

### Added

- 代码表新增颜色属性相关内容

## [0.1.4] - 2024-01-18

### Added

- IAppDataEntity 新增 dynaSysMode
- ISearchBarGroup 新增 defaultGroup
- IDETreeNode 新增 dynaClass
- IDETreeStaticNode 新增 accUserMode、accessKey

## [0.1.2] - 2024-01-05

### Added

- IAppDERS 输出嵌套数据集，以及限制删除相关

## [0.1.1] - 2024-01-04

### Added

- 树部件树表格相关接口模型补充，nodeColumn、dataItem、fieldColumn、uacolumn

## [0.1.0] - 2023-12-28

### Added

- IDEACMode 新增 deuiactionGroup
- IAppDEACMode 新增 itemLayoutPanel

## [0.0.29] - 2023-12-25

### Added

- 树部件的数据节点新增 detreeColumnId 转换

## [0.0.28] - 2023-12-20

### Added

- IAppDEMethodDTOField 新增 refPickupAppDEFieldId 标明引用关系标识属性
- 应用、视图、代码表新增 dynaSysMode 标识

## [0.0.27] - 2023-12-11

### Added

- 应用实体支持联合主键 unionKeyValueAppDEFieldIds

## [0.0.26] - 2023-12-06

### Changed

- 模型中 appId 改为非可选项

## [0.0.25] - 2023-12-06

### Added

- 补充 subAppRefs 子应用引用

## [0.0.24] - 2023-12-04

### Added

- 表格编辑列补充 resetItemNames 声明

## [0.0.22] - 2023-11-30

### Added

- 实体打印和报表支持插件 sysPFPluginId
- 应用补充 appSubViewTypeRefs

## [0.0.20] - 2023-10-31

### Added

- 日历项、地图项支持自定义查询条件

## [0.0.19] - 2023-10-10

### Added

- markdown、text-area 支持自填模式、导航参数相关
- 实体逻辑新增 DECISION 类型
- 界面逻辑新增 DECISION 类型

## [0.0.18] - 2023-09-20

### Added

- IAppPortlet 补充控件接口

## [0.0.17] - 2023-09-18

### Added

- 新增 IUnkownItem 直接内容解释接口

## [0.0.16] - 2023-09-11

### Added

- 表单关系界面新增 maskInfo、maskMode 模型

## [0.0.15] - 2023-08-23

### Added

- 部件新增 activeDataMode 模式

## [0.0.14] - 2023-07-17

### Added

- 部件逻辑支持 Render 类型

## [0.0.13] - 2023-07-14

### Added

- 部件支持面板

## [0.0.11] - 2023-06-15

### Added

- 面板容器发布 predefinedType 预定义类型

## [0.0.11] - 2023-06-08

### Added

- 基类补充 userParam

## [0.0.9] - 2023-05-18

### Added

- 界面行为项补充 sysImage 输出

## [0.0.8] - 2023-05-16

### Added

- 补充视图逻辑类型、界面行为补充标题等输出

## [0.0.7] - 2023-05-10

### Added

- flex 布局新增 basis、shrink 参数
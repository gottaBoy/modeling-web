# web端主题样式库

web端主题样式库，包含所有视图、部件预定义布局模型，同时也包含主题的颜色、间距、圆角、遮罩等主题配置，包含亮色主题、暗色主题、蓝色主题。

## 📂 项目结构

```javascript
|── web-theme
    ├── src
        ├── index.ts
        ├── publish                                                                     预置布局模型
        │   ├── app-data-upload-view.ts                                                 应用数据导入视图布局面板(预置模型)
        │   ├── app-index-view-layout-blank-mode.ts                                     应用首页视图布局_空白模式(预置模型)
        │   ├── app-index-view-layout-center.ts                                         应用首页视图布局_中间菜单(预置模型)
        │   ├── app-index-view-layout-no-nav.ts                                         应用首页视图布局(无分页)
        │   ├── app-index-view-layout-top-nonav.ts                                      应用首页视图布局_上方菜单(无分页)
        │   ├── app-index-view-layout-top.ts                                            应用首页视图布局_上方菜单(预置模型)
        │   ├── app-index-view-layout.ts                                                应用首页视图布局(预置模型)
        │   ├── app-login-view.ts                                                       应用登录视图
        │   ├── control-layout                                                          预置部件布局模型
        │   │   ├── control-layout-model-repository-chart-exp-bar-layout.ts             图表导航栏布局面板
        │   │   ├── control-layout-model-repository-data-view-exp-bar-layout.ts         卡片导航栏布局面板
        │   │   ├── control-layout-model-repository-grid-exp-bar-layout.ts              表格导航栏布局面板
        │   │   ├── control-layout-model-repository-list-exp-bar-layout.ts              列表导航栏布局面板
        │   │   ├── control-layout-model-repository-search-form-layout.ts               搜索表单布局面板
        │   │   ├── control-layout-model-repository-tree-exp-bar-layout.ts              树导航栏布局面板
        │   │   └── control-layout-model-repository-tree-layout.ts                      树部件布局面板
        │   ├── index.ts
        │   └── view-layout-model-repository                                            预置视图布局模型
        │       ├── view-layout-model-repository-app-panel-view-layout.ts               应用面板视图布局面板布局面板
        │       ├── view-layout-model-repository-de-calendar-exp-view-layout.ts         实体数据选择视图（左右关系）布局面板
        │       ├── view-layout-model-repository-de-calendar-view-layout.ts             日历导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-chart-exp-view-layout.ts            图表导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-chart-view-layout.ts                图表视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-data-view-exp-view-layout.ts        实体卡片视图导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-data-view-layout.ts                 卡片视图布局面(预置模型)
        │       ├── view-layout-model-repository-de-edit-view-2-layout.ts               实体编辑视图（左右关系）布局面板布局面板(预置模型)
        │       ├── view-layout-model-repository-de-edit-view-3-layout.ts               实体编辑视图（分页关系）布局面板布局面板(预置模型)
        │       ├── view-layout-model-repository-de-edit-view-4-layout.ts               实体编辑视图（上下关系）布局面板
        │       ├── view-layout-model-repository-de-edit-view-layout.ts                 编辑视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-gantt-view-layout.ts                甘特视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-grid-exp-view-layout.ts             表格导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-grid-view-layout.ts                 表格视图布局(预置模型)
        │       ├── view-layout-model-repository-de-index-pickup-data-view-layout.ts    实体索引关系选择数据视图（部件视图）布局面板(预置模型)
        │       ├── view-layout-model-repository-de-index-view-layout.ts                实体首页视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-kanban-view-layout.ts               实体看板视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-list-exp-view-layout.ts             实体列表导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-list-view-layout.ts                 列表视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-map-view-layout.ts                  地图视图布局(预置模型)
        │       ├── view-layout-model-repository-de-option-view-layout.ts               选项操作视图布局面(预置模型)
        │       ├── view-layout-model-repository-de-panel-view-layout.ts                实体面板视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-pickup-data-view-layout.ts          实体选择数据视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-pickup-grid-view-layout.ts          实体选择表格视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-pickup-tree-view-layout.ts          实体选择树视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-pickup-view-2-layout.ts             实体数据选择视图（左右关系）布局面板
        │       ├── view-layout-model-repository-de-pickup-view-layout.ts               选择视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-report-view-layout.ts               报表视图布局(预置模型)
        │       ├── view-layout-model-repository-de-tab-exp-view-layout.ts              分页导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-tab-search-view-view-layout.ts      分页搜索视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-tree-exp-view-layout.ts             实体树导航视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-tree-grid-ex-view-layout.ts         树表格（增强）视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-tree-grid-view-layout.ts            树表格视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-tree-view-layout.ts                 树视图布局面板(预置模型)
        │       ├── view-layout-model-repository-de-wizard-view-layout.ts               向导视图布局面板(预置模型)
        │       ├── view-layout-model-repository-dem-edit-view-9-layout.ts              实体多表单编辑视图（部件视图）布局面板(预置模型)
        │       ├── view-layout-model-repository-dem-pickup-view-2-layout.ts            多项选择视图(左右关系)布局面板(预置模型)
        │       ├── view-layout-model-repository-dem-pickup-view-layout.ts              多项选择视图布局面板(预置模型)
        │       ├── view-layout-model-repository-dewf-dyna-action-view-layout.ts        实体工作流动态操作视图布局面板(预置模型)
        │       ├── view-layout-model-repository-dewf-dyna-edit-view-3-layout.ts        实体工作流动态视图（分页关系）布局面板(预置模型)
        │       ├── view-layout-model-repository-dewf-dyna-edit-view-layout.ts          实体工作流动态编辑视图布局面板(预置模型)
        │       ├── view-layout-model-repository-dewf-dyna-start-view-layout.ts         实体工作流动态启动视图布局面板(预置模型)
        │       └── view-layout-model-repository-form-pickup-data-view.ts               实体表单选择数据视图布局面板
        └── theme
            ├── elements
            │   └── index.scss                                                          dom元素样式
            ├── generic
            │   ├── element-plus.scss                                                   element-plus重写样式
            │   └── index.scss
            ├── index.scss
            ├── objects
            │   ├── expand
            │   │   └── expand.scss                                                     默认组件样式扩展
            │   ├── index.scss
            │   └── state
            │       └── state.scss
            ├── theme
            │   ├── dark
            │   │   └── dark-theme.scss                                                 暗色主题样式
            │   ├── default
            │   │   └── default-theme.scss                                              默认主题样式
            │   ├── default-blue
            │   │   └── default-blue-theme.scss                                         蓝色主题样式
            │   ├── default-dark
            │   │   └── default-dark-theme.scss                                         默认暗色主题样式
            │   ├── index.scss
            │   ├── light
            │   │   └── light-theme.scss                                                亮色主题样式
            ├── tumps
            │   └── index.scss
            └── var.scss
```

## 📦 开发

1. 启动开发环境

进入 web-theme 终端后，执行以下命令启动开发环境：

```bash
pnpm dev
```

2. 将 web-theme 包链接到全局

等待开发环境启动完成后，将 web-theme 包添加pnpm link到全局：

```bash
pnpm link --global
```

3. 链接依赖项目

在依赖此包的项目工作空间中，安装依赖后执行以下命令link插件包

```bash
pnpm link --global "@ibiz-template/web-theme"
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)

# @ibiz-template/devtool

IBiz系统可视化调试套件，集成开发态建模数据实时查看、运行时状态分析、组件交互调试能力，支持快速定位页面元素与数据模型映射关系，提升开发效率。

## 📂 项目结构

```javascript
├── src
│   ├── components
│   │   ├── detail-info                                     详情信息组件                              
│   │   ├── global-toolbar                                  顶部工具栏组件
│   │   ├── index-page                                      工具壳组件
│   │   ├── index.ts
│   │   ├── object-viewer                                   拷贝组件
│   │   ├── user-config-edit                                用户配置组件
│   │   ├── view-list                                       视图列表组件
│   │   └── view-model-viewer                               视图模型组件
│   ├── controller
│   │   ├── center.controller.ts                            控制中心
│   │   └── dev-tool-config.ts                              开发工具配置文件
│   ├── index.ts
│   ├── interface
│   │   └── i-center-controller-state.ts                    控制器中心状态
│   └── style
│       └── index.scss                                      开发工具样式
```

## 📦 开发

1. 安装依赖

进入@ibiz-template/devtool工作空间后，执行以下命令安装依赖：

```bash
pnpm i
```

2. 运行项目

进入@ibiz-template/devtool工作空间后，执行以下命令启动开发环境：

```bash
pnpm dev
```

3. 将@ibiz-template/devtool包链接到全局

等待开发环境启动完成后，将@ibiz-template/devtool包添加pnpm link到全局：

```bash
pnpm link --global
```

4. 链接依赖项目

在依赖此包的项目工作空间中，安装依赖后执行以下命令link插件包

```bash
pnpm link --global "@ibiz-template/devtool"
```

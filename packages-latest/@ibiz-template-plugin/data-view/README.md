# @ibiz-template-plugin/data-view

iBiz数据大屏插件，提供以下核心功能模块：

- 动态数据表格：支持实时滚动、分页和高亮显示
- 数字翻牌器：流畅的数字动画效果，支持多种格式展示
- 数据看板容器：灵活的面板布局系统，支持响应式设计
- 百分比进度条：指示光标
- 水位图：3D立体效果
- 单选列表框：支持滚动选中
- 装饰元素：
  - 可定制边框样式（多种预设+自定义SVG）
  - 动态装饰器（粒子效果、流光效果）
- 标签墙：动态词云效果，支持点击交互
- 自定义按钮系统：多种按钮样式


## 目录结构

```javascript
├─ src
│  ├─ carousel-grid                             滚动表格
│  ├─ carousel-list                             滚动表格
│  ├─ custom-border                             自定义边框样式（1-13）
│  ├─ custom-button                             自定义按钮样式（1-6）
│  ├─ custom-decoration                         自定义装饰器样式（1-6，11）
│  ├─ custom-search-box                         搜索框
│  ├─ digital-flop                              数字翻牌器
│  ├─ index.ts
│  ├─ percent-pond                              百分比进度条
│  ├─ screen-dashboard                          大屏数据看板
│  ├─ screen-panel-container                    大屏面板容器
│  ├─ screen-portlet                            大屏门户部件
│  ├─ screen-portlet-real-time                  大屏门户实时时间
│  ├─ screen-radio-list                         大屏单选列表框
│  ├─ screen-real-time                          大屏实时时间
│  ├─ tagged-wall                               标签墙
│  ├─ util                                      工具类 
│  └─ water-level-pond                          水位进度条
```

## 开发

1. 安装依赖

进入@ibiz-template-plugin/data-view工作空间后，执行以下命令安装依赖：

```bash
pnpm i
```

1. 启动开发环境

进入@ibiz-template-plugin/data-view工作空间后，执行以下命令启动开发环境：

```bash
pnpm dev
```

3. 将@ibiz-template-plugin/data-view包链接到全局

等待开发环境启动完成后，将@ibiz-template-plugin/data-view包添加pnpm link到全局：

```bash
pnpm link --global
```

4. 链接依赖项目

在依赖此包的项目工作空间中，安装依赖后执行以下命令link插件包

```bash
pnpm link --global "@ibiz-template-plugin/data-view"
```
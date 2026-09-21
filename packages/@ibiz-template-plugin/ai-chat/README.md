# @ibiz-template-plugin/ai-chat

一款深度集成于iBiz设计平台的AI智能辅助插件，提供基于自然语言交互的智能问答服务，支持实时消息列表管理、会话历史持久化存储、多模态文件附件及结构化业务数据上传能力。系统核心扩展了与iBiz平台深度绑定的领域特定语言（DSL）构建引擎，可基于用户需求动态生成平台配置脚本，同时集成智能模型解析技术，自动生成可视化架构看板，有效降低用户学习曲线，助力开发者快速掌握iBiz平台的领域驱动设计体系。

## 📂 项目结构

```javascript
├─ src
│  ├─ components
│  │  ├─ chat-back-bottom                           回到底部按钮
│  │  ├─ chat-container                             对话框容器
│  │  ├─ chat-input                                 对话框输入框
│  │  ├─ chat-input-material                        上传的素材（文件、实体资料）
│  │  ├─ chat-input-material-item                   上传的素材项
│  │  ├─ chat-message-item                          对话消息项
│  │  ├─ chat-messages                              对话消息列表
│  │  ├─ chat-minimize                              最小化按钮
│  │  ├─ chat-search                                搜索话题组件
│  │  ├─ chat-thought-chain                         思维链组件
│  │  ├─ chat-toolbar                               消息工具栏
│  │  ├─ chat-topic-item                            话题项
│  │  ├─ chat-topics                                话题列表
│  │  ├─ index.ts
│  │  └─ popup                                      气泡弹框组件
│  ├─ constants
│  │  └─ index.ts                                   常量
│  ├─ controller
│  │  ├─ ai-chat                                    ai聊天控制器
│  │  ├─ ai-material                                ai素材控制器
│  │  ├─ ai-topic                                   ai话题控制器
│  │  ├─ chat                                       ai控制器
│  │  └─ index.ts
│  ├─ entity
│  │  ├─ chart-material                             聊天素材实体接口
│  │  ├─ chart-topic                                聊天话题实体接口
│  │  ├─ chart-message                              聊天消息实体接口
│  │  ├─ chart-suggestion                           聊天建议实体接口
│  │  └─ index.ts
│  ├─ global.ts
│  ├─ icons                                         图标包
│  ├─ index.scss
│  ├─ index.ts
│  ├─ interface                                     接口包
│  ├─ main.tsx
│  └─ utils                                         工具包
```

## 📦 开发

1. 安装依赖

进入@ibiz-template-plugin/ai-chat工作空间后，执行以下命令安装依赖：

```bash
pnpm i
```

1. 启动开发环境

进入@ibiz-template-plugin/ai-chat工作空间后，执行以下命令启动开发环境：

```bash
pnpm build:watch
```

3. 将@ibiz-template-plugin/ai-chat包链接到全局

等待开发环境启动完成后，将@ibiz-template-plugin/ai-chat包添加pnpm link到全局：

```bash
pnpm link --global
```

4. 链接依赖项目

在依赖此包的项目工作空间中，安装依赖后执行以下命令link插件包

```bash
pnpm link --global "@ibiz-template-plugin/ai-chat"
```

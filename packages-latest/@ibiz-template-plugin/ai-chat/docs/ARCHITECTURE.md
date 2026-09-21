<!-- meta: date=2026-05-18 commit=083d062 branch=main -->

# 架构文档

## 第一章：项目定位

`@ibiz-template-plugin/ai-chat` 是一款深度集成于 iBiz 设计平台的 AI 智能辅助**插件**，以 npm 包形式发布，宿主应用通过 `chat.create()` 挂载聊天窗口到 DOM。插件基于 iBiz 模板引擎体系，通过 `peerDependencies` 声明对 `cherry-markdown`、`interactjs`、`qx-util` 的依赖，确保与宿主版本一致。

核心能力：
- 双呈现模式：模态框模式（可拖拽/缩放/最小化/全屏浮动窗口）和平铺模式（嵌入宿主容器，铺满外部元素）
- SSE 流式消息传输，支持思维链（think）、工具调用（tool_call）、步骤链（chatstep）、界面行为（chatuiaction）四种扩展消息类型
- 多话题管理（DEFAULT 单会话 / TOPIC 多话题切换），支持临时会话、置顶、重命名
- 双存储模式：LOCAL（IndexedDB 本地持久化）和 REMOTE（远程 API 会话管理）
- AI 智能体切换与知识库选择，支持召回参数配置
- 多模态素材上传（OSS 文件、业务实体数据），以 XML 协议附加到提问内容
- Markdown / 富文本渲染、代码高亮、预定义协议跳转、推荐提示
- i18n 国际化（中文 / 英文），资源使用量统计（token + 工具调用次数）
- 消息回填（backfill）、重新编辑、点赞 / 点踩反馈

## 第二章：架构图

```
┌──────────────────────────────────────────────────────────────────┐
│                         宿主应用 (iBiz)                           │
│  chat.create() / createFlatChat().create()                      │
└───────┬──────────────────────────────────┬───────────────────────┘
        │                                  │
        v                                  v
┌───────────────────┐            ┌───────────────────┐
│ ModalChatController│            │ FlatChatController │
│ (chat 单例)        │            │ (createFlatChat)   │
│ 模态框/浮动窗口     │            │ 平铺/嵌入宿主容器   │
│ hidden/show/close  │            │ close              │
└────┬──────────────┘            └────┬──────────────┘
     │        └──────┬────────────────┘
     │               │
     │               v
     │    ┌──────────────────────┐
     │    │  ChatBaseController  │
     │    │  (抽象基类)           │
     │    │  create/close/       │
     │    │  switchAiChatController│
     │    └──────────┬───────────┘
     │               │
     v               v
┌──────────────────────────────────────────────┐
│            控制器层 (Controller)               │
│  ┌─────────────┐  ┌──────────────────┐       │
│  │ AiTopic     │  │ AiChatController │       │
│  │ Controller  │  │ (消息/素材/提问/  │       │
│  │ (话题CRUD/  │  │  回填/智能体/    │       │
│  │  切换/同步) │  │  知识库/反馈)    │       │
│  └──────┬──────┘  └────────┬─────────┘       │
│         │                  │                  │
│         v                  v                  │
│  ┌────────────────────────────────────┐       │
│  │     IChatOptions (宿主回调协议)     │       │
│  └────────────────────────────────────┘       │
└──────────────────────────────────────────────┘
         │
         v
┌──────────────────────────────────────────┐
│              Preact 渲染层                 │
│  ┌──────────────┐  ┌───────────────────┐ │
│  │ ChatContainer│  │FlatChatContainer  │ │
│  │ (模态框容器) │  │(平铺容器)         │ │
│  └──────┬───────┘  └────────┬──────────┘ │
│         │                   │             │
│         v                   v             │
│  ┌────────────────────────────────────┐   │
│  │ ChatMessages / ChatInput /         │   │
│  │ ChatToolbar / ChatTopics ...       │   │
│  └────────────────────────────────────┘   │
└──────────────────────────────────────────┘
         │
         v
┌──────────────────────────────────────────┐
│            数据持久层                      │
│  ┌──────────────┐  ┌───────────────────┐ │
│  │ IndexedDB    │  │ IResourceOptions  │ │
│  │ (LOCAL模式)  │  │ (REMOTE模式API)   │ │
│  └──────────────┘  └───────────────────┘ │
└──────────────────────────────────────────┘
```

图例：`-->` 同步调用 / 数据流，组件间为 Preact props 传递。

## 第三章：核心架构说明

**分层策略**：项目采用三层架构——控制器层（业务逻辑）、UI 组件层（Preact 渲染）、数据持久层（IndexedDB / 远程 API）。控制器持有全部状态，UI 层通过 `@preact/signals` 响应式更新，数据层由控制器按 `resourceMode` 路由到 LOCAL 或 REMOTE 实现。

**控制器协作**：`ChatBaseController` 是抽象基类，封装了通用的 `create()` / `close()` / `switchAiChatController()` 流程及 `AiTopicController` 管理，子类仅需实现容器创建与渲染的三个抽象方法（`setupContainer` / `renderChatContent` / `renderSwitchedContent`）。`ModalChatController`（`chat` 单例）继承基类，实现模态框/浮动窗口模式，在 body 上创建独立 DOM 容器，支持拖拽/缩放/全屏/最小化/隐藏/显示；`FlatChatController`（`createFlatChat()` 工厂函数创建，支持多实例）继承基类，实现平铺嵌入模式，渲染到宿主指定的 `container` 元素内，铺满容器且无窗口控制。`AiTopicController` 管理话题列表的 CRUD、激活切换和持久化，通过 `IChatController` 接口与基类解耦。`AiChatController` 是核心业务控制器，管理消息流、素材、智能体切换、知识库选择、提问 / 中断 / 回填等完整生命周期。

**数据流向**：用户输入 → `AiChatController.question()` → 拼接素材资源 XML → `IChatOptions.question()` 回调（宿主实现 SSE 请求） → 流式 `addMessage` / `replaceMessage` 更新 Signal → Preact 自动重渲染 → `completeMessage` 完成时触发回填 / 推荐提示 / 话题标题更新 → `asyncToIndexDB` 持久化。

**状态管理**：全部使用 `@preact/signals` 的 `signal()` 细粒度响应式，无全局 Store。每个控制器将核心状态声明为 `readonly Signal<T>`，UI 组件通过 `.value` 读写，变更后通过 `[...array]` 创建新引用触发更新。

**宿主集成**：插件不直接发起 HTTP 请求，所有 AI 交互通过 `IChatOptions` 回调协议委托给宿主（`question`、`history`、`abortQuestion`、`action`、`backfill`、`chatDigest`、`recommendPrompt` 等），插件仅负责 UI 呈现和本地状态管理。

## 第四章：项目结构

```
src/
├── index.ts                    # 插件入口，导出 ChatContainer、FlatChatContainer、chat、createFlatChat、IChatToolbarItem
├── index.scss                  # 全局样式入口
├── global.ts                   # PluginStaticResource 静态资源路径实例
├── main.tsx                    # 开发调试入口（非发布入口）
├── app.tsx                     # 开发调试应用组件
├── constants/
│   └── index.ts                # AIChatConst 枚举：缓存key、数据库名/表名
├── controller/
│   ├── index.ts                # 导出：AiChatController、AiTopicController、AIMaterialFactory、ModalChatController/chat、FlatChatController/createFlatChat
│   ├── chat/
│   │   ├── chat-base.controller.ts  # ChatBaseController：抽象基类，封装create/close/switch流程
│   │   ├── modal-chat.controller.ts # ModalChatController(chat单例)：模态框/浮动窗口模式
│   │   └── flat-chat.controller.ts  # FlatChatController(createFlatChat)：平铺嵌入模式，支持多实例
│   ├── ai-chat/
│   │   └── ai-chat.controller.ts  # AiChatController：消息管理、提问/中断/回填/反馈、智能体/知识库
│   ├── ai-topic/
│   │   └── ai-topic.controller.ts # AiTopicController：话题CRUD、切换、同步远程会话
│   └── ai-material/
│       └── ai-material-factory.ts # AIMaterialFactory：素材帮助器工厂（Common/File）
├── components/
│   ├── index.ts                # 导出：ChatContainer、FlatChatContainer
│   ├── chat-container/         # 模态框聊天容器：拖拽、缩放、全屏、最小化、侧边栏布局
│   ├── flat-chat-container/    # 平铺聊天容器：嵌入宿主容器，铺满外部元素，无窗口控制
│   ├── chat-messages/          # 消息列表：无限滚动、自动滚底、批量加载
│   ├── chat-message-item/      # 消息项：按角色渲染（Markdown/用户/错误/未知）
│   │   ├── markdown-message/   #   AI Markdown 消息渲染（cherry-markdown）
│   │   ├── user-message/       #   用户消息渲染
│   │   ├── error-message/      #   错误消息渲染
│   │   └── unknown-message/    #   未知类型消息兜底
│   ├── chat-input/             # 输入框：Tiptap编辑器、语音、文件上传、智能体/知识库选择
│   ├── chat-input-material/    # 素材列表容器
│   ├── chat-input-material-item/ # 素材项（通用/ossfile两种）
│   ├── chat-toolbar/           # 消息工具栏
│   ├── chat-toolbar/chat-toolbar-item/ # 工具栏项
│   ├── chat-think/             # 思维链展示（可折叠）
│   ├── chat-step/              # 步骤链展示
│   ├── chat-step-item/         # 步骤项
│   ├── chat-tool-call/         # 工具调用展示
│   ├── chat-tool-call-item/    # 工具调用项（chunk/image/default三种）
│   ├── chat-suggestions/       # 推荐提示列表
│   ├── chat-search/            # 话题搜索
│   ├── chat-topics/            # 话题侧边栏列表
│   ├── chat-topic-item/        # 话题项
│   ├── chat-back-bottom/       # 回到底部按钮
│   ├── chat-minimize/          # 最小化浮球
│   ├── chat-agent-setting/     # 智能体设置面板
│   ├── chat-editor/            # 编辑器组件
│   ├── chat-image-preview/     # 图片预览
│   ├── popup/                  # 气泡弹框
│   └── common/                 # 公共组件：loading、消息工具栏、多选、单选、滑块、开关
├── entity/
│   ├── index.ts                # 导出：ChatMessage、ChatTopic、ChatMaterial、ChatSuggestion、AIAgent、KnowledgeBase
│   ├── chat-message/           # ChatMessage：消息实体，update/replace/complete逻辑
│   ├── chart-topic/            # ChatTopic：话题实体
│   ├── chart-material/         # ChatMaterial：素材实体
│   ├── chat-suggestion/        # ChatSuggestion：推荐提示实体
│   ├── ai-agent/               # AIAgent：智能体实体（含召回配置）
│   └── knowledge-base/         # KnowledgeBase：知识库实体
├── interface/                  # 全部接口/类型定义（共19个子目录）
│   ├── index.ts                # 聚合导出全部接口
│   ├── i-chat-options/         # IChat / IChatOptions：宿主回调协议
│   ├── i-chat-controller/      # IChatController：聊天总控制器接口
│   ├── i-chat-container/       # IChatContainerOptions / IAutoClose
│   ├── i-chat-message/         # IChatMessage：消息结构
│   ├── i-chat-message-usage/   # IChatMessageUsage：token使用量
│   ├── i-chat-tool-call/       # IChatToolCall：工具调用
│   ├── i-chat-think/           # IChatThink：思维链
│   ├── i-chat-step/            # IChatStep：步骤链
│   ├── i-chat-suggestion/      # IChatSuggestion：推荐提示
│   ├── i-chat-uiaction/        # IChatUIAction：界面行为
│   ├── i-chat-toolbar-item/    # IChatToolbarItem：工具栏项
│   ├── i-message-item-provider/ # IMessageItemProvider：自定义消息渲染
│   ├── i-ai-agent/             # IAIAgent / IAIAgentConfig：智能体配置
│   ├── i-knowledge-base/       # IKnowledgeBase：知识库
│   ├── i-material/             # IMaterial：素材
│   ├── i-resource-options/     # IResourceOptions：远程资源API协议
│   ├── i-config-service/       # IConfigService：配置存储服务
│   ├── i-remote-resource/      # IRemoteSession / IRemoteMessage
│   ├── i-file-uploader-options/ # FileUploaderOptions
│   ├── i-container-options/    # IContainerOptions
│   ├── i-topic-options/        # ITopic / ITopicOptions
│   └── util/                   # INotificationUtil / IMessageUtil / IConfirmUtil
├── utils/
│   ├── index.ts                # 聚合导出全部工具
│   ├── util/                   # 通用工具：UUID、html2md/md2html、剪贴板、解析协议、IndexedDB、文件上传、素材解析
│   │   ├── util.ts             # createUUID, html2md, md2html, parsePredefProtocol, TextUtil, getChatSessionId
│   │   ├── indexdb-util.ts     # IndexedDBUtil：表检查/创建/CRUD
│   │   ├── file-uploader.ts    # FileUploader：文件上传
│   │   ├── material-resource-parser.ts # MaterialResourceParser：素材XML序列化/反序列化
│   │   ├── chat-suggestion-parser.ts   # ChatSuggestionParser：推荐提示解析
│   │   ├── chat-tool-call-parser.ts    # ChatToolCallParser：工具调用解析
│   │   ├── chat-step-parser.ts         # ChatStepParser：步骤链解析
│   │   ├── chat-ui-action-parser.ts    # ChatUIActionParser：界面行为解析
│   │   ├── drag-util.ts        # isWithinBounds, limitDraggable：拖拽边界工具
│   │   └── text-hash-util.ts   # generateHashWithText：文本哈希
│   └── plugin-static-resource/ # PluginStaticResource：插件静态资源路径计算
├── icons/                      # SVG图标组件（约40个）
└── locale/
    ├── index.ts                # i18n 实例，支持 setLanguage/setLocale
    ├── zh-CN/                  # 中文语言包
    └── en/                     # 英文语言包
```

## 第五章：功能清单

### 注册与初始化

| 功能 | 说明 | 关键文件 | 状态 |
|------|------|----------|------|
| 模态框窗口创建 | `chat.create(opts)` 挂载浮动窗口到 body | `src/controller/chat/modal-chat.controller.ts` | 稳定 |
| 平铺窗口创建 | `createFlatChat().create(opts)` 嵌入宿主容器 | `src/controller/chat/flat-chat.controller.ts` | 稳定 |
| 控制器抽象基类 | ChatBaseController 封装通用 create/close/switch 流程 | `src/controller/chat/chat-base.controller.ts` | 稳定 |
| 资源模式切换 | LOCAL（IndexedDB）/ REMOTE（远程API）双模式 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 智能体清单加载 | 内部获取或宿主传入 AI Agent 列表 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 知识库初始化 | 按智能体过滤可用知识库并默认选中 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 窗口样式缓存 | localStorage 持久化窗口位置/尺寸 | `src/components/chat-container/chat-container.tsx` | 稳定 |

### 运行时钩子

| 功能 | 说明 | 关键文件 | 状态 |
|------|------|----------|------|
| 提问与流式响应 | 调用宿主 question 回调，流式 addMessage/replaceMessage | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 中断请求 | abortQuestion 回调宿主中断 SSE | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 思维链展示 | 解析 `<think>` 标签，可折叠展示推理过程 | `src/components/chat-think/` | 稳定 |
| 工具调用展示 | 解析 `<tool_call>` 标签，支持 chunk/image/default 三种类型 | `src/components/chat-tool-call/` | 稳定 |
| 步骤链展示 | 解析 `<chatstep>` 标签，步骤式展示 | `src/components/chat-step/` | 稳定 |
| 界面行为 | 解析 `<chatuiaction>` 标签，支持 view/action 跳转 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 推荐提示 | AI 回答完成后异步获取推荐问题 | `src/components/chat-suggestions/` | 稳定 |
| 消息回填 | AI 回答完成时自动或手动回填到宿主表单 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 点赞/点踩 | 消息反馈，调用远程 API | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 重新编辑 | 用户消息支持重新编辑并重新提交 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 消息刷新 | 删除当前及后续消息，重新提问 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 资源使用量统计 | 消息 token 消耗量及工具调用次数 | `src/interface/i-chat-message-usage/` | 稳定 |

### 资源清理

| 功能 | 说明 | 关键文件 | 状态 |
|------|------|----------|------|
| 窗口关闭 | 模态框：移除 DOM；平铺：清空容器。均销毁所有 AiChatController | `src/controller/chat/modal-chat.controller.ts`、`src/controller/chat/flat-chat.controller.ts` | 稳定 |
| 对话清空 | 清除消息并删除 IndexedDB / 远程会话数据 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 话题删除 | 删除单话题及关联数据，自动切换 | `src/controller/ai-topic/ai-topic.controller.ts` | 稳定 |
| 批量清空话题 | 保留激活话题，删除其余全部 | `src/controller/ai-topic/ai-topic.controller.ts` | 稳定 |

### 配置管理

| 功能 | 说明 | 关键文件 | 状态 |
|------|------|----------|------|
| 多话题模式 | TOPIC 模式侧边栏切换，DEFAULT 单会话 | `src/controller/ai-topic/ai-topic.controller.ts` | 稳定 |
| 临时会话 | 禁用存储的一次性对话 | `src/controller/ai-topic/ai-topic.controller.ts` | 稳定 |
| 智能体切换 | 切换 Agent 并同步召回配置/知识库 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 知识库选择 | 多选知识库，按智能体过滤可用范围 | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 话题标题计算 | snippet 截取 / summary AI 摘要 / default | `src/controller/ai-chat/ai-chat.controller.ts` | 稳定 |
| 素材上传 | 文件/实体数据以 XML 协议附加到提问 | `src/utils/util/material-resource-parser.ts` | 稳定 |
| 自定义消息渲染 | IMessageItemProvider 扩展消息类型 | `src/interface/i-message-item-provider/` | 实验性 |

## 第六章：架构决策记录（ADR）

| 决策编号 | 决策标题 | 状态 | 上下文 | 决策结果 | 取舍 | 决策依据来源 |
|----------|----------|------|--------|----------|------|--------------|
| ADR-001 | UI 框架选型 | 已采纳 | 需要轻量级渲染方案嵌入宿主 DOM | Preact + Signals | 放弃 React（体积大，与宿主可能冲突）；放弃 Vue（宿主非 Vue 生态） | 推断（package.json 仅含 preact 依赖） |
| ADR-002 | AI 交互委托宿主 | 已采纳 | 插件不应直接耦合后端 API | IChatOptions 回调协议 | 插件无法独立运行，宿主需实现完整 AI 请求逻辑 | 代码注释 + 接口设计 |
| ADR-003 | 双存储模式 | 已采纳 | 需支持离线场景和云端同步两种部署 | LOCAL(IndexedDB) + REMOTE(远程API) | 增加了控制器中的模式判断分支，但保持了灵活性 | 推断（IResourceOptions 接口设计） |
| ADR-004 | 消息扩展协议基于 XML 标签 | 已采纳 | AI 回复需携带结构化数据（步骤、行为、工具调用） | 自定义 XML 标签（\<think\>、\<chatstep\>、\<chatuiaction\>、\<tool_call\>） | 解析可靠性依赖严格标签匹配，但避免了 JSON-in-Markdown 的转义问题 | 推断（ChatStepParser 等解析器实现） |
| ADR-005 | 双呈现模式：模态框 + 平铺 | 已采纳 | 宿主场景分化：独立浮动窗口 vs 嵌入页面区域，需支持不同布局模式 | ChatBaseController 抽象基类 + ModalChatController / FlatChatController 子类继承 | 增加了控制器层级，但实现了模式间代码复用（基类统一 create/switch 流程），平铺模式支持多实例 | 代码注释 + 控制器重构（chat.controller.ts 拆分为三个文件） |

## 第七章：对外接口与配置

### 插件注册入口

| 接口 / 类 | 说明 | 关键参数 | 返回值 / 类型 | 可见性 |
|---------|------|----------|---------|--------|
| `chat` | 模态框模式全局单例 | — | `ModalChatController` | 公开 API |
| `ModalChatController.create(opts)` | 创建并显示模态框聊天窗口 | `IContainerOptions` | `Promise<AiChatController>` | 公开 API |
| `ModalChatController.close()` | 关闭聊天窗口 | — | `void` | 公开 API |
| `ModalChatController.hidden()` | 隐藏窗口（不销毁） | — | `void` | 公开 API |
| `ModalChatController.show()` | 显示已隐藏的窗口 | — | `void` | 公开 API |
| `createFlatChat()` | 创建平铺模式聊天实例（支持多实例） | — | `FlatChatController` | 公开 API |
| `FlatChatController.create(opts)` | 在宿主容器内创建平铺聊天 | `IContainerOptions`（containerOptions.container 必填） | `Promise<AiChatController>` | 公开 API |
| `FlatChatController.close()` | 清空平铺聊天 | — | `void` | 公开 API |
| `ChatContainer` | 模态框容器组件 | `ChatContainerProps` | `Component` | 公开 API |
| `FlatChatContainer` | 平铺容器组件 | `FlatChatContainerProps` | `Component` | 公开 API |
| `IChatToolbarItem` | 工具栏项类型 | — | `Type` | 公开 API |
| `IChatController` | 聊天总控制器接口（create/switchAiChatController） | — | `Interface` | 公开 API |

### 宿主集成配置表

| 钩子 / 扩展点 | 触发时机 | 参数签名 | 返回值约束 |
|---------|---------|------|----------|
| `IChatOptions.question` | 用户发送提问 | `(aiChat, context, params, data, messages, sessionid, agentID, mode, scope, knowledgeBases, recallConfig, appendCurData, mcpservers)` | `Promise<void>` |
| `IChatOptions.history` | 初始化时加载历史 | `(context, params, data)` | `Promise<boolean>` |
| `IChatOptions.abortQuestion` | 用户中断请求 | `(aiChat, context, params, data)` | `Promise<void>` |
| `IChatOptions.action` | 消息行为回调 | `(action: string, data)` | `void` |
| `IChatOptions.backfill` | 消息回填 | `(message: IChatMessage)` | `void` |
| `IChatOptions.closed` | 窗口关闭回调 | `(context, params, messages)` | `void` |
| `IChatOptions.chatDigest` | 话题标题摘要 | `(context, params, data)` | `Promise<any>` |
| `IChatOptions.recommendPrompt` | 推荐提示获取 | `(context, params, data)` | `Promise<any>` |
| `IChatOptions.extendToolbarClick` | 扩展工具栏点击 | `(event, actionInfo, context, params, data)` | `Promise<any>` |
| `IChatOptions.openLinkView` | 预定义视图跳转 | `(url, message, event)` | `Promise<void>` |
| `IChatOptions.fetchAgentList` | 智能体清单获取 | `(query?: string)` | `Promise<IAIAgent[]>` |
| `IChatOptions.fetchKnowledgeBaseList` | 知识库清单获取 | — | `Promise<IKnowledgeBase[]>` |
| `IResourceOptions.getMessages` | 远程获取消息 | `(query)` | `Promise<IRemoteMessage[]>` |
| `IResourceOptions.getSessionList` | 远程获取会话列表 | `(query?)` | `Promise<IRemoteSession[]>` |
| `IResourceOptions.deleteSession` | 远程删除会话 | `(realid)` | `Promise<boolean>` |
| `IResourceOptions.updateSession` | 远程更新会话 | `(realid, data)` | `Promise<boolean>` |
| `IResourceOptions.deleteMessage` | 远程删除消息 | `(messageId)` | `Promise<boolean>` |
| `IConfigService` | 话题配置存储服务 | `(appid, key, type)` | `{save, load, reset}` |

## 第八章：技术栈

| 类别 | 技术 | 版本 | 备注 / 选型原因 |
|------|------|------|------|
| UI 框架 | Preact | ^10.18.1 | 轻量 React 兼容，适合嵌入宿主 DOM |
| 状态管理 | @preact/signals | ^1.2.1 | 细粒度响应式，无需全局 Store |
| 构建工具 | Vite | ^4.5.0 | 库模式构建，dts 类型生成 |
| Markdown 渲染 | cherry-markdown | 0.8.58 | peerDep，宿主提供，支持代码高亮 |
| 富文本编辑器 | @tiptap/core + extensions | ^3.11.1 | 输入框富文本编辑 |
| 拖拽交互 | interactjs | ^1.10.19 | peerDep，窗口拖拽/缩放 |
| 样式预处理 | Sass | ^1.69.5 | BEM 命名 + @ibiz-template/scss-utils |
| 类型生成 | vite-plugin-dts | ^3.6.3 | 构建时生成 .d.ts |
| 代码规范 | ESLint + Prettier + Stylelint | — | airbnb-base 规则集 |
| 提交规范 | commitlint + husky + lint-staged | — | conventional 规范 |
| TypeScript | ^5.2.2 | | |
| 国际化 | 自研 i18n 模块 | — | zh-CN / en |

运行环境要求：Node.js >= 16，pnpm 包管理器，浏览器需支持 ES2020+、IndexedDB、Fullscreen API。

## 第九章：开发指南

### 常用命令

| 命令 | 说明 | 适用范围 |
|------|------|----------|
| `pnpm install` | 安装依赖 | 全局 |
| `pnpm dev` | 启动开发服务（port 5174） | 全局 |
| `pnpm build` | 生产构建（ES + Legacy + d.ts + CSS） | 全局 |
| `pnpm build:watch` | 监听模式构建 | 全局 |
| `pnpm preview` | 预览构建产物 | 全局 |
| `pnpm publish:npm` | 构建并发布到 npm latest | 全局 |
| `pnpm publish:next` / `dev` / `beta` | 构建并发布到 npm 对应 tag | 全局 |

### 本地调试

1. 执行 `pnpm build:watch` 启动监听构建
2. 执行 `pnpm link --global` 将包链接到全局
3. 在宿主项目中执行 `pnpm link --global "@ibiz-template-plugin/ai-chat"` 链接插件
4. 修改源码后自动重新构建，宿主项目需刷新页面生效

### 环境变量

无需环境变量配置，插件通过 `IChatOptions` / `IResourceOptions` 回调协议接收全部运行时配置。

## 第十章：关键时序

### 插件生命周期时序

```
宿主应用        ModalChatController    AiTopicController     AiChatController        宿主回调
   |                   |                       |                      |                    |
   |--chat.create()--> |                       |                      |                    |
   |                   |--setupContainer()---->|                      |                    |
   |                   |  (创建DOM+渲染Loading)|                      |                    |
   |                   |                       |                      |                    |
   |                   |--fetchAgentList------>|                      |------获取智能体---->|
   |                   |<---agentList----------|                      |<---智能体清单-------|
   |                   |                       |                      |                    |
   |                   |--初始化AiChatController|                      |                    |
   |                   |                       |    new AiChatController(opts)               |
   |                   |                       |                      |--initAIChat()----->|
   |                   |                       |                      |   |--history()---->|
   |                   |                       |                      |   |<--历史数据------|
   |                   |--renderChatContent()->|                      |                    |
   |                   |  (渲染ChatContainer)  |                      |                    |
   |<--聊天窗口展示----|                       |                      |                    |
   |                   |                       |                      |                    |
   |                   |             用户输入问题                         |                    |
   |                   |                       |                      |--question()------>|
   |                   |                       |                      |   |--question()--->| (SSE请求)
   |                   |                       |                      |<--addMessage流式---|
   |                   |                       |                      |--completeMessage-->|
   |                   |                       |                      |--asyncToIndexDB--->|
   |                   |                       |                      |--updateTopicCaption|
```

平铺模式时序与模态框一致，区别在于入口为 `createFlatChat().create(opts)`，容器由宿主通过 `containerOptions.container` 提供，渲染 `FlatChatContainer` 而非 `ChatContainer`。

## 第十一章：注意事项与技术债

| 严重程度 | 问题描述 | 所在文件 | 修复成本 | 建议方案 |
|----------|----------|----------|----------|----------|
| 高 | AiChatController 近 2000 行，职责过多（消息/素材/智能体/知识库/反馈/回填/编辑），违反单一职责 | `src/controller/ai-chat/ai-chat.controller.ts` | 大 | 拆分为 MessageManager、MaterialManager、AgentManager 等子模块，AiChatController 做编排 |
| 中 | 大量 `@typescript-eslint/no-explicit-any` 禁用，`Record<string, any>` 泛滥 | `ai-chat.controller.ts`、`ai-topic.controller.ts`、`chat-base.controller.ts` | 中 | 为 topicOptions、chatOptions 内部流转补充接口定义，逐步收窄 any |
| 中 | handleSuggestionClick 和 handleUIActionClick 逻辑高度重复（action 分支代码几乎一致） | `src/controller/ai-chat/ai-chat.controller.ts:1482-1653` | 小 | 提取公共的 handleActionClick 方法，统一 action/raw 分支处理 |
| 中 | `as any` 类型断言遍布，如 `(suggestion.data as any).actionid`、`(metadata as any).content_name` | `ai-chat.controller.ts` | 中 | 为 IChatSuggestion.data / IChatUIAction.data 补充泛型或联合类型 |
| 中 | 常量拼写错误 `MINIMIZE_STYLY_CHCHE`（应为 STYLE_CACHE） | `src/constants/index.ts` | 小 | 修正拼写，全局替换引用 |
| 中 | ModalChatController / FlatChatController 中 props 构造高度重复（setupContainer / renderChatContent / renderSwitchedContent 三个方法中 props 对象几乎一致） | `modal-chat.controller.ts`、`flat-chat.controller.ts` | 中 | 在 ChatBaseController 中提取 buildContainerProps 方法，子类仅需覆盖差异部分 |
| 低 | 缺少单元测试和 E2E 测试 | 全项目 | 大 | 优先为核心控制器（AiChatController、AiTopicController）编写单元测试 |

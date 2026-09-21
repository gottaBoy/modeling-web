# @ibiz-template/core

运行时核心库是项目运行时的核心依赖库，主要提供公共的、通用性的工具、常量和接口定义。

## 📂 项目结构

```javascript
|─ ─ core
    |─ ─ scripts                                        工具脚本文件夹
    |─ ─ src                                            项目工程文件夹
        |─ ─ command                                    指令文件夹
            |─ ─ command-register.ts                    指令注册类
            |─ ─ command.ts                             指令控制器类
            |─ ─ interface                              指令接口声明
            |─ ─ utils                                  指令工具方法
        |─ ─ constant                                   运行时核心常量文件夹
            |─ ─ core                                   核心全局静态变量类
            |─ ─ emoji                                  表情符号常量
            |─ ─ http-status-message                    HTTP 状态码对应的消息
            |─ ─ login-mode                             登录模式效验
            |─ ─ menu-permission-mode                   菜单权限校验模式定义
            |─ ─ util                                   工具类常量
        |─ ─ context                                    上下文处理类
        |─ ─ environment                                环境变量默认值
        |─ ─ error                                      异常类型文件夹
            |─ ─ http-error                             网络请求错误
            |─ ─ model-error                            模型错误
            |─ ─ notice-error                           通知错误
            |─ ─ runtime-error                          运行时错误
            |─ ─ runtime-model-error                    运行时模型错误
        |─ ─ interface                                  通用接口声明
        |─ ─ locale                                     多语言文件夹
        |─ ─ params                                     视图参数
        |─ ─ utils                                      通用工具方法文件夹
            |─ ─ bit-mask                               权限工具
            |─ ─ click-outside                          点击外部区域检测工具
            |─ ─ clone                                  克隆工具
            |─ ─ color                                  颜色处理工具
            |─ ─ cookie-util                            Cookie 操作工具
            |─ ─ data-type                              数据类型判断工具
            |─ ─ download-file                          文件下载工具
            |─ ─ event                                  事件管理工具
            |─ ─ history-list                           历史记录管理工具
            |─ ─ interceptor                            拦截器工具
            |─ ─ logger                                 日志记录工具
            |─ ─ message-center                         消息中心工具文件夹
                |─ ─ base                               消息基础模块定义
                |─ ─ command                            指令消息文件夹
                    |─ ─ add-in-changed                 添加变更指令消息
                    |─ ─ async-action                   异步操作指令消息
                    |─ ─ change                         数据变更指令消息
                    |─ ─ command-base                   指令消息基类
                    |─ ─ create                         创建指令消息
                    |─ ─ internal-message               内部消息
                    |─ ─ mark-open-data                 标记打开数据指令消息
                    |─ ─ remove                         删除指令消息
                    |─ ─ update                         更新指令消息
                    |─ ─ message-command.ts             指令消息类文件
                |─ ─ console                            日志消息
                |─ ─ error                              错误消息
                |─ ─ interface                          消息接口声明
                |─ ─ message-center.ts                  界面消息中心类
            |─ ─ namespace                              全局样式处理命名空间工具
            |─ ─ net                                    全局请求工具
            |─ ─ recursive                              递归操作工具
            |─ ─ string-util                            字符串处理工具
            |─ ─ style                                  远程样式处理工具
            |─ ─ sync                                   同步操作工具文件夹
                |─ ─ await-timeout.ts                   异步超时工具
                |─ ─ count-latch.ts                     计数插销工具类
            |─ ─ types                                  工具类型定义文件夹
            |─ ─ upload                                 文件上传工具
            |─ ─ url-helper                             URL 路径解析助手
            |─ ─ util                                   通用工具集合
        |─ ─ ibizsys.ts                                 全局对象类
        |─ ─ install.ts                                 安装工具
        |─ ─ types.ts                                   全局类型定义文件
    |─ ─ test                                           测试文件夹
        |─ ─ command                                    指令模块相关测试
        |─ ─ setup.ts                                   测试环境初始化文件
        |─ ─ utils                                      工具函数测试集合
            |─ ─ bit-mask                               权限工具测试
            |─ ─ click-outside                          点击外部区域检测测试
            |─ ─ clone                                  克隆测试
            |─ ─ color                                  颜色工具测试
            |─ ─ download-file                          文件下载测试
            |─ ─ event                                  事件管理测试
            |─ ─ history-list                           历史记录测试
            |─ ─ message-center                         消息中心测试
            |─ ─ namespace                              命名空间管理测试
            |─ ─ net                                    网络请求测试
            |─ ─ recursive                              递归操作测试
            |─ ─ string-util                            字符串工具测试
            |─ ─ style                                  远程样式处理测试
            |─ ─ sync                                   同步操作测试
            |─ ─ types                                  类型定义测试
            |─ ─ util                                   工具测试
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)
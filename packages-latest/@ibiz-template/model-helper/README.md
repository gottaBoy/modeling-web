# @ibiz-template/model-helper

专注对模型进行操作的工具库，包含请求模型数据、通过iBiz前端运行时模型编译库将请求的模型数据转化为运行时模型、对运行时模型动态合并、转换等核心操作，旨在简化复杂模型处理流程。

## 📂 项目结构

```javascript
|─ ─ model-helper
    |─ ─ scripts                                        工具脚本文件夹
    |─ ─ src                                            项目工程文件夹
        |─ ─ locale                                     多语言文件夹
        |─ ─ model                                      模板预置模型
        |─ ─ utils                                      工具文件夹
            |─ ─ format-path                            路径格式化工具
            |─ ─ merge-model                            模型合并工具文件夹
                |─ ─ merge-app-menu.ts                  合并菜单模型工具
                |─ ─ merge-app-uiaction-group.ts        合并界面行为组模型工具
                |─ ─ merge-de-drcontrol.ts              合并DrCtrl控件工具
                |─ ─ merge-model-helper.ts              合并子应用模型工具类
                |─ ─ merge-model.ts                     合并预置模型工具
                |─ ─ merge-treeview.ts                  合并树视图模型工具
            |─ ─ plural                                 模型单词复数转换工具
            |─ ─ service-path-util                      服务路径处理工具类
        |─ ─ model-helper.ts                            模型加载工具类
        |─ ─ model-loader.ts                            模型加载适配器
        |─ ─ model-util.ts                              全动模型处理工具类
    |─ ─ test                                           测试文件夹
        |─ ─ format-path                                路径格式化测试
        |─ ─ index.test.ts                              入口测试文件
        |─ ─ merge-model                                合并模型测试文件夹
            |─ ─ merge-app-menu.test.ts                 合并应用菜单测试
            |─ ─ merge-model.test.ts                    合并预置模型测试
        |─ ─ plural                                     模型单词复数转换测试
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。

## 📜 许可证

[MIT](LICENSE)
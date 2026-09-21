# @ibiz-template-plugin/bi-report

基于可配置化的数据指标体系，系统支持动态生成多维度BI数据可视化报表。通过灵活配置指标(Measures)、维度(Dimensions)和过滤条件(Filter)，实现以下丰富的可视化组件渲染：

1. **基础图表**：数字指标卡(NUMBER)、表格(GRID)、交叉表(CROSSTABLE)
2. **柱状图系列**：多系列柱状图(MULTI_SERIES_COL、堆叠柱状图(STACK_COL)、分区柱状图(ZONE_COL)、多系列条形图（MULTI_SERIES_BAR）、堆积条行图（STACK_BAR）
3. **折线图系列**：多系列折线图(MULTI_SERIES_LINE)、分区折线图(ZONE_LINE)
4. **面积图**：基础面积图(AREA)
5. **饼图系列**：标准饼图(PIE)
6. **特殊图表**：雷达图(RADAR)、散点图(SCATTER)、仪表盘(GAUGE)

## 📂 项目结构

```javascript
├─ src
│  ├─ components                                            组件
│  │  ├─ bi-report-chart
│  │  │  ├─ bi-report-chart-shell                           echarts壳组件
│  │  │  ├─ bi-report-grid-shell                            表格壳组件
│  │  │  └─ bi-report-number                                数字壳组件
│  │  ├─ bi-report-content                                  bi报表内容区组件
│  │  ├─ bi-report-design                                   bi报表设计区组件
│  │  ├─ bi-report-drill-shell                              bi报表反查壳组件
│  │  ├─ bi-report-property                                 bi报表属性区组件
│  │  ├─ bi-report-select                                   bi报表选择区组件
│  │  ├─ common                                             bi报表基础组件
│  │  └─ index.ts
│  ├─ config
│  │  ├─ area-chart-config.ts                               区域图表配置
│  │  ├─ chart-types.ts                                     图表类型
│  │  ├─ cross-table-config.ts                              交叉表配置
│  │  ├─ extend-data.ts
│  │  ├─ gauge-chart-config.ts                              仪表盘配置
│  │  ├─ index.ts
│  │  ├─ multi-series-bar-chart-config.ts                   多序列条形图配置
│  │  ├─ multi-series-col-chart-config.ts                   多序列柱状图配置
│  │  ├─ multi-series-line-chart-config.ts                  多序列折线图配置
│  │  ├─ number-chart-config.ts                             数字配置
│  │  ├─ pie-chart-config.ts                                饼图配置
│  │  ├─ radar-chart-config.ts                              雷达图配置
│  │  ├─ scatter-chart-config.ts                            散点图配置
│  │  ├─ stack-bar-chart-config.ts                          堆叠条形图配置
│  │  ├─ stack-col-chart-config.ts                          堆叠柱状图配置
│  │  ├─ table-config.ts                                    表格配置
│  │  ├─ zone-col-chart-config.ts                           分区柱状图配置
│  │  └─ zone-line-chart-config.ts                          分区折线图配置
│  ├─ controller
│  │  ├─ bi-area-chart.controller.ts                        区域图表控制器
│  │  ├─ bi-gauge-chart.controller.ts                       仪表盘控制器
│  │  ├─ bi-multi-series-bar-chart.controller.ts            多序列条形图控制器
│  │  ├─ bi-multi-series-col-chart.controller.ts            多序列柱状图控制器
│  │  ├─ bi-multi-series-line-chart.controller.ts           多序列折线图控制器
│  │  ├─ bi-number-chart.controller.ts                      数字控制器
│  │  ├─ bi-pie-chart.controller.ts                         饼图控制器
│  │  ├─ bi-radar-chart.controller.ts                       雷达图控制器
│  │  ├─ bi-report-chart.controller.ts                      图表控制器
│  │  ├─ bi-report-cross-table.controller.ts                交叉表控制器
│  │  ├─ bi-report-design.controller.ts                     bi设计控制器（基类）
│  │  ├─ bi-report-table.controller.ts                      表格控制器
│  │  ├─ bi-scatter-chart.controller.ts                     散点图控制器
│  │  ├─ bi-stackbar-chart.controller.ts                    堆叠条形图控制器
│  │  ├─ bi-stackcol-chart.controller.ts                    堆叠柱状图控制器
│  │  ├─ bi-verify.controller.ts                            校验控制器
│  │  ├─ bi-zonecol-chart.controller.ts                     分区柱状图控制器
│  │  ├─ bi-zoneline-chart.controller.ts                    分区折线图控制器
│  │  └─ index.ts
│  ├─ converter
│  │  ├─ area-converter.ts                                  区域图表控制器
│  │  ├─ base-converter.ts                                  基础转换器
│  │  ├─ converter-factory.ts           
│  │  ├─ cross-table-converter.ts                           交叉表转换器
│  │  ├─ gauge-converter.ts                                 仪表盘转换器
│  │  ├─ index.ts
│  │  ├─ multi-series-col-converter.ts                      多序列柱状图转换器
│  │  ├─ multi-seriesbar-converter.ts                       多序列条形图转换器
│  │  ├─ multi-seriesline-converter.ts                      多序列折线图转换器
│  │  ├─ number-converter.ts                                数字转换器
│  │  ├─ pie-converter.ts                                   饼图转换器
│  │  ├─ radar-converter.ts                                 雷达图转换器
│  │  ├─ scatter-converter.ts                               散点图转换器
│  │  ├─ stackbar-converter.ts                              堆叠条形图转换器
│  │  ├─ stackcol-converter.ts                              堆叠柱状图转换器
│  │  ├─ table-converter.ts                                 表格转换器
│  │  ├─ zonecol-converter.ts                               分区柱状图转换器
│  │  └─ zoneline-converter.ts                              分区折线图转换器
│  ├─ interface
│  │  ├─ common                                             通用类型接口
│  │  ├─ controller                                         控制器接口
│  │  ├─ converter                                          转换器接口
│  │  ├─ data                                               数据接口
│  │  ├─ event                                              事件接口
│  │  ├─ index.ts
│  │  ├─ pql                                                pql接口
│  │  ├─ provider                                           适配器接口
│  │  ├─ state                                              状态接口
│  │  └─ util                                               工具方法接口
│  ├─ plugins
│  │  ├─ bi-report-panel                                    面板插件组件
│  │  ├─ bi-report-panel-content                            面板内容插件组件
│  │  └─ index.ts
│  ├─ provider
│  │  ├─ bi-report-area-chart.provider.ts                   区域图表适配器
│  │  ├─ bi-report-cross-table.provider.ts                  交叉表适配器
│  │  ├─ bi-report-gauge-chart.provider.ts                  仪表盘适配器
│  │  ├─ bi-report-multi-series-bar-chart.ptovider.ts       多序列条形图适配器
│  │  ├─ bi-report-multi-series-col-chart.provider.ts       多序列柱状图适配器
│  │  ├─ bi-report-multi-series-line-chart.ptovider.ts      多序列折线图适配器
│  │  ├─ bi-report-number-chart.provider.ts                 数字适配器
│  │  ├─ bi-report-pie-chart.provider.ts                    饼图适配器
│  │  ├─ bi-report-radar-cahrt.provider.ts                  雷达图适配器
│  │  ├─ bi-report-scatter-chart.provider.ts                散点图适配器
│  │  ├─ bi-report-stackbar-chart.ptovider.ts               堆叠条形图适配器
│  │  ├─ bi-report-stackcol-chart.provider.ts               堆叠柱状图适配器
│  │  ├─ bi-report-table.provider.ts                        表格适配器
│  │  ├─ bi-report-zonecol-cahrt.provider.ts                分区柱状图适配器
│  │  ├─ bi-report-zoneline-chart.provider.ts               分区折线图适配器
│  │  ├─ index.ts
│  │  ├─ register-center.ts
│  │  └─ report-chart-register.ts
│  ├─ use                                                   use包
│  └─ util                                                  工具包
```

## 📦 开发

1. 安装依赖

进入@ibiz-template-plugin/bi-report工作空间后，执行以下命令安装依赖：

```bash
pnpm i
```

1. 启动开发环境

进入@ibiz-template-plugin/bi-report工作空间后，执行以下命令启动开发环境：

```bash
pnpm dev
```

3. 将@ibiz-template-plugin/bi-report包链接到全局

等待开发环境启动完成后，将@ibiz-template-plugin/bi-report包添加pnpm link到全局：

```bash
pnpm link --global
```

4. 链接依赖项目

在依赖此包的项目工作空间中，安装依赖后执行以下命令link插件包

```bash
pnpm link --global "@ibiz-template-plugin/bi-report"
```
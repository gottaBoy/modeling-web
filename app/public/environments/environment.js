window.Environment = {
  // 是否为开发模式
  dev: true,
  // 日志输出级别, 支持: TRACE,DEBUG,INFO,WARN,ERROR,SILENT
  logLevel: 'ERROR',
  BaseUrl: '/api',
  pluginBaseUrl: './plugins',
  hub: true,
  enableMqtt: true,
  mqttUrl: '/portal/mqtt/mqtt',
  enableAnonymous: false,
  anonymousUser: '',
  anonymousPwd: '',
  // 应用市场地址
  marketAddress: '',
  environmentTag: 'development',
  // central 系统
  // appId: 'centralstudio__centralstudio',
  // mockDcSystemId: 'demo-centralstudio',
  // mockDcSystemId: '941127f9d839f87308f1c4db3b0a2de4',
  // 开发测试系统 zjbjadmin/123456
  // appId: 'sztrainsys__web',
  // mockDcSystemId: 'ac2720c74d5456b40e24aeaf6ffffbd2',
  // 新版云管理系统
  // appId: 'ibizcloudmgr__cloudmgr',
  // mockDcSystemId: 'ibizcloudmgr',
  // 功能测试示例系统
  // appId: 'demosys__web',
  // mockDcSystemId: 'demosys',
  // iBiz KMS 系统
  // appId: 'ibizkms__webapp',
  // mockDcSystemId: 'ibizkms',
  // OmniOA 系统
  // appId: 'oa__web',
  // mockDcSystemId: 'oa',
  // appId: 'pms__sclpmswebapp',
  // mockDcSystemId: 'pms',
  // 示例系统
  // appId: 'demosys__webvue3',
  // mockDcSystemId: 'demosys',
  // IA 系统
  // appId: 'ibizmodelingia__webapp',
  // mockDcSystemId: 'ibizmodelingia',
  // ehr 系统
  // appId: 'qdehr__qdehrapp',
  // mockDcSystemId: 'qdehr',
  // appId: 'zcyw__web',
  // mockDcSystemId: 'zcyw',
  // appId: 'zhks__web',
  // mockDcSystemId: 'zhks',
  // 资产管理系统
  // appId: 'eam__eamweb',
  // mockDcSystemId: 'eam',
  // 表单设计工具
  // appId: 'formdesign__formdesign',
  // mockDcSystemId: 'formdesign',
  // 新版数据流设计系统
  // appId: 'dataflowdesign__dataflowdesign',
  // mockDcSystemId: 'dataflowdesign',
  // 新版逻辑设计系统
  // appId: 'logicdesign__logicdesign',
  // mockDcSystemId: 'logicdesign',
  // 新版工作流设计系统
  // appId: 'workflowdesign__workflowdesign',
  // mockDcSystemId: 'workflowdesign',
  // iBizCloud后台管理
  // appId: 'ibizcloudcoreos__dcmgr',
  // mockDcSystemId: 'ibizcloudcoreos',
  // 产品生命周期管理系统
  appId: 'ibizmodeling__modeldesign',
  mockDcSystemId: 'ibizmodeling',
  // 信访引导系统
  // appId: 'xfstarter__web',
  // mockDcSystemId: 'xfstarter',
  // 企业数字化运行平台
  // appId: 'ibizoa__web',
  // mockDcSystemId: 'ibizoa',
  // appId: 'szjcxx__web',
  // mockDcSystemId: 'szjcxx',
  // 数字化运行平台
  // appId: 'ibizsysmgr__sysmgr',
  // mockDcSystemId: 'ibizsysmgr',
  // cloudmgr
  // appId: 'ibizsysmgr__cloudmgr',
  // mockDcSystemId: 'ibizsysmgr',
  // darm
  // appId: 'darm__web',
  // mockDcSystemId: 'darm',
  // 应用标题
  AppTitle: '',
  favicon: './favicon.ico',
};
